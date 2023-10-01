/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import type { Ref } from "vue";
import { ref } from "vue";
import { BulletState, toBulletState } from "@/components/bullet/bullet-state";
import { Persist } from "@/service/store/persist";

export class ServiceStore {
  private readonly persist: Persist = new Persist("tiki_receipt");

  private readonly KEY_GMAIL: string = "gmail";

  private _gmail: Ref<
    BulletState.NULL | BulletState.P100 | BulletState.SYNC | BulletState.ERROR
  > = ref(BulletState.NULL);

  async initialize(): Promise<void> {
    await this.initGmail();
  }

  get gmail(): Ref<
    BulletState.NULL | BulletState.P100 | BulletState.SYNC | BulletState.ERROR
  > {
    return this._gmail;
  }

  async setGmail(
    state:
      | BulletState.NULL
      | BulletState.P100
      | BulletState.SYNC
      | BulletState.ERROR,
  ): Promise<void> {
    await this.persist.write(this.KEY_GMAIL, state.valueOf());
    this._gmail.value = state;
  }

  private async initGmail(): Promise<void> {
    const saved = await this.persist.read(this.KEY_GMAIL);
    if (!saved) return;
    const state: BulletState | undefined = toBulletState(saved);
    if (
      state != BulletState.NULL &&
      state != BulletState.P100 &&
      state != BulletState.SYNC &&
      state != BulletState.ERROR
    )
      return;
    this._gmail.value = state;
  }
}
