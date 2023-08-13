/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import AccountIcon from "@/assets/icons/account.svg?component";
import ReceiptIcon from "@/assets/icons/receipt.svg?component";
import RedeemIcon from "@/assets/icons/redeem.svg?component";

import type { PayableRecord, ReceiptRecord } from "@mytiki/tiki-sdk-capacitor";
import { ReceiptEvent } from "@/service/receipt/receipt-event";

export class HistoryEvent {
  static readonly SCAN_NAME_POSTFIX = "receipt scanned";
  static readonly REDEEM_NAME_POSTFIX = "points redeemed";
  static readonly LINK_NAME_POSTFIX = "account linked";
  static readonly UNLINK_NAME_POSTFIX = "account unlinked";

  readonly name: string;
  readonly amount: number;
  readonly type: ReceiptEvent;
  readonly date: Date;

  private constructor(
    name: string,
    amount: number,
    date: Date,
    type: ReceiptEvent,
  ) {
    this.name = name;
    this.amount = amount;
    this.date = date;
    this.type = type;
  }

  static scan(amount: number, date: Date, text?: string): HistoryEvent {
    return new HistoryEvent(
      [text, HistoryEvent.SCAN_NAME_POSTFIX].join(""),
      amount,
      date,
      ReceiptEvent.SCAN,
    );
  }

  static redeem(amount: number, date: Date, text?: string): HistoryEvent {
    return new HistoryEvent(
      [text, HistoryEvent.REDEEM_NAME_POSTFIX].join(""),
      amount,
      date,
      ReceiptEvent.REDEEM,
    );
  }

  static link(amount: number, date: Date, text?: string): HistoryEvent {
    return new HistoryEvent(
      [text, HistoryEvent.LINK_NAME_POSTFIX].join(""),
      amount,
      date,
      ReceiptEvent.LINK,
    );
  }

  static payable(payable: PayableRecord): HistoryEvent | undefined {
    let type: ReceiptEvent;
    if (payable.description === undefined) return undefined;
    else if (payable.description.endsWith(HistoryEvent.LINK_NAME_POSTFIX))
      type = ReceiptEvent.LINK;
    else if (payable.description.endsWith(HistoryEvent.SCAN_NAME_POSTFIX))
      type = ReceiptEvent.SCAN;
    else if (payable.description.endsWith(HistoryEvent.REDEEM_NAME_POSTFIX))
      type = ReceiptEvent.REDEEM;
    else return undefined;
    return new HistoryEvent(
      payable.description,
      Number(payable.amount),
      new Date(),
      type,
    );
  }

  static receipt(receipt: ReceiptRecord): HistoryEvent {
    return new HistoryEvent(
      receipt.description ?? HistoryEvent.REDEEM_NAME_POSTFIX,
      Number(receipt.amount),
      new Date(),
      ReceiptEvent.REDEEM,
    );
  }

  static new(
    amount: number,
    date: Date,
    type: ReceiptEvent,
    text?: string,
  ): HistoryEvent {
    let name;
    switch (type) {
      case ReceiptEvent.REDEEM:
        name = [text, HistoryEvent.REDEEM_NAME_POSTFIX].join(" ");
        break;
      case ReceiptEvent.LINK:
        name = [text, HistoryEvent.LINK_NAME_POSTFIX].join(" ");
        break;
      case ReceiptEvent.SCAN:
        name = [text, HistoryEvent.SCAN_NAME_POSTFIX].join(" ");
        break;
      case ReceiptEvent.UNLINK:
        name = [text, HistoryEvent.UNLINK_NAME_POSTFIX].join(" ");
        break;
    }
    return new HistoryEvent(name, amount, date, type);
  }

  get icon(): Object {
    switch (this.type) {
      case ReceiptEvent.SCAN:
        return ReceiptIcon;
      case ReceiptEvent.REDEEM:
        return RedeemIcon;
      case ReceiptEvent.UNLINK:
      case ReceiptEvent.LINK:
        return AccountIcon;
    }
  }
}
