/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import type { Program } from "@/service/program";
import type { Theme } from "@/service/theme";
import type { Reward } from "@/service/reward";

export interface Config {
  key: {
    publishingId: string;
    scanKey: string;
    intelKey: string;
  };
  program: Program;
  rewards: Reward[];
  theme?: Theme;
}
