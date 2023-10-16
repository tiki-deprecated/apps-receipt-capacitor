/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

/**
 * Your company's definition.
 *
 * Required for user data licensing
 * [agreements](https://github.com/tiki/apps-receipt-capacitor/blob/main/src/assets/md/agreement.md).
 */
export interface Company {
  /**
   * The legal name of the company responsible for the application.
   */
  name: string;
  /**
   * The legal jurisdiction or address of the company.
   */
  jurisdiction: string;
  /**
   * A link (URL, deeplink, etc.) to the application's standard terms of service.
   */
  terms: string;
  /**
   * A link (URL, deeplink, etc.) to the application's privacy policy.
   */
  privacy: string;
}
