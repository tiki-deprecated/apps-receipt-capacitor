/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import "./assets/main.css";

import { createApp } from "vue";
import App from "@/app.vue";

import Tiki from "@mytiki/tiki-receipt-capacitor";

createApp(App)
  .use(Tiki)
  .mount("#app");
