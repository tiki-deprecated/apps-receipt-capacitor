/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { TikiSdk } from "@mytiki/tiki-sdk-capacitor";

export enum State {
  Hidden,
  Offer,
  Terms,
  Learn,
  Reward,
  History,
  Account,
}

export const initialState = async (
  tiki: TikiSdk,
  ptr: string,
): Promise<State> => {
  const isInitialized: Boolean = await tiki?.isInitialized();
  if (isInitialized) {
    const title = await tiki?.getTitle(ptr);
    if (title !== undefined) return State.Reward;
    else return State.Offer;
  } else {
    throw Error("TIKI SDK is not yet initialized");
  }
};
