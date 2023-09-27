/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { TikiService } from "@/service/tiki-service";
import { ref, type Ref } from "vue";

export enum Sheets {
  Hidden,
  Offer,
  Terms,
  Learn,
  Home,
  Connected,
  Retailer,
  Google,
  LinkRetailer,
}

export class Navigate {
  private stack: Sheets[] = [];
  readonly ref: Ref<Sheets>;

  constructor(init?: Ref<Sheets>) {
    this.ref = init ?? ref(Sheets.Hidden);
  }

  async initialize(tiki?: TikiService): Promise<void> {
    const isInitialized: Boolean = tiki?.isInitialized ?? false;
    if (isInitialized) {
      // const id: string = tiki!.sdk.id;
      // const license: LicenseRecord | undefined = await tiki!.sdk.getLicense();
      // if (license != undefined) return SheetState.Reward;
      // else return SheetState.Program;
      this.to(Sheets.Offer);
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
