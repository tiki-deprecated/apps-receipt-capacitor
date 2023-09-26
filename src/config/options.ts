/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import type { Key } from "@/config/key";
import type { Offer } from "@/config/offer";
import type { Theme } from "@/config/theme";

export interface Options {
  /**
   * License keys required for use of the Library. Sign up at [mytiki.com](https://mytiki.com).
   */
  key: Key;

  /**
   * Rewards program settings and overrides.
   */
  offer?: Offer;

  /**
   * UI style settings and overrides.
   */
  theme?: Theme;

  /**
   * A function to execute when a user presses the cash-out button.
   *
   * @param total - The user's current cash balance.
   * @returns The amount of cash withdrawn or undefined if nothing withdrawn.
   */
  callback: (total: number) => number | undefined;

  /**
   * The learn page content in Markdown format. Shown when
   * a user clicks the ? button.
   *
   * Overrides default found under `assets/md/learn-more.md`
   */
  learn?: string;
}
