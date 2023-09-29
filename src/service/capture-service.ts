/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import * as TikiCaptureReceipt from "@mytiki/capture-receipt-capacitor";
import type {
  Account,
  CaptureReceipt,
  CallbackError,
} from "@mytiki/capture-receipt-capacitor";

export enum AccountStatus {
  ADDED = "ADDED",
  UPDATED = "UPDATED",
  REMOVED = "DELETED",
}

export class CaptureService {
  readonly plugin: CaptureReceipt = TikiCaptureReceipt.instance;
  private _accounts: Map<string, Account> = new Map();
  private _onAccountListeners: Map<
    string,
    (account: Account, event: AccountStatus) => void
  > = new Map();

  async initialize(scanKey: string, intelKey: string): Promise<void> {
    await this.plugin.initialize(scanKey, intelKey).catch((error) => {
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

  async load(): Promise<Account[]> {
    return new Promise<Account[]>(async (resolve, reject) => {
      await this.plugin.accounts(
        (payload): void => {
          console.log("in callback!");
          this.addAccount(payload as Account);
        },
        (_): void => resolve(this.accounts),
        (payload): void => {
          const error = payload as CallbackError;
          console.error(error);
          reject(error);
        },
      );
    });
  }

  async login(account: Account): Promise<Account> {
    const rsp = await this.plugin.login(account);
    this.addAccount(account);
    return account;
  }

  async logout(account: Account | undefined = undefined): Promise<void> {
    if (!account) {
      await this.plugin.logout();
      this._accounts.forEach((account) => this.removeAccount(account));
    } else {
      await this.plugin.logout(account);
      this.removeAccount(account!);
    }
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
