/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import type { App } from "vue";
import "@/assets/main.css";
import TikiReceipt from "@/tiki-receipt.vue";
import type { Config } from "@/utils/config/config";
import type { Program } from "@/modules/program/program";
import type { Theme } from "@/utils/config/theme";
import type { Key } from "@/utils/config/key";

export default {
  install: (app: App) => {
    app.component("TikiReceipt", TikiReceipt);
  },
};

export { TikiReceipt };
export type { Config, Theme, Program, Key };
