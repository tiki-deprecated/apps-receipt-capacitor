/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { TikiService } from "@/service/tiki-service";
import type { Account } from "@/service/account";
import { fromEmailProvider, toEmailProvider } from "@/service/account-type";
import type { PayableRecord } from "@mytiki/tiki-sdk-capacitor";
import { LicenseService } from "@/service/license-service";
import { RECEIPT_SCANNED_DESCRIPTION } from "@/service/history-event-type";
import type * as Capture from "@mytiki/tiki-capture-receipt-capacitor";

export class AccountService {
  readonly tiki: TikiService;
  private _accounts: Account[] = [];

  onChange?: (accounts: Account[]) => void;
  onScan?: (account: Account, payable: PayableRecord) => void;

  constructor(tiki: TikiService) {
    this.tiki = tiki;
  }

  get accounts(): Account[] {
    return this._accounts;
  }

  async load(): Promise<void> {
    const accounts = await this.tiki.capture.verifyEmail();
    for (const account of accounts) {
      const type = fromEmailProvider(account.provider);
      if (type != undefined) {
        this.add({
          username: account.username,
          type: type,
        });
      }
    }
  }

  async scan(): Promise<void> {
    const license = await this.tiki.license.get();
    if (license != undefined && this.onScan != undefined) {
      this.tiki.capture.scrapeEmail(
        async (account: Capture.Account, receipts: Capture.Receipt[]) => {
          const type = fromEmailProvider(account.provider);
          if (type != undefined) {
            for (const receipt of receipts) {
              if (!receipt.duplicate && !receipt.fraudulent) {
                const payable = await this.tiki.sdk.createPayable(
                  license.id,
                  "1",
                  LicenseService.PAYABLE_TYPE,
                  undefined,
                  RECEIPT_SCANNED_DESCRIPTION,
                  receipt.blinkReceiptId,
                );
                if (this.onScan != undefined)
                  this.onScan(
                    {
                      username: account.username,
                      type: type,
                    },
                    payable,
                  );
              }
            }
          }
        },
      );
    }
  }

  async login(account: Account): Promise<void> {
    await this.tiki.capture.loginWithEmail(
      account.username,
      account.password!,
      toEmailProvider(account.type)!,
    );
    this.add(account);
    this.scan();
  }

  async logout(account: Account): Promise<void> {
    await this.tiki.capture.removeEmail(
      account.username,
      account.password!,
      toEmailProvider(account.type)!,
    );
    this.remove(account);
  }

  private add(account: Account): void {
    this._accounts.push(account);
    if (this.onChange != undefined) this.onChange(this._accounts);
  }

  private remove(account: Account): void {
    this._accounts = this._accounts.filter(
      (acc) => acc.username != account.username && acc.type != account.type,
    );
    if (this.onChange != undefined) this.onChange(this._accounts);
  }
}
