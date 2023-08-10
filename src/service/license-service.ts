/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { TikiService } from "@/service/tiki-service";
import type { LicenseRecord } from "@mytiki/tiki-sdk-capacitor";
import type { TitleRecord } from "@mytiki/tiki-sdk-capacitor";
import type { Program } from "@/service/program";

export class LicenseService {
  static readonly PAYABLE_TYPE = "pt";
  readonly tiki: TikiService;
  private _license?: LicenseRecord;

  constructor(tiki: TikiService) {
    this.tiki = tiki;
  }

  async create(program: Program): Promise<void> {
    const id: string = this.tiki.id;
    const titleRecord: TitleRecord = await this.tiki.sdk.createTitle(
      id,
      program.tags ?? [],
    );
    const rsp = await this.tiki.sdk.createLicense(
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

  async get(): Promise<LicenseRecord | undefined> {
    if (this._license != undefined) return this._license;
    else {
      const title = await this.tiki.sdk.getTitle(this.tiki.id);
      if (title != undefined) {
        const licenses = await this.tiki.sdk.getLicenses(title.id);
        if (licenses.length > 0)
          this._license = licenses.at(licenses.length - 1);
        return this._license;
      } else {
        return undefined;
      }
    }
  }
}
