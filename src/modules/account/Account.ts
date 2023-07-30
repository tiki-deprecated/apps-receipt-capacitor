/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import type { AccountType } from "@/modules/account/AccountType";

export interface Account {
  username: string;
  type: AccountType;
  password?: string;
}
