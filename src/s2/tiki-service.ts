/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import type { Config } from "@/s2/config";
import { ReceiptService } from "@/s2/receipt/receipt-service";
import { SdkService } from "@/s2/sdk-service";
import { HistoryService } from "@/s2/history/history-service";

export class TikiService {
  readonly config: Config;
  readonly receipt: ReceiptService;
  readonly history: HistoryService;
  readonly sdk: SdkService;

  private _isInitialized: boolean = false;

  constructor(config: Config) {
    this.config = config;
    this.receipt = new ReceiptService();
    this.history = new HistoryService(this);
    this.sdk = new SdkService(this);
  }

  get isInitialized(): boolean {
    return this._isInitialized;
  }

  async initialize(id: string): Promise<void> {
    // await this.sdk.initialize(id, this.config.key.publishingId);
    // this._id = id;
    // await this.capture.initialize(
    //   this.config.key.scanKey,
    //   this.config.key.intelKey,
    // );
    // this._isInitialized = true;
    // this.history.load();
    // this.account.load().then(() => this.account.scan());
  }
}
