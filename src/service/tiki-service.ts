/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import type { Config } from "@/service/config";
import type { TikiSdk } from "@mytiki/tiki-sdk-capacitor";
import * as TikiSdkLicensing from "@mytiki/tiki-sdk-capacitor";
import type { ReceiptCapture } from "@mytiki/tiki-capture-receipt-capacitor";
import * as TikiReceiptCapture from "@mytiki/tiki-capture-receipt-capacitor";
import { HistoryService } from "@/service/history-service";
import { LicenseService } from "@/service/license-service";
import { AccountService } from "@/service/account-service";
import { RewardService } from "@/service/reward-service";

export class TikiService {
  readonly config: Config;
  readonly sdk: TikiSdk = TikiSdkLicensing.instance;
  readonly capture: ReceiptCapture = TikiReceiptCapture.instance;
  readonly history: HistoryService;
  readonly license: LicenseService;
  readonly account: AccountService;
  readonly reward: RewardService;

  private _id?: string;
  private _isInitialized: boolean = false;

  constructor(config: Config) {
    this.config = config;
    this.history = new HistoryService(this);
    this.license = new LicenseService(this);
    this.reward = new RewardService(this);
    this.account = new AccountService(this);

    this.history.onPayable = (payable) => {
      this.reward.add(payable);
    };
    this.history.onReceipt = (receipt) => {
      this.reward.subtract(receipt);
    };
    this.account.onScan = (account, payable) => {
      this.reward.add(payable);
      this.history.addPayable(payable);
    };
  }

  get isInitialized(): boolean {
    return this._isInitialized;
  }

  get id(): string {
    if (this._id != undefined) return this._id;
    else throw Error("Tiki is not initialized. First call .initialize()");
  }

  async initialize(id: string): Promise<void> {
    await this.sdk.initialize(id, this.config.key.publishingId);
    this._id = id;
    await this.capture.initialize(
      this.config.key.scanKey,
      this.config.key.intelKey,
    );
    this._isInitialized = true;
    this.history.load();
    this.account.load().then(() => this.account.scan());
  }
}
