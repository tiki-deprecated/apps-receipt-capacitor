/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { LearnMore } from "@/assets/md";
import { Theme } from "./theme";
import { Key } from "./key";
import { Offer } from "./offer";
import { Company } from "./company";
import type { Options } from "@/options";
import {
  CommonTags,
  CommonUsecases,
  Tag,
  Usecase,
} from "@mytiki/tiki-sdk-capacitor";
import type { Receipt } from "@mytiki/capture-receipt-capacitor";


export class Config {
  readonly theme: Theme;
  readonly key: Key;
  readonly company: Company;
  readonly learn: string = LearnMore;
  readonly onWithdrawl = (total: number): number | undefined => total;
  readonly onReceipt: ((receipt: Receipt) => void) | undefined = undefined;
  readonly offer: Offer;
  readonly tags: Tag[] = [
    Tag.common(CommonTags.USER_ID),
    Tag.common(CommonTags.PURCHASE_HISTORY),
  ];
  readonly uses: {
    usecases: Usecase[];
    destinations: string[];
  }[] = [
    {
      usecases: [
        Usecase.common(CommonUsecases.ANALYTICS),
        Usecase.common(CommonUsecases.ATTRIBUTION),
        Usecase.common(CommonUsecases.AI_TRAINING),
        Usecase.common(CommonUsecases.DISTRIBUTION),
        Usecase.common(CommonUsecases.PERSONALIZATION),
        Usecase.common(CommonUsecases.RETARGETING),
        Usecase.common(CommonUsecases.SUPPORT),
        Usecase.custom("evaluation"),
      ],
      destinations: ["mytiki.com"],
    },
  ];
  readonly payableType: string = "cash";

  constructor(options: Options) {
    this.key = new Key(options.key);
    this.theme = new Theme(options.theme);
    this.onWithdrawl = options.onWithdrawl ?? this.onWithdrawl;
    this.offer = new Offer(options.offer);
    this.company = new Company(options.company);
    if (options?.learn != null) this.learn = options.learn;
    if (options?.onReceipt != null) this.onReceipt = options.onReceipt;
  }
}

export * from "./key";
export * from "./offer";
export * from "./theme";
