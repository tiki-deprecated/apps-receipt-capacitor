/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import type { Program } from "@/modules/program/program";
import type { Theme } from "@/utils/config/theme";
import type { Key } from "@/utils/config/key";
import type { Reward } from "@/modules/reward/reward";

export interface Config {
  key: Key;
  program: Program;
  rewards: Reward[];
  theme?: Theme;
}
