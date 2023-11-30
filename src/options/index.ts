/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

/**
 * Interfaces for configuration of this library.
 *
 * Define during app registration. Start with the top-level interface: {@link Options}
 * @module
 */

import type { Key } from "./key";
import type { Offer } from "./offer";
import type { Theme } from "./theme";
import type { Company } from "./company";
import type { Receipt } from "@mytiki/capture-receipt-capacitor";


/**
 * The top-level configuration object for this library. Define during app registration.
 *
 * @example
 * For Vue >=3.0.0
 * ```
 * import { createApp } from "vue";
 * import App from "@/app.vue";
 * import Tiki from "@mytiki/receipt-capacitor";
 * import ProgramImage from "@/assets/images/program.png";
 * import LearnMore from "@/assets/md/learn-more.md?raw";
 *
 * createApp(App)
 *  .use(Tiki, {
 *    company: {
 *      name: "Company Inc.",
 *      jurisdiction: "Tennessee, USA",
 *      privacy: "https://your-co.com/privacy",
 *      terms: "https://your-co.com/terms",
 *    },
 *    key: {
 *      publishingId: "YOUR TIKI PUBLISHING ID",
 *      android: "YOUR MICROBLINK ANDROID LICENSE KEY",
 *      ios: "YOUR MICROBLINK IOS LICENSE KEY",
 *      product: "YOUR MICROBLINK PRODUCT INTELLIGENCE KEY",
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
 *  .mount("#app");
 * ```
 * @example
 * For Vue 2.7.14
 * ```
 * import { createApp } from "vue";
 * import Vue from "vue";
 * import Tiki from "@mytiki/receipt-capacitor-vue2";
 * import ProgramImage from "@/assets/images/program.png";
 * import LearnMore from "@/assets/md/learn-more.md?raw";
 *
 * Vue.use(Tiki, {
 *    company: {
 *      name: "Company Inc.",
 *      jurisdiction: "Tennessee, USA",
 *      privacy: "https://your-co.com/privacy",
 *      terms: "https://your-co.com/terms",
 *    },
 *    key: {
 *      publishingId: "YOUR TIKI PUBLISHING ID",
 *      android: "YOUR MICROBLINK ANDROID LICENSE KEY",
 *      ios: "YOUR MICROBLINK IOS LICENSE KEY",
 *      product: "YOUR MICROBLINK PRODUCT INTELLIGENCE KEY",
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
 *  });
 *
 * new Vue({ render: (h) => h(App) }).$mount("#app");
 * ```
 */
export interface Options {
  /**
   * Your company's information. Required for data licensing agreements.
   */
  company: Company;

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
   * An optional function to execute when a user presses the cash-out button. Use
   * this to create a partial withdrawal, check if a user's account meets minimum
   * withdrawal requirements, etc.
   *
   * For the UI to correctly reflect the users balance, the callback should return
   * the total amount withdrawn.
   *
   * @param total - The user's current cash balance.
   * @returns The amount of cash withdrawn or undefined if nothing withdrawn.
   */
  onWithdrawl?: (total: number) => number | undefined;

   /**
   * An optional function to execute after a receipt be published in Tiki Backend. Use
   * this to log and debug receipts.
   *
   *
   * @param receipt - A Receipt Object.
   * @returns The Receipt Object.
   */
  onReceipt?: (receipt: Receipt) => Receipt | undefined;

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

export * from "./key";
export * from "./theme";
export * from "./offer";
export * from "./company";
