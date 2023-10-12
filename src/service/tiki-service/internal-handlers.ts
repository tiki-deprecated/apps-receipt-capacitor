/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import type { AccountStatus, Capture } from "@/service/capture";
import type { Store } from "@/service/store";
import {
  type Account,
  GMAIL,
  type Receipt,
} from "@mytiki/capture-receipt-capacitor";
import type { Publish } from "@/service/publish";
import { BulletState } from "@/components/bullet/bullet-state";

export class InternalHandlers {
  private readonly capture: Capture;
  private readonly store: Store;
  private readonly publish: Publish;

  constructor(store: Store, capture: Capture, publish: Publish) {
    this.capture = capture;
    this.store = store;
    this.publish = publish;
    this.capture.onAccount(
      "InternalHandler",
      (account: Account, event: AccountStatus): void => {
        if (account.type.id === GMAIL.id) this.onGmail(account, event);
        if (account.type.type === "RETAILER") this.onRetailer(account, event);
      },
    );
    this.capture.onReceipt("InternalHandler", (receipt): void =>
      this.onReceipt(receipt),
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
        console.error(`Failed to update retailer state. Error: ${error}`),
      );
  }

  private onReceipt(receipt: Receipt): void {
    if (!receipt.blinkReceiptId) {
      console.warn(`Receipt missing ID. Skipping: ${JSON.stringify(receipt)}`);
    } else {
      this.store.receipt.add(receipt.blinkReceiptId, new Date(receipt.receiptDate?.value!)).catch((error): void => {
        console.error(`Failed to update receipt state. Error: ${error}`);
      });
      this.publish.publish(receipt).catch((error) => console.error(error));
    }
  }

  async checkPayout(): Promise<void> {
    const gmail = this.store.gmail.get();
    const retailer = this.store.retailer.get();
    const sync = this.store.sync.countWeeks();
    const receipts = this.store.receipt.count();
    if (
      gmail.value === BulletState.P100 &&
      retailer.value === BulletState.P100 &&
      sync >= 4 &&
      receipts >= 5
    ) {
      await this.publish.createPayable(1);
      await this.store.reset();
    }
  }
}
