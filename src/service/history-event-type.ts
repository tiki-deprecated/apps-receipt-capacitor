/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import ReceiptIcon from "@/components/icons/receipt-icon.vue";
import AccountIcon from "@/components/icons/account-icon.vue";
import RedeemIcon from "@/components/icons/redeem-icon.vue";

export const RECEIPT_SCANNED_DESCRIPTION: string = "Receipt scanned";
export const POINTS_REDEEMED_DESCRIPTION: string = "Points redeemed";

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

export const fromDescription = (text: string): HistoryEventType => {
  if (text === RECEIPT_SCANNED_DESCRIPTION) return HistoryEventType.SCAN;
  else if (text === POINTS_REDEEMED_DESCRIPTION) return HistoryEventType.REDEEM;
  else return HistoryEventType.LINK;
};
