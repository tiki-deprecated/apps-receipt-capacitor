/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import type { ServiceCapture } from "@/service/capture";
import type { AccountStatus } from "@/service/capture";
import type { ServiceStore } from "@/service/store";
import { type Account, GMAIL } from "@mytiki/capture-receipt-capacitor";

export class InternalHandlers {
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

  private onGmail(_account: Account, _event: AccountStatus): void {
    this.store.gmail
      .update(this.capture.accounts)
      .catch((error) =>
        console.error(`Failed to update gmail state. Error: ${error}`),
      );
  }

  private onRetailer(_account: Account, _event: AccountStatus): void {
    this.store.retailer
      .update(this.capture.accounts)
      .catch((error) =>
        console.error(`Failed to update gmail state. Error: ${error}`),
      );
  }
}
