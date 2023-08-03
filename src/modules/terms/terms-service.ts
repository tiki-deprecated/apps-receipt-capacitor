/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import type { LicenseRecord, TitleRecord } from "@mytiki/tiki-sdk-capacitor";
import type { Program } from "@/modules/program/program";
import type { TikiService } from "@/tiki-service";

export class TermsService {
  tiki: TikiService;

  constructor(tiki: TikiService) {
    this.tiki = tiki;
  }

  accept = async (program: Program): Promise<void> => {
    const id: string = this.tiki.id();
    const titleRecord: TitleRecord = await this.tiki.licensing.createTitle(
      id,
      program.tags ?? [],
    );
    await this.tiki.licensing.createLicense(
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
