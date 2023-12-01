/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import "./assets/main.css";
import Vue from "vue";
import App from "./app.vue";
import Tiki from "@mytiki/receipt-capacitor-vue2";
import type { Receipt } from "@mytiki/capture-receipt-capacitor"

Vue.use(Tiki, {
  company: {
    name: "Tiki inc.",
    jurisdiction: "Tennessee, USA",
    privacy: "https://mytiki.com/page/privacy",
    terms: "https://mytiki.com/page/terms",
  },
  key: {
    publishingId: "be19730a-00d5-45f5-b18e-2e19eb25f311",
    android:
      "sRwAAAAoY29tLm15dGlraS5zZGsuY2FwdHVyZS5yZWNlaXB0LmNhcGFjaXRvcgY6SQlVDCCrMOCc/jLI1A3BmOhqNvtZLzShMcb3/OLQLiqgWjuHuFiqGfg4fnAiPtRcc5uRJ6bCBRkg8EsKabMQkEsMOuVjvEOejVD497WkMgobMbk/X+bdfhPPGdcAHWn5Vnz86SmGdHX5xs6RgYe5jmJCSLiPmB7cjWmxY5ihkCG12Q==",
    ios: "sRwAAAAoY29tLm15dGlraS5zZGsuY2FwdHVyZS5yZWNlaXB0LmNhcGFjaXRvcgY6SQlVDCCrMOCc/jLI1A3BmOhqNvtZLzShMcb3/OLQLiqgWjuHuFiqGfg4fnAiPtRcc5uRJ6bCBRkg8EsKabMQkEsMOuVjvEOejVD497WkMgobMbk/X+bdfhPPGdcAHWn5Vnz86SmGdHX5xs6RgYe5jmJCSLiPmB7cjWmxY5ihkCG12Q==",
    product:
      "wSNX3mu+YGc/2I1DDd0NmrYHS6zS1BQt2geMUH7DDowER43JGeJRUErOHVwU2tz6xHDXia8BuvXQI3j37I0uYw==",
  },
  onReceipt: (receipt: Receipt) => {
    console.log("funfou")
    console.log(receipt)
  }
});

new Vue({ render: (h) => h(App) }).$mount("#app");
