/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import type { Repository } from "@/service/store/repository";
import { type Account, GMAIL } from "@mytiki/capture-receipt-capacitor";
import { StateAccount } from "@/service/store/state/state-account";

export class StateGmail extends StateAccount {
  constructor(repository: Repository) {
    super(repository, "gmail");
  }

  update = async (accounts: Account[]): Promise<void> =>
    super.update(
      accounts.filter(
        (account: Account): boolean => account.type.id === GMAIL.id,
      ),
    );
}
