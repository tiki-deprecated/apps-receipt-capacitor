/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import type { App } from "vue";
import "./assets/main.css";
import Tiki from "@/components/Tiki.vue";

export default {
  install: (app: App) => {
    app.component("Tiki", Tiki);
  },
};

export { Tiki };
