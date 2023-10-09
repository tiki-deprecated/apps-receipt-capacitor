/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import type * as Options from "@/options/offer";
import { ProgramImage } from "@/assets/images";

export class Offer {
  readonly image: string = ProgramImage;
  readonly description: string =
    "Connect your accounts to turn your receipts into real cash each month!";
  readonly bullets: string[] = [
    "Link a Gmail account",
    "Link a supported retailer account",
    "Open and use the app each week",
    "Share 5 new receipts",
  ];

  constructor(offer?: Options.Offer) {
    if (offer?.description != null) this.description = offer.description;
    if (offer?.image != null) this.image = offer.image;
    if (offer?.bullets != null) this.bullets = offer.bullets;
  }
}
