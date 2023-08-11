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

// export { ReceiptAccountType };

export class ReceiptAccount {
  username: string;
  type: ReceiptAccountType;
  password?: string;
  verified?: Boolean;

  constructor(username: string, type: ReceiptAccountType, password?: string) {
    this.username = username;
    this.type = type;
    this.password = password;
  }

  static fromProvider(
    username: string,
    provider?: AccountProvider,
    password?: string,
  ): ReceiptAccount {
    const type: ReceiptAccountType | undefined = fromEmailProvider(provider);
    if (type != undefined) return new ReceiptAccount(username, type, password);
    else throw Error(`Unsupported provider: ${provider}`);
  }

  static fromValue(
    username: string,
    value: string,
    password?: string,
  ): ReceiptAccount {
    const type: ReceiptAccountType | undefined = all.get(value);
    if (type != undefined) return new ReceiptAccount(username, type, password);
    else throw Error(`Unsupported value: ${value}`);
  }

  static fromCapture(account: Account): ReceiptAccount {
    return ReceiptAccount.fromProvider(account.username, account.provider);
  }

  get icon(): Object {
    return icon(this.type);
  }

  get provider(): AccountProvider | undefined {
    return toEmailProvider(this.type);
  }
}
