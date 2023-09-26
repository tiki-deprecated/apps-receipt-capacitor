/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

/**
 * Represents a Data Reward offer
 */
export interface Offer {
  /**
   * The image src (300x86) to help explain the program and grab the user's attention.
   *
   * Overrides default found under `assets/images/program.png`
   */
  image?: string;

  /**
   * A short description explaining the program. Overrides default copy of
   * "Connect your accounts to turn your receipts into real cash each month!"
   */
  description?: string;

  /**
   * A list of bullets explaining the criteria for participating in the program.
   * Overrides default copy of `["Link a Gmail account", "Link a supported retailer account", "Open and use the app each week", "Share 5 new receipts"]`
   */
  bullets?: string[];
}
