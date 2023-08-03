/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { TikiService } from "@/tiki-service";
import type { HistoryEvent } from "@/modules/history/history-event";
import type { PayableRecord, ReceiptRecord } from "@mytiki/tiki-sdk-capacitor";
import {
  fromDescription,
  HistoryEventType,
  POINTS_REDEEMED_DESCRIPTION,
} from "@/modules/history/history-event-type";

export class HistoryService {
  tiki: TikiService;

  constructor(tiki: TikiService) {
    this.tiki = tiki;
  }

  async getAll(): Promise<HistoryEvent[]> {
    const history: HistoryEvent[] = [];
    const license = await this.tiki.license();
    if (license != undefined) {
      const payables: PayableRecord[] = await this.tiki.licensing.getPayables(
        license.id,
      );
      for (const payable of payables) {
        const event = this.payableToHistory(payable);
        if (event != undefined) history.push(event);
        const receipts = await this.tiki.licensing.getReceipts(payable.id);
        receipts.forEach((receipt) => {
          history.push(this.receiptToHistory(receipt));
        });
      }
    }
    return history;
  }

  private payableToHistory(payable: PayableRecord): HistoryEvent | undefined {
    if (payable.description != undefined) {
      return {
        name: payable.description,
        amount: Number(payable.amount),
        type: fromDescription(payable.description),
        date: new Date(),
      };
    }
  }

  private receiptToHistory(receipt: ReceiptRecord): HistoryEvent {
    return {
      name: POINTS_REDEEMED_DESCRIPTION,
      amount: Number(receipt.amount),
      type: HistoryEventType.REDEEM,
      date: new Date(),
    };
  }
}
