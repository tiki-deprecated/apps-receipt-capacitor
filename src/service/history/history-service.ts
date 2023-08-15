/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { TikiService } from "@/service/tiki-service";
import { HistoryEvent } from "@/service/history/history-event";
import type { PayableRecord, ReceiptRecord } from "@mytiki/tiki-sdk-capacitor";
import { SdkService } from "@/service/sdk-service";
import { ReceiptEvent } from "@/service/receipt/receipt-event";

/**
 * Manages the user's history events, such as scanning receipts, redeeming points, and more.
 */
export class HistoryService {
  private readonly tiki: TikiService;
  private _history: HistoryEvent[] = [];
  private _total: number = 0;
  private _onEventListeners: Map<string, (event: HistoryEvent) => void> =
    new Map();

  /**
   * Creates a new HistoryService instance. Do not construct directly. Call from {@link TikiService}.
   * @param tiki - The parent service.
   */
  constructor(tiki: TikiService) {
    this.tiki = tiki;
  }

  /**
   * Adds an event listener for history events.
   * @param id - The ID of the listener.
   * @param listener - The callback function to be called when a history event occurs.
   */
  onEvent(id: string, listener: (event: HistoryEvent) => void): void {
    this._onEventListeners.set(id, listener);
  }

  /**
   * Gets an array of all history events.
   */
  get all(): HistoryEvent[] {
    return [...this._history];
  }

  /**
   * Gets the latest history event.
   */
  get latest(): HistoryEvent | undefined {
    return this._history.at(-1);
  }

  /**
   * Gets the total outstanding reward balance.
   */
  get total(): number {
    return this._total;
  }

  /**
   * Loads the user's existing history events from payable and receipt records.
   */
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

  /**
   * Adds a history event to the service.
   * @param event - The event to be added.
   */
  add(event: HistoryEvent): void {
    this._history.push(event);
    this._total =
      event.type === ReceiptEvent.REDEEM
        ? this._total - event.amount
        : this._total + event.amount;
    this._onEventListeners.forEach((listener) => listener(event));
  }

  /**
   * Fire the {@link Config.redeem} function and creating a new redeem event
   * upon the function returning a number of points. No event created when
   * returning undefined.
   */
  async redeem(): Promise<void> {
    const callback = this.tiki.config.redeem;
    if (callback != undefined) {
      const points = callback(this._total);
      if (points != undefined) {
        const event = HistoryEvent.redeem(Math.abs(points), new Date());
        this.add(event);
        await this.tiki.sdk.createReceipt(points, event.name);
      }
    }
  }
}
