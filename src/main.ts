/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import type { App } from "vue";
import "./assets/main.css";
import TikiReceipt from "./TikiReceipt.vue";

export default {
  install: (app: App) => {
    app.component("TikiReceipt", TikiReceipt);
  },
};

export { TikiReceipt };
