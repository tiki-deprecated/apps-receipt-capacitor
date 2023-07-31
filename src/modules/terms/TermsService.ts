/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import type { LicenseRecord, TitleRecord } from "@mytiki/tiki-sdk-capacitor";
import { Tag, TikiSdk, Usecase } from "@mytiki/tiki-sdk-capacitor";

export const accept = async (
  tiki: TikiSdk,
  title: {
    ptr: string;
    tags: Array<string>;
  },
  license: {
    uses: {
      usecases: Array<string>;
      destinations: Array<string>;
    };
    terms: string;
    description?: string;
  },
): Promise<LicenseRecord> => {
  const titleTags: Tag[] = title.tags.map((tag) => Tag.from(tag));
  const titleRecord: TitleRecord = await tiki.createTitle(title.ptr, titleTags);
  return await tiki.createLicense(
    titleRecord.id,
    [
      {
        usecases: license.uses.usecases.map((usecase) => Usecase.from(usecase)),
        destinations: license.uses.destinations,
      },
    ],
    license.terms,
    undefined,
    license.description,
  );
};
