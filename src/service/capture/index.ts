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
import { AccountStatus } from "./account-status";

export class ServiceCapture {
  readonly plugin: CaptureReceipt = TikiCaptureReceipt.instance;
  private _accounts: Map<string, Account> = new Map();
  private _onAccountListeners: Map<
    string,
    (account: Account, event: AccountStatus) => void
  > = new Map();
  private _onReceiptListeners: Map<string, (receipt: Receipt) => void> =
    new Map();

  async initialize(scanKey: string, intelKey: string): Promise<void> {
    await this.plugin.initialize(scanKey, intelKey).catch((error: any) => {
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
        (error: CallbackError): void => {
          console.error(error.toString());
          reject(error);
        },
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
      await this.plugin.logout();
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
          this._onReceiptListeners.forEach((listener) => listener(receipt));
        },
        7,
        (): void => resolve(),
        (error: CallbackError): void => {
          console.error(error.toString());
          reject(error);
        },
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
}

export * from "./account-status";
