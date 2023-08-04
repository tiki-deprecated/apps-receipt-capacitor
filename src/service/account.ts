/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import type { AccountType } from "@/service/account-type";

export interface Account {
  username: string;
  type: AccountType;
  password?: string;
}
