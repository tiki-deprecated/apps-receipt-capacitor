/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { TikiSdk } from "@mytiki/tiki-sdk-capacitor";

export enum State {
  Hidden,
  Program,
  Terms,
  Learn,
  Reward,
  History,
  Account,
}

export const initialState = async (tiki: TikiSdk): Promise<State> => {
  const isInitialized: Boolean = await tiki?.isInitialized();
  if (isInitialized) {
    const id = await tiki?.id();
    const title = await tiki?.getTitle(id);
    if (title?.id != undefined) return State.Reward;
    else return State.Program;
  } else {
    throw Error("TIKI SDK is not yet initialized");
  }
};
