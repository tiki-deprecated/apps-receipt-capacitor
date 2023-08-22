/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */


import type { AccountType } from "./receipt-account-type";

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
  accountType: AccountType
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
    this.accountType = accountType
    this.password = password;
    this.isVerified = isVerified ?? false;
  }

  
  get icon(): string {
    return this.accountType.icon
  }}
