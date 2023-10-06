/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import LearnMore from "@/assets/md/learn-more.md?raw";
import Terms from "@/assets/md/terms.md?raw";
import { Theme } from "@/config/theme";
import { Key } from "@/config/key";
import { Offer } from "@/config/offer";
import type { Options } from "@/options";
import {
  CommonTags,
  CommonUsecases,
  Tag,
  Usecase,
} from "@mytiki/tiki-sdk-capacitor";

export class Config {
  readonly theme: Theme;
  readonly key: Key;
  readonly terms: string = Terms;
  readonly learn: string = LearnMore;
  readonly callback: (total: number) => number | undefined;
  readonly offer;
  readonly tags: Tag[] = [
    Tag.common(CommonTags.USER_ID),
    Tag.common(CommonTags.PURCHASE_HISTORY),
  ];
  readonly uses: {
    usecases: Usecase[];
    destinations: string[];
  }[] = [
    {
      usecases: [Usecase.common(CommonUsecases.DISTRIBUTION)],
      destinations: ["mytiki.com"],
    },
  ];
  readonly payableType: string = "cash";

  constructor(options: Options) {
    this.key = new Key(options.key);
    this.theme = new Theme(options.theme);
    this.callback = options.callback;
    this.offer = new Offer(options.offer);
    if (options?.learn != null) this.learn = options.learn;
  }
}

export * from "./key";
export * from "./offer";
export * from "./theme";
