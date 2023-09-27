/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import "./assets/main.css";

import { createApp } from "vue";
import App from "@/app.vue";
import Tiki from "@mytiki/tiki-receipt-capacitor";

createApp(App)
  .use(Tiki, {
    key: {
      publishingId: "be19730a-00d5-45f5-b18e-2e19eb25f311",
      scanKey:
        "sRwAAAAoY29tLm15dGlraS5zZGsuY2FwdHVyZS5yZWNlaXB0LmNhcGFjaXRvcgY6SQlVDCCrMOCc/jLI1A3BmOhqNvtZLzShMcb3/OLQLiqgWjuHuFiqGfg4fnAiPtRcc5uRJ6bCBRkg8EsKabMQkEsMOuVjvEOejVD497WkMgobMbk/X+bdfhPPGdcAHWn5Vnz86SmGdHX5xs6RgYe5jmJCSLiPmB7cjWmxY5ihkCG12Q==",
      intelKey:
        "wSNX3mu+YGc/2I1DDd0NmrYHS6zS1BQt2geMUH7DDowER43JGeJRUErOHVwU2tz6xHDXia8BuvXQI3j37I0uYw==",
    },
    callback: (total: number): number | undefined => undefined,
  })
  .mount("#app");
