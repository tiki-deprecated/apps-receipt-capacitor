/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { TikiService } from "@/tiki-service";
import type { Account } from "@/modules/account/account";
import {
  fromEmailProvider,
  toEmailProvider,
} from "@/modules/account/account-type";

export class AccountService {
  tiki: TikiService;
  private readonly _onAccountsChanged?: (accounts: Account[]) => void;
  private _accounts: Account[] = [];

  constructor(
    tiki: TikiService,
    onAccountsChanged?: (accounts: Account[]) => void,
  ) {
    this.tiki = tiki;
    this._onAccountsChanged = onAccountsChanged;
    this.retrieve();
  }

  get accounts(): Account[] {
    return this._accounts;
  }

  private async retrieve(): Promise<void> {
    const accounts = await this.tiki.capture.verifyEmail();
    for (const account of accounts) {
      const type = fromEmailProvider(account.provider);
      if (type != undefined) {
        this.addAccount({
          username: account.username,
          type: type,
        });
      }
    }
  }

  async login(account: Account): Promise<void> {
    await this.tiki.capture.loginWithEmail(
      account.username,
      account.password!,
      toEmailProvider(account.type)!,
    );
    this.addAccount(account);
  }

  async logout(account: Account): Promise<void> {
    await this.tiki.capture.removeEmail(
      account.username,
      account.password!,
      toEmailProvider(account.type)!,
    );
    this.removeAccount(account);
  }

  private addAccount(account: Account): void {
    this._accounts.push(account);
    if (this._onAccountsChanged != undefined)
      this._onAccountsChanged(this._accounts);
  }

  private removeAccount(account: Account): void {
    this._accounts = this._accounts.filter(
      (acc) => acc.username != account.username && acc.type != account.type,
    );
    if (this._onAccountsChanged != undefined)
      this._onAccountsChanged(this._accounts);
  }
}
