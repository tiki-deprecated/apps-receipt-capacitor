/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import "./assets/main.css";

import { createApp } from "vue";
import App from "@/app.vue";

import ProgramCard from "@/assets/program-card.png";
import LearnMore from "@/assets/learn-more.md?raw";
import Terms from "@/assets/terms.md?raw";

import Tiki, {
  CommonTags,
  CommonUsecases,
  Tag,
  Usecase,
  ReceiptEvent,
} from "@mytiki/tiki-receipt-capacitor";
import type { Receipt, ReceiptAccount } from "@mytiki/tiki-receipt-capacitor";

createApp(App)
  .use(Tiki, {
    key: {
      publishingId: "be19730a-00d5-45f5-b18e-2e19eb25f311",
      scanKey:
        "sRwAAAAoY29tLm15dGlraS5zZGsuY2FwdHVyZS5yZWNlaXB0LmNhcGFjaXRvcgY6SQlVDCCrMOCc/j3oG8q4R37b51+hnxE+gy+INAyCYTh8o8wWbXhW0ljpl1WVyCHnJmip2gdcZKWJRSh4U5cSQLUTQg8ZpEngcde9h/8etQFq7M69BYu64NY7NL82VAFuVn+ie2ViSlnw+rPBAMqb5aq/v58fV3JOmWj+b6Y//9xHiAhd",
      intelKey:
        "wSNX3mu+YGc/2I1DDd0NmrYHS6zS1BQt2geMUH7DDowER43JGeJRUErOHVwU2tz6xHDXia8BuvXQI3j37I0uYw==",
    },
    program: {
      image: ProgramCard,
      description:
        "Share your receipts to earn rewards like gift cards or cash!",
      terms: Terms,
      learn: LearnMore,
      bullets: [
        { text: "De-identified (for your privacy)", isUsed: true },
        { text: "Develop market insights", isUsed: false },
        { text: "Deliver a more personalized experience ", isUsed: true },
      ],
      usecases: [Usecase.common(CommonUsecases.DISTRIBUTION)],
      tags: [Tag.common(CommonTags.PURCHASE_HISTORY)],
    },
    theme: {
      accentColor: "#783F10",
    },
    rewards: [
      {
        image: ProgramCard,
        description:
          "Share your receipts to earn rewards like gift cards or cash!",
        issuer: (
          event: ReceiptEvent,
          details: { receipt?: Receipt; account?: ReceiptAccount },
        ) => {
          if (event == ReceiptEvent.SCAN) return 50;
        },
      },
    ],
  })
  .mount("#app");
