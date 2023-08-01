/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import ReceiptIcon from "@/components/icons/receipt-icon.vue";
import AccountIcon from "@/components/icons/account-icon.vue";
import RedeemIcon from "@/components/icons/redeem-icon.vue";

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
