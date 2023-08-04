/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import type { HistoryEvent } from "@/service/history-event";
import { TikiService } from "@/service/tiki-service";
import type {
  LicenseRecord,
  PayableRecord,
  ReceiptRecord,
} from "@mytiki/tiki-sdk-capacitor";
import { LicenseService } from "@/service/license-service";
import {
  fromDescription,
  HistoryEventType,
  POINTS_REDEEMED_DESCRIPTION,
} from "@/service/history-event-type";

export class HistoryService {
  readonly tiki: TikiService;
  private _history: HistoryEvent[] = [];

  onPayable?: (payable: PayableRecord) => void;
  onReceipt?: (receipt: ReceiptRecord) => void;

  constructor(tiki: TikiService) {
    this.tiki = tiki;
  }

  get all(): HistoryEvent[] {
    return this._history;
  }

  async load(): Promise<void> {
    const license: LicenseRecord | undefined = await this.tiki.license.get();
    if (license != undefined) {
      const payables: PayableRecord[] = await this.tiki.sdk.getPayables(
        license.id,
      );
      for (const payable of payables) {
        if (payable.type === LicenseService.PAYABLE_TYPE) {
          this.addPayable(payable);
          const receipts: ReceiptRecord[] = await this.tiki.sdk.getReceipts(
            payable.id,
          );
          receipts.forEach((receipt) => this.addReceipt(receipt));
        }
      }
    }
  }

  addPayable(payable: PayableRecord): void {
    if (payable.description != undefined) {
      this._history.push({
        name: payable.description,
        amount: Number(payable.amount),
        type: fromDescription(payable.description),
        date: new Date(),
      });
      if (this.onPayable != undefined) this.onPayable(payable);
    }
  }

  addReceipt(receipt: ReceiptRecord): void {
    this._history.push({
      name: POINTS_REDEEMED_DESCRIPTION,
      amount: Number(receipt.amount),
      type: HistoryEventType.REDEEM,
      date: new Date(),
    });
    if (this.onReceipt != undefined) this.onReceipt(receipt);
  }
}
