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
    this.capture.load().then((accounts) => {
      this.store.gmail.update(accounts);
      this.store.retailer.update(accounts);
      this.capture.scan();
    });
    await this.store.sync.add();
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
