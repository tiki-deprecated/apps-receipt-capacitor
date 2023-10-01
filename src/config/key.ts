/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

/**
 * License keys for the underlying plugins
 * (@mytiki/tiki-sdk-capacitor and @mytiki/capture-receipt-capacitor).
 */
export interface Key {
  /**
   * The publishing ID for your application. Get a free publishingID at [console.mytiki.com](https://mytiki.com)
   */
  publishingId: string;

  /**
   * Your application's Microblink License Key. Request one from your TIKI account manager.
   */
  scanKey: string;

  /**
   * Your application's Microblink Product Intelligence Key. Request one from your TIKI account manager.
   */
  intelKey: string;
}
