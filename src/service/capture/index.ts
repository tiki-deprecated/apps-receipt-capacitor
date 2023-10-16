/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import type {
  Account,
  CaptureReceipt,
  Receipt,
  CallbackError,
} from "@mytiki/capture-receipt-capacitor";
import * as TikiCaptureReceipt from "@mytiki/capture-receipt-capacitor";
import { AccountStatus } from "@/service";

export class Capture {
  readonly plugin: CaptureReceipt = TikiCaptureReceipt.instance;
  private _accounts: Map<string, Account> = new Map();
  private _onAccountListeners: Map<
    string,
    (account: Account, event: AccountStatus) => void
  > = new Map();
  private _onReceiptListeners: Map<string, (receipt: Receipt) => void> =
    new Map();

  async initialize(
    product: string,
    ios: string | undefined = undefined,
    android: string | undefined = undefined,
  ): Promise<void> {
    await this.plugin.initialize(product, ios, android).catch((error: any) => {
      throw Error(`Could not initialize; Error: ${error}`);
    });
  }

  get accounts(): Account[] {
    return Array.from(this._accounts.values());
  }

  onAccount(
    id: string,
    listener: (account: Account, event: AccountStatus) => void,
  ): void {
    this._onAccountListeners.set(id, listener);
  }

  onReceipt(id: string, listener: (receipt: Receipt) => void): void {
    this._onReceiptListeners.set(id, listener);
  }

  async load(): Promise<Account[]> {
    return new Promise<Account[]>((resolve, reject) => {
      this.plugin.accounts(
        (account: Account): void => this.addAccount(account),
        (): void => {
          setTimeout(() => resolve(this.accounts), 100);
        },
        (error: CallbackError): void => reject(error),
      );
    });
  }

  async login(account: Account): Promise<Account> {
    const rsp: Account = await this.plugin.login(account);
    this.addAccount(rsp);
    return account;
  }

  async logout(account: Account | undefined = undefined): Promise<void> {
    if (!account) {
      await this.plugin.logout().catch((err: string) => console.error(err));
      this._accounts.forEach((account: Account) => this.removeAccount(account));
    } else {
      await this.plugin.logout(account);
      this.removeAccount(account);
    }
  }

  async scan(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.plugin.scan(
        (receipt: Receipt) => {
          this._onReceiptListeners.forEach((listener) => {
            if (this.guardReceipt(receipt)) listener(receipt);
          });
        },
        7,
        (): void => resolve(),
        (error: CallbackError): void => reject(error),
      );
    });
  }

  private addAccount(account: Account): void {
    const key = this.accountKey(account);
    const status = this._accounts.has(key)
      ? AccountStatus.UPDATED
      : AccountStatus.ADDED;
    this._accounts.set(this.accountKey(account), account);
    this._onAccountListeners.forEach((listener) => listener(account, status));
  }

  private removeAccount(account: Account): void {
    this._accounts.delete(this.accountKey(account));
    this._onAccountListeners.forEach((listener) =>
      listener(account, AccountStatus.REMOVED),
    );
  }

  private accountKey = (account: Account): string =>
    account.type.id + ":" + account.username;

  private guardReceipt(receipt: Receipt): boolean {
    if (receipt.blinkReceiptId == undefined) {
      console.debug(`Invalid receipt: No blinkReceiptId.`);
      return false;
    }
    if (receipt.retailerId.id == undefined) {
      console.debug(
        `Invalid receipt: Invalid retailerId: ${JSON.stringify(
          receipt.retailerId,
        )}`,
      );
      return false;
    }
    if (receipt.total == undefined) {
      console.debug(`Invalid receipt: No total.`);
      return false;
    }
    if (
      receipt.receiptDateTime == undefined ||
      receipt.receiptDate?.value == undefined
    ) {
      console.debug(
        `Invalid receipt: No receipt date — receiptDateTime: ${JSON.stringify(
          receipt.receiptDateTime,
        )} receiptDate: ${JSON.stringify(receipt.receiptDate)}`,
      );
      return false;
    }
    return true;
  }
}

export * from "./account-status";
