/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import type { HistoryEventType } from "@/modules/history/HistoryEventType";

export interface HistoryEvent {
  name: String;
  amount: Number;
  type: HistoryEventType;
  date: Date;
}
