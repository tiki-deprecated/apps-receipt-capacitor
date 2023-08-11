/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { TikiService } from "@/service/tiki-service";
import type { LicenseRecord } from "@mytiki/tiki-sdk-capacitor";

export enum TikiReceiptState {
  Hidden,
  Program,
  Terms,
  Learn,
  Reward,
  History,
  Account,
}

export const initialState = async (
  tiki?: TikiService,
): Promise<TikiReceiptState> => {
  const isInitialized: Boolean = tiki?.isInitialized ?? false;
  if (isInitialized) {
    const id: string = tiki!.sdk.id;
    const license: LicenseRecord | undefined = await tiki!.sdk.getLicense();
    if (license != undefined) return TikiReceiptState.Reward;
    else return TikiReceiptState.Program;
  } else {
    throw Error("TIKI SDK is not yet initialized");
  }
};
