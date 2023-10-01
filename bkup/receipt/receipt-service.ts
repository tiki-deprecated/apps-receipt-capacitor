/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import type { ReceiptCapture } from "@mytiki/capture-receipt-capacitor";
import * as TikiReceiptCapture from "@mytiki/capture-receipt-capacitor";
import { TikiService } from "../../src/service/tiki-service";
import { ReceiptAccount } from "./receipt-account";
import { ReceiptEvent } from "./receipt-event";
import { HistoryEvent } from "../history/history-event";
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
   * The raw plugin instance. Use to call {@link TikiReceiptCapture} directly.
   */
  readonly plugin: ReceiptCapture = TikiReceiptCapture.instance;

  /**
   * The local cached accounts
   */
  get cachedAccounts() {
    return this._accounts;
  }

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
   *
   * Do not construct directly. Call from {@link TikiService}.
   *
   * @param tiki {TikiService} The parent service instance.
   */
  constructor(tiki: TikiService) {
    this.tiki = tiki;
  }

  /**
   * Initializes the Microblink SDK.
   *
   * Ask your account manager for the keys.
   *
   * @param scanKey {string} Microblink scan Key
   * @param intelKey {string} Microblik product intel key
   */
  async initialize(scanKey: string, intelKey: string) {
    await this.plugin.initialize(scanKey, intelKey).catch((error) => {
      throw Error(`Could not initialize; Error: ${error}`);
    });
  }

  /**
   * Login into a retailer or email account to scan for receipts.
   * also saves that account in cache.
   * @param account {ReceiptAccount} The account to login.
   */
  async login(account: ReceiptAccount) {
    await this.plugin.login(
      account.username,
      account.password!,
      account.accountType.key!,
    );
    account.isVerified = true;
    this.addAccount(account);
    await this.process(ReceiptEvent.LINK, {
      account: account,
    });
  }

  /**
   * Log out from one or all {@link ReceiptAccount}.
   *
   * The logout method will remove the credentials from the cache and remove all
   * cached data for this account.
   *
   * @param {ReceiptAccount} account - which account logout from. Logout from all
   * accounts if undefined.
   */
  async logout(account: ReceiptAccount | undefined = undefined) {
    if (!account) {
      await this.plugin.logout();
      this._accounts = [];
      return;
    }
    await this.plugin.logout(
      account.username,
      account.password!,
      account.accountType.key,
    );
    this.removeAccount(account!);
    await this.process(ReceiptEvent.UNLINK, {
      account: account,
    });
  }

  /**
   * Retrieves all saved accounts from capture plugin.
   * Also add those accounts in cache and scan the receipts from they.
   */
  async accounts() {
    try {
      (await this.plugin.accounts()).accounts.forEach((account) => {
        this.addAccount(ReceiptAccount.fromSource(account));
        this.scan("ONLINE");
      });
    } catch (error) {
      throw Error(`Could not load the accounts; Error: ${error}`);
    }
  }

  /**
   * Scan for receipts.
   * It can be a physical one or all virtual receipts (from email/retailer accounts).
   * @param scanType - the type of the scan
   * @param account - the account to be scanned.
   */
  async scan(
    scanType: ScanType | undefined,
    account?: ReceiptAccount,
  ): Promise<void> {
    if (scanType === "PHYSICAL") {
      const license = await this.tiki.sdk.getLicense();
      if (license != undefined) {
        const receipt = await this.plugin.scan(scanType);
        if (receipt.receipt.ocrConfidence > ReceiptService.OCR_THRESHOLD) {
          await this.addReceipt(receipt.receipt);
        } else {
          console.warn(
            `Receipt ignored: Confidence: ${receipt.receipt.ocrConfidence}`,
          );
        }
      } else
        throw new Error(
          `No license found for ${this.tiki.sdk.id}. User must first consent to the program.`,
        );
    }
    const receipts = await this.plugin
      .scan(scanType, account!)
      .catch((error) => {
        throw new Error(error);
      });
    this.addReceipt(receipts.receipt);
  }

  /**
   * Register an account event listener.
   *
   * @param id - Identifier for the listener.
   * @param listener - The callback function to be called when a new account is added or removed.
   */
  onAccount(id: string, listener: (account: ReceiptAccount) => void): void {
    this._onAccountListeners.set(id, listener);
  }

  /**
   * Register a receipt event listener.
   *
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
   * save an account in cache and calls the scan for receipts
   * @param account - the account to be saved and scanned
   */
  private addAccount(account: ReceiptAccount): string | void {
    this._accounts.push(account);
    this._onAccountListeners.forEach((listener) => listener(account));
    this.scan(account.accountType.type, account).catch((error) => {
      throw new Error(error);
    });
  }
  /**
   * remove an account of the cache.
   * @param account - the account to be removed.
   */
  private removeAccount(account: ReceiptAccount): void {
    this._accounts = this._accounts.filter(
      (acc) =>
        acc.username != account.username &&
        acc.accountType.type != account.accountType.type,
    );
    this._onAccountListeners.forEach((listener) => listener(account));
  }

  /**
   * verify/validate a Receipt to process it.
   * @param receipt - the receipt to be verified and processed after
   * @param account - the account that owns the receipt.
   */
  private async addReceipt(
    receipt: TikiReceiptCapture.Receipt,
    account?: TikiReceiptCapture.Account,
  ) {
    if (!receipt.duplicate && !receipt.fraudulent) {
      await this.tiki.sdk.ingest(receipt);
      await this.process(ReceiptEvent.SCAN, {
        receipt: receipt,
        account: ReceiptAccount.fromValue(account!),
      });
      this._onReceiptListeners.forEach((listener) =>
        listener(receipt, ReceiptAccount.fromValue(account!)),
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
  ) {
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
