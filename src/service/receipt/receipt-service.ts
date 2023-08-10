/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import type { ReceiptCapture } from "@mytiki/tiki-capture-receipt-capacitor";
import * as TikiReceiptCapture from "@mytiki/tiki-capture-receipt-capacitor";
import { TikiService } from "@/service/tiki-service";
import { ReceiptAccount } from "@/service/receipt/receipt-account";
import * as Capture from "@mytiki/tiki-capture-receipt-capacitor";

export class ReceiptService {
  static readonly OCR_THRESHOLD = 0.8;
  readonly plugin: ReceiptCapture = TikiReceiptCapture.instance;

  private readonly tiki: TikiService;
  private _accounts: ReceiptAccount[] = [];

  onAccount?: (account: ReceiptAccount) => void;
  onReceipt?: (
    receipt: TikiReceiptCapture.Receipt,
    account?: ReceiptAccount,
  ) => void;

  constructor(tiki: TikiService) {
    this.tiki = tiki;
  }

  get accounts(): ReceiptAccount[] {
    return this._accounts;
  }

  async scan(): Promise<void> {
    const license = await this.tiki.sdk.getLicense();
    if (license != undefined && this.onReceipt != undefined) {
      const receipt = await this.plugin.scan();
      this.addReceipt(receipt);
    } else
      throw Error(
        `No license found for ${this.tiki.sdk.id}. User must first consent to the program.`,
      );
  }

  async login(account: ReceiptAccount): Promise<void> {
    await this.plugin.loginWithEmail(
      account.username,
      account.password!,
      account.provider!,
    );
    this.addAccount(account);
  }

  async logout(account: ReceiptAccount): Promise<void> {
    await this.plugin.removeEmail(
      account.username,
      account.password!,
      account.provider!,
    );
    this.removeAccount(account);
  }

  scrape = async (): Promise<void> =>
    this.plugin.scrapeEmail(
      async (account: Capture.Account, receipts: Capture.Receipt[]) =>
        receipts.forEach((receipt) => this.addReceipt(receipt, account)),
    );

  load = async (): Promise<void> =>
    (await this.plugin.verifyEmail()).forEach((account) =>
      this.addAccount(ReceiptAccount.fromCapture(account)),
    );

  private addAccount(account: ReceiptAccount): void {
    this._accounts.push(account);
    if (this.onAccount != undefined) this.onAccount(account);
    this.scrape();
  }

  private removeAccount(account: ReceiptAccount): void {
    this._accounts = this._accounts.filter(
      (acc) => acc.username != account.username && acc.type != account.type,
    );
    if (this.onAccount != undefined) this.onAccount(account);
  }

  private addReceipt(
    receipt: TikiReceiptCapture.Receipt,
    account?: TikiReceiptCapture.Account,
  ): void {
    if (
      !receipt.duplicate &&
      !receipt.fraudulent &&
      receipt.ocrConfidence >= ReceiptService.OCR_THRESHOLD &&
      this.onReceipt != undefined
    ) {
      this.onReceipt(
        receipt,
        account != undefined ? ReceiptAccount.fromCapture(account) : undefined,
      );
    } else {
      console.warn(
        `Receipt ignored — duplicate: ${receipt.duplicate} | fraudulent: ${receipt.fraudulent} | confidence: ${receipt.ocrConfidence}`,
      );
    }
  }
}
