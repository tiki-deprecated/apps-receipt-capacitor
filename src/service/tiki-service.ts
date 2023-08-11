/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import type { Config } from "@/service/config";
import { ReceiptService } from "@/service/receipt/receipt-service";
import { SdkService } from "@/service/sdk-service";
import { HistoryService } from "@/service/history/history-service";

export class TikiService {
  readonly config: Config;
  readonly receipt: ReceiptService;
  readonly history: HistoryService;
  readonly sdk: SdkService;

  private _isInitialized: boolean = false;

  constructor(config: Config) {
    this.config = config;
    this.receipt = new ReceiptService(this);
    this.history = new HistoryService(this);
    this.sdk = new SdkService(this);
  }

  get isInitialized(): boolean {
    return this._isInitialized;
  }

  async initialize(id: string): Promise<void> {
    await this.sdk.initialize(id);
    await this.receipt.plugin.initialize(
      this.config.key.scanKey,
      this.config.key.intelKey,
    );
    this._isInitialized = true;
    this.history.load();
    this.receipt.load().then(() => this.receipt.scrape());
  }
}
