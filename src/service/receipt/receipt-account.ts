/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import {
  toEmailProvider,
  fromEmailProvider,
  icon,
  all,
} from "./receipt-account-type";
import { ReceiptAccountType } from "./receipt-account-type";
import { AccountProvider } from "@mytiki/tiki-capture-receipt-capacitor";
import type { Account } from "@mytiki/tiki-capture-receipt-capacitor";

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
  type: ReceiptAccountType;
  /**
   * The password of the account. Only present during login.
   */
  password?: string;
  /**
   * Indicates whether the account credentials have been verified.
   */
  verified: boolean;

  /**
   * Creates a new ReceiptAccount instance.
   * @param username - The username of the account.
   * @param type - The type of account.
   * @param password - An optional password for the account.
   * @param verified - Indicates whether the account credentials have been verified. Default false.
   */
  constructor(
    username: string,
    type: ReceiptAccountType,
    password?: string,
    verified?: boolean,
  ) {
    this.username = username;
    this.type = type;
    this.password = password;
    this.verified = verified ?? false;
  }

  /**
   * Creates a ReceiptAccount instance from a provider, such as Gmail.
   * @param username - The username of the account.
   * @param provider - The account provider, such as AccountProvider.GMAIL.
   * @param password - Optional password of the account.
   * @param verified - Indicates whether the account credentials have been verified. Default false.
   * @returns A new ReceiptAccount instance.
   * @throws Error if the provider is unsupported.
   */
  static fromProvider(
    username: string,
    provider?: AccountProvider,
    password?: string,
    verified?: boolean,
  ): ReceiptAccount {
    const type: ReceiptAccountType | undefined = fromEmailProvider(provider);
    if (type != undefined)
      return new ReceiptAccount(username, type, password, verified);
    else throw Error(`Unsupported provider: ${provider}`);
  }

  /**
   * Creates a ReceiptAccount instance from a {@link ReceiptAccountType} value.
   * @param username - The username of the receipt account.
   * @param value - The string value of the {@link ReceiptAccountType}.
   * @param password - Optional password of the receipt account.
   * @param verified - Indicates whether the receipt account is verified. Default false.
   * @returns A new ReceiptAccount instance.
   * @throws Error if the value is unsupported.
   */
  static fromValue(
    username: string,
    value: string,
    password?: string,
    verified?: boolean,
  ): ReceiptAccount {
    const type: ReceiptAccountType | undefined = all.get(value);
    if (type != undefined)
      return new ReceiptAccount(username, type, password, verified);
    else throw Error(`Unsupported value: ${value}`);
  }

  /**
   * Creates a ReceiptAccount instance from a @mytiki/tiki-capture-receipt-capacitor account.
   * @param account - The account.
   * @returns A new ReceiptAccount instance.
   */
  static fromCapture(account: Account): ReceiptAccount {
    return ReceiptAccount.fromProvider(
      account.username,
      account.provider,
      undefined,
      account.verified,
    );
  }

  /**
   * Gets the icon (image src) associated with the account type.
   */
  get icon(): string {
    return icon(this.type);
  }

  /**
   * Gets the provider associated with the account type.
   */
  get provider(): AccountProvider | undefined {
    return toEmailProvider(this.type);
  }
}
