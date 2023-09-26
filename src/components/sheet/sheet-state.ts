/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { TikiService } from "@/service/tiki-service";

export enum Sheets {
  Hidden,
  Program,
  Terms,
  Learn,
  Reward,
  History,
  Account,
}

export const initial = async (tiki?: TikiService): Promise<Sheets> => {
  const isInitialized: Boolean = tiki?.isInitialized ?? false;
  if (isInitialized) {
    // const id: string = tiki!.sdk.id;
    // const license: LicenseRecord | undefined = await tiki!.sdk.getLicense();
    // if (license != undefined) return SheetState.Reward;
    // else return SheetState.Program;
    return Sheets.Program;
  } else {
    throw Error("TIKI SDK is not yet initialized");
  }
};
