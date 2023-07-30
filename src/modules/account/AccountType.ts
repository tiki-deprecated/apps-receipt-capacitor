/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import AccountIcon from "@/components/icons/AccountIcon.vue";

export enum AccountType {
  GMAIL = "gmail",
}

export const icon = (type: AccountType): Object => {
  switch (type) {
    case AccountType.GMAIL:
      return AccountIcon;
    default:
      return AccountIcon;
  }
};
