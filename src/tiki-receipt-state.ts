/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { TikiService } from "@/service/tiki-service";
import type { TitleRecord } from "../../tiki-sdk-capacitor/src";

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
    const id: string = tiki!.id;
    const title: TitleRecord | undefined = await tiki!.sdk.getTitle(id);
    if (title != undefined) return TikiReceiptState.Reward;
    else return TikiReceiptState.Program;
  } else {
    throw Error("TIKI SDK is not yet initialized");
  }
};
