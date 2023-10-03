/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

/**
 * This library requires unique license keys per application. They are free, but require
 * a few steps:
 *
 * 1) Sign up with our developer console [console.mytiki.com](https://console.mytiki.com) and create
 * a new project to get your `publishingId`.
 *
 * 2) Find your iOS and Android package ids (e.g. `com.mytiki.app`). Your `scanKey` and `intelKey` will only
 * work with that id.
 *
 * 3) Email us at [hello@mytiki.com](mailto:hello@mytiki.com) or let a Tiki account representative know
 * you need access to our Receipt Application —have your package ids ready.
 */
export interface Key {
  /**
   * The publishing ID for your application. Create for free at [console.mytiki.com](https://mytiki.com)
   */
  publishingId: string;

  /**
   * Your application's Microblink License Key. Contact TIKI to get yours.
   */
  scanKey: string;

  /**
   * Your application's Microblink Product Intelligence Key. Contact TIKI to get yours.
   */
  intelKey: string;
}
