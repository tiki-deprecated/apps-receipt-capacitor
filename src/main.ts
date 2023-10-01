/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

/**
 * This module provides a Vue Application with the main {@link TikiService} under the key
 * 'Tiki' (e.g. `inject("Tiki")`) and install the component TikiReceipt.
 * @module tiki-receipt-capacitor
 */

import type { App } from "vue";
import "@/assets/styles/main.css";
import TikiReceipt from "./tiki-receipt.vue";
import { TikiService } from "@/service/tiki-service";
import type { Options } from "@/config/options";
import type { Key } from "@/config/key";
import type { Offer } from "@/config/offer";
import type { Theme } from "@/config/theme";

export default {
  /**
   * Installs the {@link TikiReceipt} component and {@link TikiService} onto the Vue app.
   * @param app - The Vue app instance.
   * @param config - The configuration settings.
   */
  install: (app: App, options: Options): void => {
    app.component("TikiReceipt", TikiReceipt);
    app.provide("Tiki", new TikiService(options));
  },
};

export { TikiReceipt };
export type {
  TikiService,
  Options as TikiOptions,
  Key as TikiKey,
  Offer as TikiOffer,
  Theme as TikiTheme,
};
