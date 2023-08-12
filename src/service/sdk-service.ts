/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import type {
  PayableRecord,
  ReceiptRecord,
  TikiSdk,
} from "@mytiki/tiki-sdk-capacitor";
import * as TikiSdkLicensing from "@mytiki/tiki-sdk-capacitor";
import type { TikiService } from "@/service/tiki-service";
import type { Program } from "@/service/config";
import type { TitleRecord } from "@mytiki/tiki-sdk-capacitor";
import type { LicenseRecord } from "@mytiki/tiki-sdk-capacitor";

export class SdkService {
  private readonly tiki: TikiService;
  private _license?: LicenseRecord;
  private _id?: string;

  static readonly PAYABLE_TYPE = "pt";
  readonly plugin: TikiSdk = TikiSdkLicensing.instance;

  constructor(tiki: TikiService) {
    this.tiki = tiki;
  }

  get id(): string {
    if (this._id != undefined) return this._id;
    else throw Error("Tiki is not initialized. First call .initialize()");
  }

  async initialize(id: string): Promise<void> {
    await this.plugin.initialize(id, this.tiki.config.key.publishingId);
    this._id = id;
  }

  async createLicense(): Promise<void> {
    const program: Program = this.tiki.config.program;
    const titleRecord: TitleRecord = await this.plugin.createTitle(
      this.id,
      program.tags ?? [],
    );
    const rsp = await this.plugin.createLicense(
      titleRecord.id,
      [
        {
          usecases: program.usecases,
          destinations: program.destinations,
        },
      ],
      program.terms,
      undefined,
      program.description,
    );
  }

  async getLicense(): Promise<LicenseRecord | undefined> {
    if (this._license != undefined) return this._license;
    else {
      const title = await this.plugin.getTitle(this.id);
      if (title != undefined) {
        const licenses = await this.plugin.getLicenses(title.id);
        if (licenses.length > 0)
          this._license = licenses.at(licenses.length - 1);
        return this._license;
      } else {
        return undefined;
      }
    }
  }

  async getPayables(): Promise<PayableRecord[]> {
    const license: LicenseRecord | undefined = await this.getLicense();
    return license != undefined ? this.plugin.getPayables(license.id) : [];
  }

  async createPayable(
    amount: number,
    description: string,
    reference?: string,
  ): Promise<PayableRecord | undefined> {
    const license: LicenseRecord | undefined = await this.getLicense();
    if (license != undefined) {
      return this.plugin.createPayable(
        license?.id,
        amount.toString(),
        SdkService.PAYABLE_TYPE,
        undefined,
        description,
        reference,
      );
    }
  }

  async createReceipt(
    amount: number,
    description: string,
  ): Promise<ReceiptRecord | undefined> {
    const payables: PayableRecord[] = await this.getPayables();
    const latest = payables.at(-1);
    if (latest != undefined) {
      return this.plugin.createReceipt(
        latest.id,
        amount.toString(),
        description,
      );
    }
  }
}
