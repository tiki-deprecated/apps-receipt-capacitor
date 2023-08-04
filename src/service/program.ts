/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { Tag, Usecase } from "@mytiki/tiki-sdk-capacitor";

export interface Program {
  image: string;
  description: string;
  terms: string;
  learn: string;
  bullets: {
    text: String;
    isUsed: Boolean;
  }[];
  usecases: Usecase[];
  destinations?: string[];
  tags?: Tag[];
}
