/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import type { Account } from "@mytiki/tiki-capture-receipt-capacitor";
import type { AccountType } from "./receipt-account-type";
import { AccountTypeCommom } from "./receipt-account-type";

/**
 * Represents a 3rd-party account used to scrape receipts.
 */
export class ReceiptAccount {
  /**
   * The username of the account.
   */
  username: string;
  /**
   * The 3rd-party account type.
   */
  accountType: AccountType;
  /**
   * The password of the account. Only present during login.
   */
  password?: string;
  /**
   * Indicates whether the account credentials have been verified.
   */
  isVerified: boolean;

  /**
   * Creates a new ReceiptAccount instance.
   * @param username - The username of the account.
   * @param type - The type of account.
   * @param password - An optional password for the account.
   * @param verified - Indicates whether the account credentials have been verified. Default false.
   */
  constructor(
    username: string,
    accountType: AccountType,
    password?: string,
    isVerified?: boolean,
  ) {
    this.username = username;
    this.accountType = accountType;
    this.password = password;
    this.isVerified = isVerified ?? false;
  }

  static fromValue(account: Account): ReceiptAccount {
    if (account)
      return new ReceiptAccount(
        account.username,
        account.accountType,
        account.password,
        account.isVerified,
      );
    else throw Error(`Unsupported value: ${account}`);
  }
  static fromSource(account: Account): ReceiptAccount {
    if (account) {
      let accountSource = Object.values(AccountTypeCommom).find(
        (accountObj) => accountObj.key === account.source,
      );
      return new ReceiptAccount(
        account.username,
        accountSource,
        undefined,
        account.isVerified,
      );
    } else throw Error(`Unsupported value: ${account}`);
  }

  get icon(): string {
    return this.accountType.icon!;
  }
}
