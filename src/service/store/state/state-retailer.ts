/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import type { Repository } from "@/service/store/repository";
import type { Account } from "@mytiki/capture-receipt-capacitor";
import { StateAccount } from "@/service/store/state/state-account";

export class StateRetailer extends StateAccount {
  constructor(repository: Repository) {
    super(repository, "retailer");
  }

  update = async (accounts: Account[]): Promise<void> =>
    super.update(
      accounts.filter(
        (account: Account): boolean => account.type.type === "RETAILER",
      ),
    );
}
