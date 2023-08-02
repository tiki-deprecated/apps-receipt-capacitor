/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import type {
  Receipt,
  ReceiptCapture,
} from "@mytiki/tiki-capture-receipt-capacitor";
import type { PayableRecord, TikiSdk } from "@mytiki/tiki-sdk-capacitor";

export class RewardService {
  capture: ReceiptCapture;
  tiki: TikiSdk;
  _licenseId?: string;

  constructor(capture: ReceiptCapture, tiki: TikiSdk) {
    this.capture = capture;
    this.tiki = tiki;
  }

  scan = async (): Promise<{
    receipt: Receipt;
    payable: PayableRecord;
  }> => {
    const receipt = await this.capture.scan();
    if (
      !receipt.duplicate &&
      !receipt.fraudulent &&
      receipt.ocrConfidence >= 0.5
    ) {
      const payable = await this.tiki.createPayable(
        await this.licenseId(),
        "1",
        "pt",
        undefined,
        undefined,
        receipt.blinkReceiptId,
      );
      return {
        payable: payable,
        receipt: receipt,
      };
    } else {
      throw Error(
        `Scan failed — duplicate: ${receipt.duplicate} | fraudulent: ${receipt.fraudulent} | confidence: ${receipt.ocrConfidence}`,
      );
    }
  };

  private licenseId = async (): Promise<string> => {
    if (this._licenseId != undefined) return this._licenseId;
    else {
      const ptr: string = await this.tiki.id();
      const title = await this.tiki.getTitle(ptr);
      const licenses = await this.tiki.getLicenses(title.id);
      this._licenseId = licenses.at(licenses.length - 1)!.id;
      return this._licenseId;
    }
  };
}
