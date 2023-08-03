/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import type { Config } from "@/utils/config/config";
import type {
  LicenseRecord,
  PayableRecord,
  ReceiptRecord,
  TikiSdk,
  TitleRecord,
} from "@mytiki/tiki-sdk-capacitor";
import * as TikiSdkLicensing from "@mytiki/tiki-sdk-capacitor";
import type { ReceiptCapture } from "@mytiki/tiki-capture-receipt-capacitor";
import * as TikiReceiptCapture from "@mytiki/tiki-capture-receipt-capacitor";
import {
  fromDescription,
  HistoryEventType,
  POINTS_REDEEMED_DESCRIPTION,
  RECEIPT_SCANNED_DESCRIPTION,
} from "@/modules/history/history-event-type";
import type { HistoryEvent } from "@/modules/history/history-event";

export class TikiService {
  readonly config: Config;
  readonly licensing: TikiSdk = TikiSdkLicensing.instance;
  readonly capture: ReceiptCapture = TikiReceiptCapture.instance;

  private _id?: string;
  private _title?: TitleRecord;
  private _license?: LicenseRecord;
  private _isInitialized: boolean = false;
  private _total: number = 0;
  private _history: HistoryEvent[] = [];
  private readonly _type = "pt";

  onTotalChanged?: (total: number) => void;

  constructor(config: Config) {
    this.config = config;
  }

  get isInitialized(): boolean {
    return this._isInitialized;
  }

  get total(): number {
    return this._total;
  }

  get history(): HistoryEvent[] {
    return this._history;
  }

  id(): string {
    if (this._id != undefined) return this._id;
    else throw Error("Tiki is not initialized. First call .initialize()");
  }

  async initialize(id: string): Promise<void> {
    await this.licensing.initialize(id, this.config.key.publishingId);
    this._id = id;
    await this.capture.initialize(
      this.config.key.scanKey,
      this.config.key.intelKey,
    );
    this._isInitialized = true;
    this.retrieveHistory();
  }

  async scan(): Promise<void> {
    const license = await this.license();
    if (license != undefined) {
      const receipt = await this.capture.scan();
      if (
        !receipt.duplicate &&
        !receipt.fraudulent &&
        receipt.ocrConfidence >= 0.5
      ) {
        const payable = await this.licensing.createPayable(
          license.id,
          "1",
          this._type,
          undefined,
          RECEIPT_SCANNED_DESCRIPTION,
          receipt.blinkReceiptId,
        );
        this.adjustTotal(Number(payable.amount));
      } else {
        throw Error(
          `Scan failed — duplicate: ${receipt.duplicate} | fraudulent: ${receipt.fraudulent} | confidence: ${receipt.ocrConfidence}`,
        );
      }
    } else
      throw Error(
        `No license found for ${this.id()}. User must first consent to the program.`,
      );
  }

  async license(): Promise<LicenseRecord | undefined> {
    if (this._license != undefined) return this._license;
    else {
      const title = await this.licensing.getTitle(this.id());
      if (title != undefined) {
        this._title = title;
        const licenses = await this.licensing.getLicenses(title.id);
        if (licenses.length > 0)
          this._license = licenses.at(licenses.length - 1);
        return this._license;
      } else {
        return undefined;
      }
    }
  }

  private adjustTotal(val: number): void {
    this._total += val;
    if (this.onTotalChanged != undefined) this.onTotalChanged(this._total);
  }

  private add(payable: PayableRecord): void {
    if (payable.type === this._type) {
      this._total += Number(payable.amount);
      if (payable.description != undefined) {
        this._history.push({
          name: payable.description,
          amount: Number(payable.amount),
          type: fromDescription(payable.description),
          date: new Date(),
        });
      }
      if (this.onTotalChanged != undefined) this.onTotalChanged(this._total);
    }
  }
  private subtract(receipt: ReceiptRecord): void {
    this._total -= Number(receipt.amount);
    this._history.push({
      name: POINTS_REDEEMED_DESCRIPTION,
      amount: Number(receipt.amount),
      type: HistoryEventType.REDEEM,
      date: new Date(),
    });
    if (this.onTotalChanged != undefined) this.onTotalChanged(this._total);
  }

  private async retrieveHistory(): Promise<void> {
    const license: LicenseRecord | undefined = await this.license();
    if (license != undefined) {
      const payables: PayableRecord[] = await this.licensing.getPayables(
        license.id,
      );
      for (const payable of payables) {
        if (payable.type === this._type) {
          this.add(payable);
          const receipts: ReceiptRecord[] = await this.licensing.getReceipts(
            payable.id,
          );
          receipts.forEach((receipt) => this.subtract(receipt));
        }
      }
    }
  }
}
