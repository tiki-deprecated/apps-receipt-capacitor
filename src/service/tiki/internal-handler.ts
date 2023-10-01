/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import type { ServiceCapture } from "@/service/capture";
import { AccountStatus } from "@/service/capture";
import type { ServiceStore } from "@/service/store";
import { type Account, GMAIL } from "@mytiki/capture-receipt-capacitor";
import { BulletState } from "@/components/bullet/bullet-state";

export class InternalHandler {
  private readonly capture: ServiceCapture;
  private readonly store: ServiceStore;

  constructor(store: ServiceStore, capture: ServiceCapture) {
    this.capture = capture;
    this.store = store;
    this.capture.onAccount(
      "InternalHandler",
      (account: Account, event: AccountStatus): void => {
        if (account.type.id === GMAIL.id) this.onGmail(account, event);
        if (account.type.type === "RETAILER") this.onRetailer(account, event);
      },
    );
  }

  private onGmail(account: Account, event: AccountStatus): void {
    const all: Account[] = this.capture.accounts.filter(
      (account) => account.type.id === GMAIL.id,
    );
    if (all.length <= 1) {
      switch (event) {
        case AccountStatus.ADDED:
        case AccountStatus.UPDATED:
          this.store.setGmail(
            account.isVerified === true ? BulletState.P100 : BulletState.ERROR,
          );
          break;
        case AccountStatus.REMOVED:
          this.store.setGmail(BulletState.NULL);
          break;
      }
    }
  }

  private onRetailer(_account: Account, _event: AccountStatus): void {}
}
