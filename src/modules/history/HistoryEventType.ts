/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import ReceiptIcon from "@/components/icons/solid/ReceiptIcon.vue";
import AccountIcon from "@/components/icons/solid/AccountIcon.vue";
import RedeemIcon from "@/components/icons/outline/RedeemIcon.vue";

export enum HistoryEventType {
  LINK = "link",
  SCAN = "scan",
  REDEEM = "redeem",
}

export const icon = (type: HistoryEventType): Object => {
  switch (type) {
    case HistoryEventType.LINK:
      return ReceiptIcon;
    case HistoryEventType.REDEEM:
      return AccountIcon;
    case HistoryEventType.SCAN:
      return RedeemIcon;
    default:
      return ReceiptIcon;
  }
};
