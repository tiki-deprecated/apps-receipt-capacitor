/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { Tag, Usecase } from "@mytiki/tiki-sdk-capacitor";
import type { Receipt } from "@mytiki/tiki-capture-receipt-capacitor";
import { ReceiptEvent } from "@/service/receipt/receipt-event";
import type { ReceiptAccount } from "@/service/receipt/receipt-account";
import { CommonUsecases, CommonTags } from "@mytiki/tiki-sdk-capacitor";
import offerImage from "@/assets/images/offer-image.png"
import LearnMore from "@/assets/learn-more.md?raw";
import Terms from "@/assets/terms.md?raw";

export interface Config {
  /**
   * License keys required for use of the Library. Sign up at [mytiki.com](https://mytiki.com).
   */
  key: Key;

  /**
   * The description and legal terms of the user's participation in the Data Reward {@link Program}.
   */
  program: Program;

  /**
   * An array of {@link Reward} offers available to Program participants.
   */
  rewards: Reward[];

  /**
   * UI style settings and overrides.
   */
  theme?: Theme;

  /**
   * A function to execute when a user presses the Redeem Points button.
   *
   * @param total - The user's current Reward Points balance.
   * @returns The number of points redeemed or undefined if no points were redeemed.
   */
  redeem?: (total: number) => number | undefined;
}

/**
 * Represents a Data Reward program
 */
export interface Program {
  /**
   * The image src (300x86) to help explain the program and grab the user's attention.
   */
  image: string;

  /**
   * A short description explaining the program.
   */
  description: string;

  /**
   * The legal terms and conditions of the program in Markdown format.
   */
  terms: string;

  /**
   * The learn page content in Markdown format. Shown when
   * a user clicks the ? button.
   */
  learn: string;

  /**
   * An array (maximum 3) of bullet points explaining how a user's data will be
   * used (true) or not used (false).
   */
  bullets: {
    text: string;
  }[];

  /**
   * An array of all approved data {@link Usecase}s. These should all fall under
   * one or more of the more user friendly {@link bullets}.
   */
  usecases: Usecase[];

  /**
   * An optional array of approved data processors (e.g. 'mytiki.com')
   */
  destinations?: string[];

  /**
   * An optional array of metadata {@link Tag}s describing the data assets
   * that make up the program.
   */
  tags?: Tag[];
}

/**
 * UI style customization. Alternatively set the following CSS variables:
 * *  --tiki-font-family
 * *  --tiki-primary-text-color
 * *  --tiki-secondary-text-color
 * *  --tiki-primary-background-color
 * *  --tiki-secondary-background-color
 * *  --tiki-accent-color
 */
export interface Theme {
  /**
   * The font family to use. Defaults to `"Space Grotesk", sans-serif`
   */
  fontFamily?: string;

  /**
   * The primary text color to use. Defaults to `rgb(28 0 0)`.
   */
  primaryTextColor?: string;

  /**
   * The secondary text color to use. Defaults to `rgb(28 0 0 / 60%)`.
   */
  secondaryTextColor?: string;

  /**
   * The accent color to use. Defaults to `rgb(0 178 114)`.
   */
  accentColor?: string;

  /**
   * The primary background color to use. Defaults to `rgb(255 255 255)`.
   */
  primaryBackgroundColor?: string;

  /**
   * The secondary background color to use. Defaults to `rgb(246 246 246)`.
   */
  secondaryBackgroundColor?: string;
}

/**
 * Represents an offer for a specific Data Reward.
 */
export interface Reward {
  /**
   * The image src (300x86) to help explain the offer and grab the user's attention.
   */
  image: string;

  /**
   * A short description explaining the reward offer.
   */
  description: string;

  /**
   * The issuer function to calculate if a user's action fulfills the offer criteria. Called once per every {@link ReceiptEvent}.
   *
   * @param event - The {@link ReceiptEvent}.
   * @param details - Event details including the {@link Receipt} and/or {@link ReceiptAccount}
   * that triggered the event.
   * @returns The reward points to be issued or undefined if the event does not qualify for the reward.
   */
  issuer: (
    event: ReceiptEvent,
    details: {
      receipt?: Receipt;
      account?: ReceiptAccount;
    },
  ) => number | undefined;
}

/**
 * License keys for the underlying plugins
 * (@mytiki/tiki-sdk-capacitor and @mytiki/tiki-capture-receipt-capacitor).
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


export const defaultConfig =  {
  key: {
    publishingId: "be19730a-00d5-45f5-b18e-2e19eb25f311",
    scanKey:
      "sRwAAAAoY29tLm15dGlraS5zZGsuY2FwdHVyZS5yZWNlaXB0LmNhcGFjaXRvcgY6SQlVDCCrMOCc/jLI1A3BmOhqNvtZLzShMcb3/OLQLiqgWjuHuFiqGfg4fnAiPtRcc5uRJ6bCBRkg8EsKabMQkEsMOuVjvEOejVD497WkMgobMbk/X+bdfhPPGdcAHWn5Vnz86SmGdHX5xs6RgYe5jmJCSLiPmB7cjWmxY5ihkCG12Q==",
    intelKey:
      "wSNX3mu+YGc/2I1DDd0NmrYHS6zS1BQt2geMUH7DDowER43JGeJRUErOHVwU2tz6xHDXia8BuvXQI3j37I0uYw==",
  },
  program: {
    image: offerImage,
    description:
      "Connect your accounts to turn your receipts into real cash each month!",
    terms: Terms,
    learn: LearnMore,
    bullets: [
      { text: "Link a Gmail account" },
      { text: "Link a supported retailer account"},
      { text: "Open and use the app each week"},
      { text: "Share 5 new receipts"},
    ],
    usecases: [
      Usecase.common(CommonUsecases.DISTRIBUTION),
      Usecase.common(CommonUsecases.ANALYTICS),
      Usecase.common(CommonUsecases.AI_TRAINING),
      Usecase.common(CommonUsecases.ATTRIBUTION),
    ],
    destinations: ["mytiki.com"],
    tags: [
      Tag.common(CommonTags.USER_ID),
      Tag.common(CommonTags.PURCHASE_HISTORY),
    ],
  },
  rewards: [
    {
      image: '',
      description:
        "Earn 10 points for every receipt you scan or in your linked accounts.",
      issuer: (
        event: ReceiptEvent,
        details: { receipt?: Receipt; account?: ReceiptAccount },
      ): number | undefined => {
        if (event == ReceiptEvent.SCAN) return 10;
      },
    },
    {
      image: '',
      description:
        "Earn 100 points for every account you link. We only check it for receipts.",
      issuer: (
        event: ReceiptEvent,
        details: { receipt?: Receipt; account?: ReceiptAccount },
      ): number | undefined => {
        if (event == ReceiptEvent.LINK) return 100;
        else if (event == ReceiptEvent.UNLINK) return -100;
      },
    },
    {
      image: '',
      description:
        "Check back for special offers and more ways to earn cash for your data.",
      issuer: (
        event: ReceiptEvent,
        details: { receipt?: Receipt; account?: ReceiptAccount },
      ): number | undefined => {
        return undefined;
      },
    },
  ],
  redeem: (total: number): number | undefined =>
    total > 0 ? total : undefined,
}
