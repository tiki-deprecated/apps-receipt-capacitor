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
import type { ScanType } from "./receipt-account-type";

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
   * @param scanType equals to PHYSICAL Scan a physical receipt and if valid, process and add it to the service.
   * @param scanType undefined will load all receipt data from the @param account
   */
  async scan(scanType: ScanType | undefined, account?: ReceiptAccount): Promise<void> {
    if(scanType === 'PHYSICAL'){
      const license = await this.tiki.sdk.getLicense();
      if (license != undefined) {
        const receipt = await this.plugin.scan(scanType);
        if (receipt.receipt.ocrConfidence > ReceiptService.OCR_THRESHOLD) {
          await this.addReceipt(receipt.receipt);
        } else {
          console.warn(`Receipt ignored: Confidence: ${receipt.receipt.ocrConfidence}`);
        }
      } else
        throw Error(
          `No license found for ${this.tiki.sdk.id}. User must first consent to the program.`,
        );
    }
    if(!scanType){
      const receipts = await this.plugin.scan('ONLINE', account!);
      this.addReceipt(receipts.receipt)
    }
  }

  /**
   * Log in a {@link ReceiptAccount}
   * @param account - the receipt account to log in
   */
  async login(account: ReceiptAccount): Promise<void> {
    if (account.accountType.type === 'EMAIL') {
      await this.plugin.loginWithEmail(
        account.username,
        account.password!,
        account.accountType.key!, //solved
      );
    } else {
      await this.plugin.loginWithRetailer(
        account.username,
        account.password!,
        account.accountType.key!,
      );
    }
    account.isVerified = true;
    this.addAccount(account);
    await this.process(ReceiptEvent.LINK, {
      account: account,
    });
  }

  /**
   * Log out from a {@link ReceiptAccount} or remove all the linked accounts.
   * @param account - The receipt account to log out. 
   * If the @param account - is null, will flush all the receipt accounts of the count
   */
  async logout(account: ReceiptAccount | undefined = undefined): Promise<void> {
    if(!account){
        await this.plugin.flushRetailer().catch(error=>{
          throw Error(`Could not flush emails accounts; Error: ${error}`)
        });
        await this.plugin.flushEmail().catch(error=>{
          throw Error(`Could not flush retailers accounts; Error: ${error}`)
        });
        this._accounts = [];
      return
    }
    if (account!.accountType.type === 'EMAIL') {
      await this.plugin.removeEmail(
        account!.username,
        account!.password!,
        account!.accountType.key!, //solved
      ).catch(error=>{
        throw Error(`Could not remove the email account; Error: ${error}`)
      });
    } else {
      await this.plugin.removeRetailer(
        account!.username,
        account!.accountType.key!,
      ).catch(error=>{
        throw Error(`Could not remove the retailer account; Error: ${error}`)
      });
    }
    this.removeAccount(account!);
    await this.process(ReceiptEvent.UNLINK, {
      account: account,
    });
  }


  /**
   * Load and verify previously logged-in accounts.
   */
  loadAccounts = async (): Promise<void> => {
    try {
      (await this.plugin.accounts()).forEach((account) =>{
        this.addAccount(ReceiptAccount.fromValue(account))
        this.scan('ONLINE', ReceiptAccount.fromValue(account))
      })
    } catch(error){
      throw Error (`Could not load the accounts; Error: ${error}`)
    }

  };

  /**
   * Add an account to the cache and scan the receipts from it
   * @param account - the Receipt Account to be saved in mem
   * calls @scan - to load the receipt data from the account
   */
  private addAccount(account: ReceiptAccount): void {
    this._accounts.push(account);
      this._onAccountListeners.forEach((listener) => listener(account));
      this.scan('ONLINE', account)
  }

  /**
   * Remove an account from the cache
   * @param account - the Receipt Account to be removed
   */
  private removeAccount(account: ReceiptAccount): void {
    this._accounts = this._accounts.filter(
      (acc) => acc.username != account.username && acc.accountType.type != account.accountType.type,
    );
    this._onAccountListeners.forEach((listener) => listener(account));
  }

  /**
   * Verify the receipt to process it
   * @param receipt - the receipt to be processed
   * @param account - the Receipt Account that owns the receipt
   */
  private async addReceipt(
    receipt: TikiReceiptCapture.Receipt,
    account?: TikiReceiptCapture.Account,
  ): Promise<void> {
    if (!receipt.duplicate && !receipt.fraudulent) {
      await this.tiki.sdk.ingest(receipt);
      await this.process(ReceiptEvent.SCAN, {
        receipt: receipt,
        account: ReceiptAccount.fromValue(account!),
      });
      this._onReceiptListeners.forEach((listener) =>
        listener(
          receipt,
          ReceiptAccount.fromValue(account!)
        ),
      );
    } else {
      console.warn(
        `Receipt ignored — duplicate: ${receipt.duplicate} | fraudulent: ${receipt.fraudulent} | confidence: ${receipt.ocrConfidence}`,
      );
    }
  }
  /**
   * Process the receipts that passed in the addReceipt verification
   * @param event - the type of the event that will be processed, in this case its SCAN
   * @param details - the receipt and account 
   * will add the receipt to the history and rewards points to the account
   */
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
          details.account?.accountType.type?.valueOf(),
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
