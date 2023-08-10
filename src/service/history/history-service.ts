/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { TikiService } from "@/service/tiki-service";
import { HistoryEvent } from "@/service/history/history-event";
import type { PayableRecord, ReceiptRecord } from "@mytiki/tiki-sdk-capacitor";
import { SdkService } from "@/service/sdk-service";

export class HistoryService {
  private readonly tiki: TikiService;
  private _history: HistoryEvent[] = [];
  private _total: number = 0;

  onChange?: (event: HistoryEvent) => void;

  constructor(tiki: TikiService) {
    this.tiki = tiki;
  }

  get all(): HistoryEvent[] {
    return this._history;
  }

  get latest(): HistoryEvent | undefined {
    return this._history.at(-1);
  }

  get total(): number {
    return this._total;
  }

  add(event: HistoryEvent): void {
    this._history.push(event);
    this._total =
      event.type === ReceiptEvent.REDEEM
        ? this._total - event.amount
        : this._total + event.amount;
    if (this.onChange != undefined) this.onChange(event);
  }

  async load(): Promise<void> {
    const payables: PayableRecord[] = await this.tiki.sdk.getPayables();
    for (const payable of payables) {
      if (payable.type === SdkService.PAYABLE_TYPE) {
        const event = HistoryEvent.payable(payable);
        if (event != undefined) {
          this.add(event);
          const receipts: ReceiptRecord[] =
            await this.tiki.sdk.plugin.getReceipts(payable.id);
          receipts.forEach((receipt) =>
            this.add(HistoryEvent.receipt(receipt)),
          );
        }
      }
    }
  }
}
