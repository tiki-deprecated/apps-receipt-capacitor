/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { Tag, Usecase } from "@mytiki/tiki-sdk-capacitor";

export interface Config {
  key: {
    publishingId: string;
    scanKey: string;
    intelKey: string;
  };
  program: Program;
  rewards: Reward[];
  theme?: Theme;
}

export interface Program {
  image: string;
  description: string;
  terms: string;
  learn: string;
  bullets: {
    text: String;
    isUsed: Boolean;
  }[];
  usecases: Usecase[];
  destinations?: string[];
  tags?: Tag[];
}

export interface Theme {
  fontFamily?: string;
  primaryTextColor?: string;
  secondaryTextColor?: string;
  accentColor?: string;
  primaryBackgroundColor?: string;
  secondaryBackgroundColor?: string;
}

export interface Reward {
  image: String;
  description: String;
  // issuer: (
  //   action: HistoryEventType,
  //   receipts?: Receipt[],
  //   account?: Account,
  // ) => number;
}
