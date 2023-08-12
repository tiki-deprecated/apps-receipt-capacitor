/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { TikiService } from "@/service/tiki-service";
import { HistoryEvent } from "@/service/history/history-event";
import type { PayableRecord, ReceiptRecord } from "@mytiki/tiki-sdk-capacitor";
import { SdkService } from "@/service/sdk-service";
import { ReceiptEvent } from "@/service/receipt/receipt-event";

export class HistoryService {
  private readonly tiki: TikiService;
  private _history: HistoryEvent[] = [];
  private _total: number = 0;
  private _onEventListeners: Map<string, (event: HistoryEvent) => void> =
    new Map();

  constructor(tiki: TikiService) {
    this.tiki = tiki;
  }

  onEvent(id: string, listener: (event: HistoryEvent) => void): void {
    this._onEventListeners.set(id, listener);
  }

  get all(): HistoryEvent[] {
    return [...this._history];
  }

  get latest(): HistoryEvent | undefined {
    return this._history.at(-1);
  }

  get total(): number {
    return this._total;
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

  add(event: HistoryEvent): void {
    this._history.push(event);
    this._total =
      event.type === ReceiptEvent.REDEEM
        ? this._total - event.amount
        : this._total + event.amount;
    this._onEventListeners.forEach((listener) => listener(event));
  }

  async redeem(): Promise<void> {
    const callback = this.tiki.config.redeem;
    if (callback != undefined) {
      const points = callback(this._total);
      if (points != undefined) {
        const event = HistoryEvent.redeem(points, new Date());
        this.add(event);
        await this.tiki.sdk.createReceipt(points, event.name);
      }
    }
  }
}
