/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import * as TikiCaptureReceipt from "@mytiki/tiki-capture-receipt-capacitor";
import type {
  Account,
  ReceiptCapture,
} from "@mytiki/tiki-capture-receipt-capacitor";
import { AccountCreds } from "@/components/account/account-creds";

export enum AccountStatus {
  ADDED = "ADDED",
  UPDATED = "UPDATED",
  REMOVED = "DELETED",
}

export class CaptureService {
  readonly plugin: ReceiptCapture = TikiCaptureReceipt.instance;
  private _accounts: Map<string, AccountCreds> = new Map();
  private _onAccountListeners: Map<
    string,
    (account: AccountCreds, event: AccountStatus) => void
  > = new Map();

  constructor() {
    this.plugin.listen("onAccount", (account) =>
      this.addAccount(AccountCreds.from(account)),
    );
  }

  async initialize(
    scanKey: string,
    intelKey: string,
    googleId: string | undefined = undefined,
  ): Promise<void> {
    await this.plugin.initialize(scanKey, intelKey, googleId).catch((error) => {
      throw Error(`Could not initialize; Error: ${error}`);
    });
  }

  get accounts(): AccountCreds[] {
    return Array.from(this._accounts.values());
  }

  onAccount(
    id: string,
    listener: (account: AccountCreds, event: AccountStatus) => void,
  ): void {
    this._onAccountListeners.set(id, listener);
  }

  load = (): Promise<void> => this.plugin.accounts();

  async login(account: AccountCreds): Promise<AccountCreds> {
    await this.plugin.login(
      account.username,
      account.password!,
      account.type.key!,
    );
    account.isVerified = true;
    this.addAccount(account);
    return account;
  }

  async logout(
    account: AccountCreds | undefined = undefined,
  ): Promise<AccountCreds | undefined> {
    if (!account) {
      await this.plugin.logout();
      this._accounts.forEach((account) => this.removeAccount(account));
    } else {
      await this.plugin.logout(
        account.username,
        account.password ?? "",
        account.type.key,
      );
      this.removeAccount(account!);
      return account;
    }
  }

  private addAccount(account: AccountCreds): void {
    this._accounts.set(this.accountKey(account), account);
    this._onAccountListeners.forEach((listener) =>
      listener(account, AccountStatus.ADDED),
    );
  }

  private removeAccount(account: AccountCreds): void {
    this._accounts.delete(this.accountKey(account));
    this._onAccountListeners.forEach((listener) =>
      listener(account, AccountStatus.REMOVED),
    );
  }

  private accountKey = (account: AccountCreds): string =>
    account.type.key + ":" + account.username;
}
