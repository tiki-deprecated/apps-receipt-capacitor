/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

/**
 * Data Reward offer configuration. We've pre-configured reasonable defaults for all
 * properties —override as-needed.
 *
 * ![Offer Config Guide](https://cdn.mytiki.com/assets/receipt-offer-config.png)
 */
export interface Offer {
  /**
   * The image src (320x92) to help explain the program and grab the user's attention.
   *
   * Overrides the
   * [default image](https://github.com/tiki/apps-receipt-capacitor/blob/main/src/assets/images/program.png)
   * found under `src/assets/images/program.png`
   */
  image?: string;

  /**
   * A short description explaining the program. Overrides default copy of
   * "Connect your accounts to turn your receipts into real cash each month!"
   */
  description?: string;

  /**
   * A list of bullets explaining the criteria for participating in the program.
   * Overrides the default copy of
   * * Link a Gmail account
   * * Link a supported retailer account
   * * Open and use the app each week
   * * Share 5 new receipts
   */
  bullets?: string[];
}
