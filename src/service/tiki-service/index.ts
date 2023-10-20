/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { Config } from "@/config";
import type { Options } from "@/options";
import { InternalHandlers } from "@/service/tiki-service/internal-handlers";
import { Capture } from "@/service/capture";
import { Store } from "@/service/store";
import { Publish } from "@/service/publish";
import type { InjectionKey } from "vue";
import { InjectKey } from "@/utils";
import { BulletState } from "@/components";

/**
 * The main entry point for interacting with service-level (non-UI) functionality.
 * Access the service methods using [Vue3 injection](https://vuejs.org/guide/components/provide-inject.html)
 * with the key `"Tiki"`
 *
 * @example
 * ```
 * <script setup lang="ts">
 * const tiki: TikiService | undefined = inject("Tiki");
 * </script>
 * ```
 */
export class TikiService {
  private readonly config: Config;
  private readonly capture: Capture;
  private readonly store: Store;
  private readonly internalHandlers: InternalHandlers;
  private readonly publish: Publish;
  private _isInitialized: boolean = false;

  /**
   * Do not construct directly. Use [Vue injection](https://vuejs.org/guide/components/provide-inject.html)
   * to access the singleton registered with the key "Tiki"
   *
   * @example
   * const tiki: TikiService | undefined = inject("Tiki");
   */
  constructor(options: Options) {
    this.config = new Config(options);
    this.capture = new Capture();
    this.store = new Store();
    this.publish = new Publish(this.config);
    this.internalHandlers = new InternalHandlers(
      this.store,
      this.capture,
      this.publish,
    );
  }

  /**
   * Get the initialization status of the service.
   * @returns `true` if the service is initialized, `false` otherwise.
   */
  get isInitialized(): boolean {
    return this._isInitialized;
  }

  /**
   * Initialize the service for a specified user.
   * @param id - The user's unique identifier.
   * @returns A Promise that resolves when the initialization is complete.
   */
  async initialize(id: string): Promise<void> {
    await this.store.initialize();
    await this.publish.initialize(id);
    await this.capture.initialize(
      this.config.key.product,
      this.config.key.ios,
      this.config.key.android,
    );
    this._isInitialized = true;
    this.capture.load().then(async (accounts) => {

        const hasGmail = accounts.find(
          (account) => account.type.id === "GMAIL",
        );
        const hasRetailer = accounts.find(
          (account) => account.type.type === "RETAILER",
        );
        if (hasGmail !== undefined)
          await this.store.gmail.set(BulletState.SYNC);
        if (hasRetailer !== undefined)
          await this.store.retailer.set(BulletState.SYNC);

      this.capture
        .scan()
        .catch((error) => console.error(error.toString()))
        .finally(async () => {
          this.store.retailer.update(accounts);
          this.store.gmail.update(accounts);
        });

        this.checkInitialize(hasGmail !== undefined, hasRetailer !== undefined)
    });
    await this.internalHandlers.checkPayout();
  }

  /**
   * Log the user out of all linked accounts, remove all credentials,
   * clear stored preferences, and in-memory service cache.
   * @returns A Promise that resolves when the logout is complete.
   */
  async logout(): Promise<void> {
    await this.capture.logout();
    await this.store.clear();
    this._isInitialized = false;
    this.publish.logout();
  }

  checkLogin(loginType: 'GMAIL' | 'RETAILER') {
    const startDate = this.store.sync.getStartDate()
    if(startDate !== undefined) return 
    if(loginType === 'GMAIL'){
      const retailerState = this.store.retailer.get()
      if(retailerState.value === BulletState.P100){
         this.store.sync.setStartDate()
         this.store.sync.setDisconnectDate(undefined)
      } else return
    }
    if(loginType === 'RETAILER'){
      const gmailState = this.store.gmail.get()
      if(gmailState.value === BulletState.P100){
        this.store.sync.setStartDate()
        this.store.sync.setDisconnectDate(undefined)
      } else return
    }
  }

  checkLogout() {
    const startDate = this.store.sync.getStartDate()
    if(startDate === undefined) return 
    this.store.sync.setDisconnectDate(new Date())
  }

  async checkInitialize(hasGmail: boolean, hasRetailer: boolean){
    const disconnectDate = this.store.sync.getDisconnectDate()
    const startDate = this.store.sync.getStartDate()
    if(disconnectDate === undefined && startDate !== undefined)
      return await this.store.sync.add();
    else {
      if(hasGmail && hasRetailer) 
        return this.store.sync.setDisconnectDate(undefined)
      else {
        if (disconnectDate?.getTime()! >= (1000 * 60 * 60 * 24 * 7)) {
          return await this.store.reset()
        } else return
      }
    }
  }

  /**
   * @ignore
   */
  inject(
    provide: (
      key: InjectionKey<unknown> | string | number,
      value: unknown,
    ) => void,
  ): void {
    provide(InjectKey.config, this.config);
    provide(InjectKey.capture, this.capture);
    provide(InjectKey.publish, this.publish);
    provide(InjectKey.store, this.store);
  }
}
