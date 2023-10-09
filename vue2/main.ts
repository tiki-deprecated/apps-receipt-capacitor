/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import type Vue from "vue";
import "@/assets/styles/main.css";
import TikiReceipt from "@/tiki-receipt.vue";
import { TikiService } from "@/service/tiki-service";
import type * as TikiOptions from "@/options";

export default {
  install: (app: typeof Vue, options: TikiOptions.Options): void => {
    app.component("TikiReceipt", TikiReceipt);
    app.mixin({
      provide: {
        Tiki: new TikiService(options),
      },
    });
  },
};

export { TikiReceipt };
export type { TikiService, TikiOptions };
