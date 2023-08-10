/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { TikiService } from "@/service/tiki-service";
import { RECEIPT_SCANNED_DESCRIPTION } from "@/service/history-event-type";
import type { PayableRecord, ReceiptRecord } from "@mytiki/tiki-sdk-capacitor";
import { LicenseService } from "@/service/license-service";

export class RewardService {
  readonly tiki: TikiService;
  private _total: number = 0;

  onChange?: (total: number) => void;

  constructor(tiki: TikiService) {
    this.tiki = tiki;
  }

  get total(): number {
    return this._total;
  }

  async scan(): Promise<void> {
    const license = await this.tiki.license.get();
    if (license != undefined) {
      const receipt = await this.tiki.capture.scan();
      if (
        !receipt.duplicate &&
        !receipt.fraudulent &&
        receipt.ocrConfidence >= 0.5
      ) {
        const payable = await this.tiki.sdk.createPayable(
          license.id,
          "1",
          LicenseService.PAYABLE_TYPE,
          undefined,
          RECEIPT_SCANNED_DESCRIPTION,
          receipt.blinkReceiptId,
        );
        this.add(payable);
      } else {
        throw Error(
          `Scan failed — duplicate: ${receipt.duplicate} | fraudulent: ${receipt.fraudulent} | confidence: ${receipt.ocrConfidence}`,
        );
      }
    } else
      throw Error(
        `No license found for ${this.tiki.id}. User must first consent to the program.`,
      );
  }

  add(payable: PayableRecord): void {
    if (payable.type === LicenseService.PAYABLE_TYPE) {
      const amount = Number(payable.amount);
      if (!isNaN(amount)) this._total += amount;
      if (this.onChange != undefined) this.onChange(this._total);
    }
  }

  subtract(receipt: ReceiptRecord): void {
    this._total -= Number(receipt.amount);
    if (this.onChange != undefined) this.onChange(this._total);
  }
}
