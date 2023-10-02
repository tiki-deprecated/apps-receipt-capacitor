/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import type { TikiService } from "@/service";
import { ref, type Ref } from "vue";
import type { LicenseRecord } from "@mytiki/tiki-sdk-capacitor";

export enum Sheets {
  Hidden,
  Offer,
  Terms,
  Learn,
  Home,
  Connected,
  Retailer,
  Google,
  AddRetailer,
  AddGoogle,
}

export class Navigate {
  private stack: Sheets[] = [];
  readonly ref: Ref<Sheets>;

  constructor(init?: Ref<Sheets>) {
    this.ref = init ?? ref(Sheets.Hidden);
  }

  async initialize(tiki?: TikiService): Promise<void> {
    const isInitialized: boolean = tiki?.isInitialized ?? false;
    if (isInitialized) {
      const license: LicenseRecord | undefined =
        await tiki!.publish.getLicense();
      if (license != undefined) this.to(Sheets.Offer);
      else this.to(Sheets.Home);
    } else {
      throw Error("TIKI SDK is not yet initialized");
    }
  }

  to(to: Sheets): void {
    if (to === Sheets.Hidden) this.clear();
    else {
      this.stack.push(to);
      this.ref.value = to;
    }
  }

  pop(): void {
    if (this.stack.length > 1) {
      this.stack.pop();
      this.ref.value = this.stack.slice(-1)[0];
    } else this.clear();
  }

  clear(): void {
    this.stack = [];
    this.ref.value = Sheets.Hidden;
  }
}
