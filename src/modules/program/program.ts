/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import type { ProgramBullet } from "@/modules/program/program-bullet";
import { Tag, Usecase } from "@mytiki/tiki-sdk-capacitor";

export interface Program {
  image: string;
  description: string;
  terms: string;
  learn: string;
  bullets: ProgramBullet[];
  usecases: Usecase[];
  destinations?: string[];
  tags?: Tag[];
}
