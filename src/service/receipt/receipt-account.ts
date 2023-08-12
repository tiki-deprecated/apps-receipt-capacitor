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

export class ReceiptAccount {
  username: string;
  type: ReceiptAccountType;
  password?: string;
  verified: boolean;

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

  static fromCapture(account: Account): ReceiptAccount {
    return ReceiptAccount.fromProvider(
      account.username,
      account.provider,
      undefined,
      account.verified,
    );
  }

  get icon(): string {
    return icon(this.type);
  }

  get provider(): AccountProvider | undefined {
    return toEmailProvider(this.type);
  }
}
