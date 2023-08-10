/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import type { PayableRecord, ReceiptRecord } from "@mytiki/tiki-sdk-capacitor";

export enum HistoryEventType {
  LINK,
  SCAN,
  REDEEM,
  UNKNOWN,
}

export class HistoryEvent {
  static readonly SCAN_NAME_POSTFIX = "receipt scanned";
  static readonly REDEEM_NAME_POSTFIX = "points redeemed";
  static readonly LINK_NAME_POSTFIX = "account linked";

  readonly name;
  readonly amount;
  readonly type;
  readonly date;

  private constructor(
    name: string,
    amount: number,
    date: Date,
    type: HistoryEventType,
  ) {
    this.name = name.charAt(0).toUpperCase() + name.slice(1);
    this.amount = amount;
    this.date = date;
    this.type = type;
  }

  static scan(amount: number, date: Date, text?: string): HistoryEvent {
    return new HistoryEvent(
      [text, HistoryEvent.SCAN_NAME_POSTFIX].join(""),
      amount,
      date,
      HistoryEventType.SCAN,
    );
  }

  static redeem(amount: number, date: Date, text?: string): HistoryEvent {
    return new HistoryEvent(
      [text, HistoryEvent.REDEEM_NAME_POSTFIX].join(""),
      amount,
      date,
      HistoryEventType.REDEEM,
    );
  }

  static link(amount: number, date: Date, text?: string): HistoryEvent {
    return new HistoryEvent(
      [text, HistoryEvent.LINK_NAME_POSTFIX].join(""),
      amount,
      date,
      HistoryEventType.LINK,
    );
  }

  static payable(payable: PayableRecord): HistoryEvent {
    let type: HistoryEventType;
    if (payable.description === undefined) type = HistoryEventType.UNKNOWN;
    else if (payable.description.endsWith(HistoryEvent.LINK_NAME_POSTFIX))
      type = HistoryEventType.LINK;
    else if (payable.description.endsWith(HistoryEvent.SCAN_NAME_POSTFIX))
      type = HistoryEventType.SCAN;
    else if (payable.description.endsWith(HistoryEvent.REDEEM_NAME_POSTFIX))
      type = HistoryEventType.REDEEM;
    else type = HistoryEventType.UNKNOWN;
    return new HistoryEvent(
      payable.description ?? "Unknown event",
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
      HistoryEventType.REDEEM,
    );
  }
}
