/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import ReceiptIcon from "@/components/icons/ReceiptIcon.vue";
import AccountIcon from "@/components/icons/AccountIcon.vue";
import RedeemIcon from "@/components/icons/RedeemIcon.vue";

export enum HistoryEventType {
  LINK = "link",
  SCAN = "scan",
  REDEEM = "redeem",
}

export const icon = (type: HistoryEventType): Object => {
  switch (type) {
    case HistoryEventType.LINK:
      return AccountIcon;
    case HistoryEventType.REDEEM:
      return RedeemIcon;
    case HistoryEventType.SCAN:
      return ReceiptIcon;
    default:
      return ReceiptIcon;
  }
};
