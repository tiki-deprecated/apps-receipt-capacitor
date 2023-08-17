/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import type { ReceiptCapture } from "@mytiki/tiki-capture-receipt-capacitor";
import * as TikiReceiptCapture from "@mytiki/tiki-capture-receipt-capacitor";
import * as Capture from "@mytiki/tiki-capture-receipt-capacitor";
import { TikiService } from "@/service/tiki-service";
import { ReceiptAccount } from "@/service/receipt/receipt-account";
import { ReceiptEvent } from "@/service/receipt/receipt-event";
import { HistoryEvent } from "@/service/history/history-event";
import { toString, ReceiptAccountType, icon } from "./receipt-account-type";

/**
 * Service responsible for handling receipt-related operations and events.
 */
export class ReceiptService {
  /**
   * OCR confidence threshold for considering a receipt scan valid.
   */
  static readonly OCR_THRESHOLD = 0.9;

  /**
   * The raw plugin instance. Use to call TikiReceiptCapture directly.
   */
  readonly plugin: ReceiptCapture = TikiReceiptCapture.instance;

  private readonly tiki: TikiService;
  private _accounts: ReceiptAccount[] = [];
  private _onAccountListeners: Map<string, (account: ReceiptAccount) => void> =
    new Map();
  private _onReceiptListeners: Map<
    string,
    (receipt: TikiReceiptCapture.Receipt, account?: ReceiptAccount) => void
  > = new Map();

  /**
   * Creates an instance of the ReceiptService class.
   * Do not construct directly. Call from {@link TikiService}.
   * @param tiki - The parent service instance.
   */
  constructor(tiki: TikiService) {
    this.tiki = tiki;
  }

  /**
   * Register an account event listener.
   * @param id - Identifier for the listener.
   * @param listener - The callback function to be called when a new account is added or removed.
   */
  onAccount(id: string, listener: (account: ReceiptAccount) => void): void {
    this._onAccountListeners.set(id, listener);
  }

  /**
   * Register a receipt event listener.
   * @param id - Identifier for the listener.
   * @param listener - The callback function to be called whenever a new receipt is parsed.
   */
  onReceipt(
    id: string,
    listener: (
      receipt: TikiReceiptCapture.Receipt,
      account?: ReceiptAccount,
    ) => void,
  ) {
    this._onReceiptListeners.set(id, listener);
  }

  /**
   * Get the list of registered accounts.
   */
  get accounts(): ReceiptAccount[] {
    return this._accounts;
  }

  /**
   * Scan a physical receipt and if valid, process and add it to the service.
   */
  async scan(): Promise<void> {
    const license = await this.tiki.sdk.getLicense();
    if (license != undefined) {
      const receipt = await this.plugin.scan();
      if (receipt.ocrConfidence > ReceiptService.OCR_THRESHOLD) {
        await this.addReceipt(receipt);
      } else {
        console.warn(`Receipt ignored: Confidence: ${receipt.ocrConfidence}`);
      }
    } else
      throw Error(
        `No license found for ${this.tiki.sdk.id}. User must first consent to the program.`,
      );
  }
  async login(account: ReceiptAccount): Promise<void> {
    if(account.provider) {
      await this.plugin.loginWithEmail(
        account.username,
        account.password!,
        account.provider!,
      );
    } else {
         let accountSigned = await this.plugin.loginWithRetailer(
         account.username,
         account.password!,
         toString(account.type!),
       );
       if(accountSigned.isVerified) account.verified = true
    }
    this.addAccount(account);
    await this.process(ReceiptEvent.LINK, {
      account: account,
    });
  }

  /**
   * Log out from a {@link ReceiptAccount}.
   * @param account - The receipt account to log out.
   */
  async logout(account: ReceiptAccount): Promise<void> {
    if(account.type == 'Gmail') {
    await this.plugin.removeEmail(
      account.username,
      account.password!,
      account.provider!,
    );} else {
     const removedRetailer = await this.plugin.removeRetailer(
        account.username,
        toString(account.type!),
      );
    }
    this.removeAccount(account);
    await this.process(ReceiptEvent.UNLINK, {
      account: account,
    });
  }

  /**
   * Scrape all verified email accounts for new receipts in the last 30 days.
   * Use on receipt listener to handle processed receipts.
   */
  scrape = async (): Promise<void> =>
    this.plugin.scrapeEmail(
      async (account: Capture.Account, receipts: Capture.Receipt[]) =>
        receipts.forEach((receipt) => this.addReceipt(receipt, account)),
    );
    

  orders = async (account: ReceiptAccount): Promise<void> =>{
    const order = await this.plugin.orders()
    this.addReceipt(order.scan)
  }
    
  /**
   * Load and verify previously logged-in accounts.
   */
  load = async (): Promise<void> =>{
    (await this.plugin.retailers()).forEach((retailer=> 
      this.addAccount({
        username: retailer.username,
        type: retailer.provider,
        verified: retailer.isVerified,
        icon: icon(retailer.provider),
        provider: retailer.provider
      })
    ));
    (await this.plugin.verifyEmail()).forEach((account) =>
      this.addAccount(ReceiptAccount.fromCapture(account)),
    )
  }

  private addAccount(account: ReceiptAccount): void {
    this._accounts.push(account);
    if(account.type === "Gmail") {
      this._onAccountListeners.forEach((listener) => listener(account));
      this.scrape();
    }
     else {
       this._onAccountListeners.forEach((listener) => listener(account));
       this.orders(account);
     }
    }

  private removeAccount(account: ReceiptAccount): void {
    this._accounts = this._accounts.filter(
      (acc) => acc.username != account.username && acc.type != account.type,
    );
    this._onAccountListeners.forEach((listener) => listener(account));
  }

  private async addReceipt(
    receipt: TikiReceiptCapture.Receipt,
    account?: TikiReceiptCapture.Account,
  ): Promise<void> {
    if (!receipt.duplicate && !receipt.fraudulent) {
      await this.tiki.sdk.ingest(receipt);
      await this.process(ReceiptEvent.SCAN, {
        receipt: receipt,
        account:
          account != undefined
            ? ReceiptAccount.fromCapture(account)
            : undefined,
      });
      this._onReceiptListeners.forEach((listener) =>
        listener(
          receipt,
          account != undefined
            ? ReceiptAccount.fromCapture(account)
            : undefined,
        ),
      );
    } else {
      console.warn(
        `Receipt ignored — duplicate: ${receipt.duplicate} | fraudulent: ${receipt.fraudulent} | confidence: ${receipt.ocrConfidence}`,
      );
    }
  }

  private async process(
    event: ReceiptEvent,
    details: {
      receipt?: TikiReceiptCapture.Receipt;
      account?: ReceiptAccount;
    },
  ): Promise<void> {
    const rewards = this.tiki.config.rewards;
    for (const reward of rewards) {
      const amount = reward.issuer(event, details);
      if (amount != undefined) {
        const historyEvent = HistoryEvent.new(
          amount,
          new Date(),
          event,
          details.account?.type?.valueOf(),
        );
        await this.tiki.sdk.createPayable(
          amount,
          historyEvent.name,
          details.receipt?.blinkReceiptId,
        );
        this.tiki.history.add(historyEvent);
      }
    }
  }
}
