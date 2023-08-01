/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import type { Program } from "@/modules/program/program";
import type { Theme } from "@/utils/config/theme";

export interface Config {
  program: Program;
  // rewards: Reward[]
  theme?: Theme;
}
