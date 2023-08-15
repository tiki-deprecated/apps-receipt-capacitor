/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

/**
 * Supported receipt event types
 */
export enum ReceiptEvent {
  /**
   * A new receipt(s) scanned or scraped.
   */
  SCAN,

  /**
   * An account successfully linked (aka login).
   */
  LINK,

  /**
   * An account successfully unlinked (aka logout).
   */
  UNLINK,

  /**
   * Reward points redeemed/cashed out.
   */
  REDEEM,
}
