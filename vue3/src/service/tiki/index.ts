/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { Config } from "@/config/config";
import type { Options } from "@/config/options";
import { ServiceCapture, ServiceStore, ServicePublish } from "@/service";
import { InternalHandlers } from "@/service/tiki/internal-handlers";

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
  /**
   * @ignore
   */
  readonly config: Config;
  /**
   * @ignore
   */
  readonly capture: ServiceCapture;
  /**
   * @ignore
   */
  readonly store: ServiceStore;
  /**
   * @ignore
   */
  readonly internalHandlers: InternalHandlers;
  /**
   * @ignore
   */
  readonly publish: ServicePublish;
  /**
   * @ignore
   */
  private _isInitialized: boolean = false;

  /**
   * @ignore
   */
  constructor(options: Options) {
    this.config = new Config(options);
    this.capture = new ServiceCapture();
    this.store = new ServiceStore();
    this.publish = new ServicePublish(this.config);
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
      this.config.key.scanKey,
      this.config.key.intelKey,
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
}
