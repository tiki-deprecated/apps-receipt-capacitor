/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import type { HistoryEventType } from "@/modules/history/history-event-type";
import type { Receipt } from "@mytiki/tiki-capture-receipt-capacitor";
import type { Account } from "@/modules/account/account";

export interface Reward {
  image: String;
  description: String;
  issuer: (
    action: HistoryEventType,
    receipts?: Receipt[],
    account?: Account,
  ) => number;
}
