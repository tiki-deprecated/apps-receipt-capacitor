/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { Config } from "@/config/config";
import type { Options } from "@/config/options";

/**
 * The primary service class for the Library.
 */
export class TikiService {
  /**
   * The configuration settings for the instance.
   */
  readonly config: Config;

  // /**
  //  * The {@link ReceiptService} instance. Call receipt-level operations.
  //  */
  // readonly receipt: ReceiptService;

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
    // this.receipt = new ReceiptService(this);
    // this.history = new HistoryService(this);
    // this.sdk = new SdkService(this);
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
    // await this.sdk.initialize(id);
    // await this.receipt.initialize(this.config.key.scanKey, this.config.key.intelKey);
    this._isInitialized = true;
    // this.history.load();
    // this.receipt.accounts();
  }

  /**
   * Logs the user out of all linked accounts and removes credentials
   * from the local cache.
   * @returns A Promise that resolves when the logout is complete.
   */
  async logout(): Promise<void> {
    // await this.receipt.logout();
    // this.history.clear();
  }
}
