/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import type { Bullet } from "@/modules/offer/Bullet";

export interface Offer {
  reward: String;
  description: String;
  bullets: Array<Bullet>;
}
