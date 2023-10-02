/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { Config } from "@/config/config";
import type { Options } from "@/config/options";
import { ServiceCapture } from "@/service/capture";
import { ServiceStore } from "@/service/store";
import { InternalHandlers } from "@/service/tiki/internal-handlers";
import { ServicePublish } from "@/service";

/**
 * The primary service class for the Library.
 */
export class TikiService {
  /**
   * The configuration settings for the instance.
   */
  readonly config: Config;

  /**
   * The {@link CaptureService} instance. Call capture-level operations.
   */
  readonly capture: ServiceCapture;

  readonly store: ServiceStore;
  readonly internalHandlers: InternalHandlers;

  /**
   * The SdkService instance. Operations for managing the underlying license records.
   */
  readonly publish: ServicePublish;

  /**
   * Indicates whether the service has been initialized.
   * @private
   */
  private _isInitialized: boolean = false;

  /**
   * Creates an instance of the TikiService class.
   * Do not construct directly. Use as a Vue Plugin.
   * @param config - The configuration settings for the service.
   */
  constructor(options: Options) {
    this.config = new Config(options);
    this.capture = new ServiceCapture();
    this.store = new ServiceStore();
    this.publish = new ServicePublish();
    this.internalHandlers = new InternalHandlers(this.store, this.capture);
  }

  /**
   * Gets the initialization status of the service.
   * @returns `true` if the service is initialized, `false` otherwise.
   */
  get isInitialized(): boolean {
    return this._isInitialized;
  }

  /**
   * Initializes the service.
   * @param id - The user's unique identifier.
   * @returns A Promise that resolves when the initialization is complete.
   */
  async initialize(id: string): Promise<void> {
    await this.store.initialize();
    await this.publish.initialize(id, this.config.key.publishingId);
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
  }

  /**
   * Logs the user out of all linked accounts and removes credentials
   * from the local cache.
   * @returns A Promise that resolves when the logout is complete.
   */
  async logout(): Promise<void> {
    await this.capture.logout();
    await this.store.clear();
  }
}
