/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import AccountIcon from "@/assets/icons/account.svg?component";
import ReceiptIcon from "@/assets/icons/receipt.svg?component";
import RedeemIcon from "@/assets/icons/redeem.svg?component";

import type { PayableRecord, ReceiptRecord } from "@mytiki/tiki-sdk-capacitor";
import { ReceiptEvent } from "@/service/receipt/receipt-event";

/**
 * Represents an event in the user's history, such as scanning a receipt, redeeming points, linking an account, etc.
 */
export class HistoryEvent {
  /**
   * The event name postfix for receipt scanning.
   */
  static readonly SCAN_NAME_POSTFIX = "receipt scanned";
  /**
   * The event name postfix for points redemption.
   */
  static readonly REDEEM_NAME_POSTFIX = "points redeemed";
  /**
   * The event name postfix for linking an account.
   */
  static readonly LINK_NAME_POSTFIX = "account linked";
  /**
   * The event name postfix for unlinking an account.
   */
  static readonly UNLINK_NAME_POSTFIX = "account unlinked";

  /**
   * The user-friendly name of the event.
   */
  readonly name: string;
  /**
   * The amount of points issued/redeemed for the event.
   */
  readonly amount: number;
  /**
   * The type of event.
   */
  readonly type: ReceiptEvent;
  /**
   * The date when the event occurred.
   */
  readonly date: Date;

  /**
   * Creates a new HistoryEvent instance. Private constructor, use one of the
   * static methods like scan, link, payable, etc.
   * @private
   *
   * @param name - The name of the event.
   * @param amount - The amount of points for the event.
   * @param date - The date when the event occurred.
   * @param type - The type of event.
   */
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

  /**
   * Creates a new history event for scanning a receipt.
   *
   * @param amount - The amount of points for the event.
   * @param date - The date when the event occurred.
   * @param text - An optional text description for the event.
   * @returns A new HistoryEvent instance.
   */
  static scan(amount: number, date: Date, text?: string): HistoryEvent {
    return new HistoryEvent(
      [text, HistoryEvent.SCAN_NAME_POSTFIX].join(""),
      amount,
      date,
      ReceiptEvent.SCAN,
    );
  }

  /**
   * Creates a new history event for redeeming points.
   * @param amount - The amount of points for the event.
   * @param date - The date when the event occurred.
   * @param text - An optional text description for the event.
   * @returns A new HistoryEvent instance.
   */
  static redeem(amount: number, date: Date, text?: string): HistoryEvent {
    return new HistoryEvent(
      [text, HistoryEvent.REDEEM_NAME_POSTFIX].join(""),
      amount,
      date,
      ReceiptEvent.REDEEM,
    );
  }

  /**
   * Creates a new history event for linking an account.
   * @param amount - The amount of points for the event.
   * @param date - The date when the event occurred.
   * @param text - An optional text description for the event.
   * @returns A new HistoryEvent instance.
   */
  static link(amount: number, date: Date, text?: string): HistoryEvent {
    return new HistoryEvent(
      [text, HistoryEvent.LINK_NAME_POSTFIX].join(""),
      amount,
      date,
      ReceiptEvent.LINK,
    );
  }

  /**
   * Creates a new history event for a payable record.
   * @param payable - The payable record to generate the event from.
   * @returns A new HistoryEvent instance or undefined if an unsupported record.
   */
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
      payable.timestamp != undefined ? new Date(payable.timestamp) : new Date(),
      type,
    );
  }

  /**
   * Creates a new history event for a receipt record.
   * @param receipt - The receipt record to generate the event from.
   * @returns A new HistoryEvent instance.
   */
  static receipt(receipt: ReceiptRecord): HistoryEvent {
    return new HistoryEvent(
      receipt.description ?? HistoryEvent.REDEEM_NAME_POSTFIX,
      Number(receipt.amount),
      receipt.timestamp != undefined ? new Date(receipt.timestamp) : new Date(),
      ReceiptEvent.REDEEM,
    );
  }

  /**
   * Creates a new history event with a specified event type.
   * @param amount - The amount of points for the event.
   * @param date - The date when the event occurred.
   * @param type - The type of event.
   * @param text - An optional text description for the event.
   * @returns A new HistoryEvent instance.
   */
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

  /**
   * Gets the icon (svg) for the event.
   * @returns The icon object associated with the history event.
   */
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
