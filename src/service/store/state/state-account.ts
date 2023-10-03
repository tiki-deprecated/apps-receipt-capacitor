/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import type { Ref } from "vue";
import { ref } from "vue";
import { BulletState, toBulletState } from "@/components/bullet/bullet-state";
import type { Repository } from "@/service/store/repository";
import type { Account } from "@mytiki/capture-receipt-capacitor";

export class StateAccount {
  private readonly repository: Repository;
  private readonly key: string;
  private state: Ref<
    BulletState.NULL | BulletState.P100 | BulletState.SYNC | BulletState.ERROR
  > = ref(BulletState.NULL);

  constructor(repository: Repository, key: string) {
    this.repository = repository;
    this.key = key;
  }

  get = (): Ref<
    BulletState.NULL | BulletState.P100 | BulletState.SYNC | BulletState.ERROR
  > => this.state;

  async set(
    state:
      | BulletState.NULL
      | BulletState.P100
      | BulletState.SYNC
      | BulletState.ERROR,
  ): Promise<void> {
    await this.repository.write(this.key, state.valueOf());
    this.state.value = state;
  }

  async load(): Promise<void> {
    const saved: string | undefined = await this.repository.read(this.key);
    if (!saved) return this.reset();
    const state: BulletState | undefined = toBulletState(saved);
    if (
      state != BulletState.NULL &&
      state != BulletState.P100 &&
      state != BulletState.SYNC &&
      state != BulletState.ERROR
    )
      return;
    this.state.value = state;
  }

  reset = async (): Promise<void> => this.set(BulletState.NULL);

  async update(accounts: Account[]): Promise<void> {
    if (accounts.length > 0) {
      for (const account of accounts) {
        if (account.isVerified === true) return this.set(BulletState.P100);
      }
      return this.set(BulletState.ERROR);
    } else return this.set(BulletState.NULL);
  }
}
