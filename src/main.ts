/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

/**
 * This module registers with a [Vue app](https://vuejs.org) the {@link TikiReceipt} component
 * and a singleton instance of the {@link TikiService}.
 *
 * Define a {@link Config.Options} object to specify licensing keys, styling, and content overrides.
 *
 * @example
 * Register with application:
 * ```
 * import Tiki from "@mytiki/receipt-capacitor";
 *
 * createApp(App)
 *  .use(Tiki, {
 *    key: {
 *       publishingId: "YOUR TIKI PUBLISHING ID",
 *       scanKey: "YOUR MICROBLINK LICENSE KEY",
 *       intelKey: "YOUR MICROBLINK PRODUCT INTELLIGENCE KEY",
 *    },
 *    callback: (_total: number): number | undefined => undefined,
 *  })
 * ```
 *
 * Once the {@link TikiService} is initialized, to display the UI by set the html
 * boolean property `present` (e.g. `:present="true"`).
 *
 * `present` implements a [two-way binding](https://vuejs.org/guide/components/v-model.html)
 * and for most use cases we recommend using `v-model` instead of a standard property binding.
 * This ensures the Ref stays in-sync with the UI state —the user can close the popup at anytime.
 *
 * @example
 * Add the Vue component:
 * ```
 * <script setup lang="ts">
 *     import { inject, ref } from "vue";
 *     import { TikiReceipt, type TikiService } from "@mytiki/receipt-capacitor";
 *
 *     const tiki: TikiService | undefined = inject("Tiki");
 *     tiki?.initialize("USER ID")
 *
 *     const present = ref(false);
 * </script>
 *
 * <template>
 *     <div>
 *        <button @click="present = !present">present</button>
 *        <tiki-receipt v-model:present="present" />
 *     </div>
 * </template>
 * ```
 *
 * @module tiki-receipt-capacitor
 */

import type { App } from "vue";
import "@/assets/styles/main.css";
import TikiReceipt from "./tiki-receipt.vue";
import { TikiService } from "@/service/tiki";
import type * as Config from "@/config/index";
import Vue3TouchEvents from "vue3-touch-events";

/**
 * @ignore
 */
export default {
  install: (app: App, options: Config.Options): void => {
    app.component("TikiReceipt", TikiReceipt);
    app.provide("Tiki", new TikiService(options));
    app.use(Vue3TouchEvents);
  },
};

export { TikiReceipt };
export type { TikiService, Config };
