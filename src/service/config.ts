/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { Tag, Usecase } from "@mytiki/tiki-sdk-capacitor";
import type { Receipt } from "@mytiki/tiki-capture-receipt-capacitor";
import type { ReceiptEvent } from "@/service/receipt/receipt-event";
import type { ReceiptAccount } from "@/service/receipt/receipt-account";

export interface Config {
  key: {
    publishingId: string;
    scanKey: string;
    intelKey: string;
  };
  program: Program;
  rewards: Reward[];
  theme?: Theme;
  redeem?: (total: number) => number | undefined;
}

export interface Program {
  image: string;
  description: string;
  terms: string;
  learn: string;
  bullets: {
    text: string;
    isUsed: boolean;
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
  image: string;
  description: string;
  issuer: (
    event: ReceiptEvent,
    details: {
      receipt?: Receipt;
      account?: ReceiptAccount;
    },
  ) => number | undefined;
}
