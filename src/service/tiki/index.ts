/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { Config } from "@/config/config";
import type { Options } from "@/config/options";
import { ServiceCapture } from "@/service/capture";
import { ServiceStore } from "@/service/store";
import { InternalHandler } from "@/service/tiki/internal-handler";
import { BulletState } from "@/components/bullet/bullet-state";

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
  readonly internalHandlers: InternalHandler;

  // /**
  //  * The {@link HistoryService} instance. Call methods related to a
  //  * user's reward balance and historical event trail.
  //  */
  // readonly history: HistoryService;

  // /**
  //  * The SdkService instance. Operations for managing the underlying license records.
  //  */
  // readonly sdk: SdkService;

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
    this.internalHandlers = new InternalHandler(this.store, this.capture);
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
  async initialize(): Promise<void> {
    await this.store.initialize();
    await this.capture.initialize(
      this.config.key.scanKey,
      this.config.key.intelKey,
    );
    this._isInitialized = true;
    this.capture
      .load()
      .catch((_) => {
        this.store.setGmail(BulletState.ERROR);
      })
      .then(() => {});
  }

  /**
   * Logs the user out of all linked accounts and removes credentials
   * from the local cache.
   * @returns A Promise that resolves when the logout is complete.
   */
  async logout(): Promise<void> {
    await this.capture.logout();
    // this.history.clear();
  }
}
