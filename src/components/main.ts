/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import type { App } from "vue";
import MyButton from "@/components/MyButton.vue";

export default {
  install: (app: App) => {
    app.component("MyButton", MyButton);
  },
};

export { MyButton };
