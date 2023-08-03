/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import type { Config } from "@/utils/config/config";
import * as TikiSdkLicensing from "@mytiki/tiki-sdk-capacitor";
import * as TikiReceiptCapture from "@mytiki/tiki-capture-receipt-capacitor";
import type {
  LicenseRecord,
  TikiSdk,
  TitleRecord,
} from "@mytiki/tiki-sdk-capacitor";
import type { ReceiptCapture } from "@mytiki/tiki-capture-receipt-capacitor";

export class TikiService {
  readonly config: Config;
  readonly licensing: TikiSdk = TikiSdkLicensing.instance;
  readonly capture: ReceiptCapture = TikiReceiptCapture.instance;

  private _id?: string;
  private _title?: TitleRecord;
  private _license?: LicenseRecord;
  private _isInitialized: boolean = false;
  private _total: number = 0;

  onTotalChanged?: (total: number) => void;

  constructor(config: Config) {
    this.config = config;
  }

  async initialize(id: string): Promise<void> {
    await this.licensing.initialize(id, this.config.key.publishingId);
    this._id = id;
    await this.capture.initialize(
      this.config.key.scanKey,
      this.config.key.intelKey,
    );
    this._isInitialized = true;
  }

  get isInitialized(): boolean {
    return this._isInitialized;
  }

  async scan(): Promise<void> {
    const license = await this.license();
    if (license != undefined) {
      const receipt = await this.capture.scan();
      console.log(
        `Scan complete — duplicate: ${receipt.duplicate} | fraudulent: ${receipt.fraudulent} | confidence: ${receipt.ocrConfidence}`,
      );
      if (
        !receipt.duplicate &&
        !receipt.fraudulent &&
        receipt.ocrConfidence >= 0.5
      ) {
        const payable = await this.licensing.createPayable(
          license.id,
          "1",
          "pt",
          undefined,
          undefined,
          receipt.blinkReceiptId,
        );
        this.adjustTotal(Number(payable.amount));
        console.log(`Total is now: ${this._total}`);
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

  id(): string {
    if (this._id != undefined) return this._id;
    else throw Error("Tiki is not initialized. First call .initialize()");
  }

  private async license(): Promise<LicenseRecord | undefined> {
    if (this._license != undefined) return this._license;
    else {
      const title = await this.licensing.getTitle(this.id());
      console.log(`USER TITLE: ${title?.id}`);
      if (title != undefined) {
        this._title = title;
        const licenses = await this.licensing.getLicenses(title.id);
        console.log(`NUM LICENSES: ${licenses.length}`);
        if (licenses.length > 0)
          this._license = licenses.at(licenses.length - 1);
        return this._license;
      } else {
        return undefined;
      }
    }
  }

  get total(): number {
    return this._total;
  }

  private adjustTotal(val: number): void {
    this._total += val;
    if (this.onTotalChanged != undefined) this.onTotalChanged(this._total);
  }
}
