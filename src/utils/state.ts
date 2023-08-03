/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { TikiService } from "@/tiki-service";
import type { TitleRecord } from "@mytiki/tiki-sdk-capacitor";

export enum State {
  Hidden,
  Program,
  Terms,
  Learn,
  Reward,
  History,
  Account,
}

export const initialState = async (tiki?: TikiService): Promise<State> => {
  const isInitialized: Boolean = tiki?.isInitialized ?? false;
  if (isInitialized) {
    const id: string = tiki!.id();
    const title: TitleRecord | undefined = await tiki!.licensing.getTitle(id);
    if (title != undefined) return State.Reward;
    else return State.Program;
  } else {
    throw Error("TIKI SDK is not yet initialized");
  }
};
