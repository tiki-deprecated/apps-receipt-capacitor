/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import type { Account } from "@mytiki/tiki-capture-receipt-capacitor";
import * as Type from "@/components/account/account-type";

/**
 * Represents a 3rd-party account used to scrape receipts.
 */
export class AccountCreds {
  /**
   * The username of the account.
   */
  username: string;
  /**
   * The 3rd-party account type.
   */
  type: Type.AccountType;
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
   * @param isVerified - Indicates whether the account credentials have been verified. Default false.
   */
  constructor(
    username: string,
    type: Type.AccountType,
    password?: string,
    isVerified?: boolean,
  ) {
    this.username = username;
    this.type = type;
    this.password = password;
    this.isVerified = isVerified ?? false;
  }

  static from(account: Account): AccountCreds {
    const type = Type.findByKey(account.accountType.key);
    if (type != undefined)
      return new AccountCreds(
        account.username,
        account.accountType,
        account.password,
        account.isVerified,
      );
    else throw Error(`Unsupported value: ${account}`);
  }
}
