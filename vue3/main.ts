/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

/**
 * This module registers with a [Vue app](https://vuejs.org) the {@link TikiReceipt} component
 * and a singleton instance of the {@link TikiService}. Define a {@link TikiOptions.Options} object to specify licensing keys, styling, and content overrides.
 *
 * This library is available for both Vue 2 (2.7.14) and Vue 3 (>=3.0.0).
 * - For Vue 3 use the package: `@mytiki/receipt-capacitor`.
 * - For Vue 2 use the package `@mytiki/receipt-capacitor-vue2`.
 *
 * @example
 * Vue >=3.0.0 Registration
 * ```
 * import { createApp } from "vue";
 * import App from "@/app.vue";
 * import Tiki from "@mytiki/receipt-capacitor";
 *
 * createApp(App)
 *  .use(Tiki, {
 *    key: {
 *      publishingId: "YOUR TIKI PUBLISHING ID",
 *      android: "YOUR MICROBLINK ANDROID LICENSE KEY",
 *      ios: "YOUR MICROBLINK IOS LICENSE KEY",
 *      product: "YOUR MICROBLINK PRODUCT INTELLIGENCE KEY",
 *    },
 *    callback: (_total: number): number | undefined => undefined,
 *  })
 *  .mount("#app");
 * ```
 *
 * @example
 * Vue >=2.7.14 Registration
 * ```
 * import { createApp } from "vue";
 * import App from "@/app.vue";
 * import Tiki from "@mytiki/receipt-capacitor-vue2";
 *
 * Vue.use(Tiki, {
 *    key: {
 *      publishingId: "YOUR TIKI PUBLISHING ID",
 *      android: "YOUR MICROBLINK ANDROID LICENSE KEY",
 *      ios: "YOUR MICROBLINK IOS LICENSE KEY",
 *      product: "YOUR MICROBLINK PRODUCT INTELLIGENCE KEY",
 *    },
 *    callback: (_total: number): number | undefined => undefined,
 *  })
 *
 * new Vue({ render: (h) => h(App) }).$mount("#app");
 * ```
 *
 * Next, add the stylesheet for the component to your primary stylesheet (e.g. `main.css`)
 * Example:
 * For Vue >=3.0.0
 * ```
 * @import "@mytiki/receipt-capacitor/dist/receipt-capacitor.css";
 * ```
 *
 * Example:
 * For Vue 2.7.14
 * ```
 * @import "@mytiki/receipt-capacitor-vue2/dist/receipt-capacitor.css";
 * ```
 *
 * Once the {@link TikiService} is initialized, add the {@link TikiReceipt} component to your template and set the html boolean property `present` to display the UI  (e.g. `:present="true"`).
 *
 * _NOTE: `present` implements a [two-way binding](https://vuejs.org/guide/components/v-model.html)
 * and for most use cases we recommend using a named (Vue 3) `v-model` instead of a standard property binding.
 * This ensures the Ref stays in-sync with the UI state —the user can close the popup at anytime._
 *
 * @example
 * For Vue >=3.0.0:
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
 * @example
 * For Vue >=2.7.14:
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
 *        <tiki-receipt :present="present" @update:present="(val) => (present = val)"/>
 *     </div>
 * </template>
 * ```
 *
 * @module tiki-receipt-capacitor
 */

import type { App } from "vue";
import "@/assets/styles/main.css";
import TikiReceipt from "@/tiki-receipt.vue";
import { TikiService } from "@/service/tiki-service";
import type * as TikiOptions from "@/options";

/**
 * @ignore
 */
export default {
  install: (app: App, options: TikiOptions.Options): void => {
    app.component("TikiReceipt", TikiReceipt);
    app.provide("Tiki", new TikiService(options));
  },
};

export { TikiReceipt };
export type { TikiService, TikiOptions };
