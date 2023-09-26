/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import ProgramImage from "@/assets/images/program.png";
import RewardSheet from "@/components/sheet/sheet-reward.vue";
import LearnMore from "@/assets/md/learn-more.md?raw";
import Terms from "@/assets/md/terms.md?raw";
import type { Theme } from "@/config/theme";
import type { Key } from "@/config/key";
import type { Offer } from "@/config/offer";
import type { Options } from "@/config/options";
import type { Component } from "vue";

export class Config {
  readonly theme?: Theme;
  readonly key: Key;
  readonly terms: string = Terms;
  readonly learn: string = LearnMore;
  readonly callback: (total: number) => number | undefined;

  readonly offer: { details: Offer; component: Component } = {
    details: {
      image: ProgramImage,
      description:
        "Connect your accounts to turn your receipts into real cash each month!",
      bullets: [
        "Link a Gmail account",
        "Link a supported retailer account",
        "Open and use the app each week",
        "Share 5 new receipts",
      ],
    },
    component: RewardSheet,
  };

  constructor(options: Options) {
    this.key = options.key;
    this.theme = options.theme;
    this.callback = options.callback;
    if (options?.learn != null) this.learn = options.learn;
    if (options.offer?.description != null)
      this.offer.details.description = options.offer.description;
    if (options.offer?.image != null)
      this.offer.details.image = options.offer.image;
    if (options.offer?.bullets != null)
      this.offer.details.bullets = options.offer.bullets;
  }
}
