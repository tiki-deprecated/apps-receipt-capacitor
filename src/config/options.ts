/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import type { Key } from "@/config/key";
import type { Offer } from "@/config/offer";
import type { Theme } from "@/config/theme";

/**
 * The top-level configuration object for this library. Define during app registration.
 *
 * @example
 * ```
 * import Tiki from "@mytiki/receipt-capacitor";
 * import ProgramImage from "@/assets/images/program.png";
 * import LearnMore from "@/assets/md/learn-more.md?raw";
 *
 * createApp(App)
 *  .use(Tiki, {
 *    key: {
 *       publishingId: "YOUR TIKI PUBLISHING ID",
 *       scanKey: "YOUR MICROBLINK LICENSE KEY",
 *       intelKey: "YOUR MICROBLINK PRODUCT INTELLIGENCE KEY",
 *    },
 *    offer: {
 *      image: ProgramImage,
 *      description: "Connect your accounts to turn your receipts into real cash each month!",
 *      bullets: [
 *       "Link a Gmail account",
 *       "Link a supported retailer account",
 *       "Open and use the app each week",
 *       "Share 5 new receipts",
 *      ],
 *    },
 *    theme: {
 *      fontFamily: "'Space Grotesk', sans-serif",
 *      primaryTextColor: "rgb(28 0 0)",
 *      secondaryTextColor: "rgb(28 0 0 / 60%)",
 *      successColor: "rgb(0 178 114)",
 *      errorColor: "rgb(199, 48, 0)",
 *      primaryBackgroundColor: "rgb(255 255 255)",
 *      secondaryBackgroundColor: "rgb(246 246 246)",
 *    },
 *    learn: LearnMore,
 *    callback: (_total: number): number | undefined => undefined,
 *  })
 * ```
 */
export interface Options {
  /**
   * The license keys required to use this Library. Sign up at [mytiki.com](https://mytiki.com).
   */
  key: Key;

  /**
   * Override the default offer content presented to the user.
   */
  offer?: Offer;

  /**
   * Configure the UI styling to fit your application's look and feel.
   */
  theme?: Theme;

  /**
   * A function to execute when a user presses the cash-out button. The application,
   * not the library, is responsible for issuing the user the payout.
   *
   * For the UI to correctly reflect the users balance, the callback should return
   * the total amount withdrawn.
   *
   * @param total - The user's current cash balance.
   * @returns The amount of cash withdrawn or undefined if nothing withdrawn.
   */
  callback: (total: number) => number | undefined;

  /**
   * The learn more page content in [Markdown](https://www.markdownguide.org) format.
   * Shown whenever a user clicks the ? button.
   *
   * Overrides the
   * [default page](https://github.com/tiki/apps-receipt-capacitor/blob/main/src/assets/md/learn-more.md)
   * found under `src/assets/md/learn-more.md`
   */
  learn?: string;
}
