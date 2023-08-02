/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import type {
  LicenseRecord,
  TitleRecord,
  TikiSdk,
} from "@mytiki/tiki-sdk-capacitor";
import type { Program } from "@/modules/program/program";

export class TermsService {
  tiki: TikiSdk;

  constructor(tiki: TikiSdk) {
    this.tiki = tiki;
  }

  accept = async (program: Program): Promise<LicenseRecord> => {
    const id: string = await this.tiki.id();
    const titleRecord: TitleRecord = await this.tiki.createTitle(
      id,
      program.tags ?? [],
    );
    return await this.tiki.createLicense(
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
  };
}
