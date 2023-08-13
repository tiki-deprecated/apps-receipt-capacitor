/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import "./assets/main.css";

import { createApp } from "vue";
import App from "@/app.vue";

import Program from "@/assets/program.png";
import LinkReward from "@/assets/link-reward.png";
import ScanReward from "@/assets/scan-reward.png";
import MoreReward from "@/assets/more-reward.png";
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
      image: Program,
      description:
        "You can now trade YOUR data for cash! Just scan a receipt or link an account.",
      terms: Terms,
      learn: LearnMore,
      bullets: [
        { text: "Creepy targeted ads", isUsed: false },
        { text: "Spot purchasing trends", isUsed: true },
        { text: "Create aggregate insights", isUsed: true },
      ],
      usecases: [
        Usecase.common(CommonUsecases.DISTRIBUTION),
        Usecase.common(CommonUsecases.ANALYTICS),
        Usecase.common(CommonUsecases.AI_TRAINING),
        Usecase.common(CommonUsecases.ATTRIBUTION),
      ],
      tags: [
        Tag.common(CommonTags.USER_ID),
        Tag.common(CommonTags.PURCHASE_HISTORY),
      ],
    },
    theme: {
      accentColor: "#783F10",
    },
    rewards: [
      {
        image: ScanReward,
        description:
          "Earn 10 points for every receipt you scan or in your linked accounts.",
        issuer: (
          event: ReceiptEvent,
          details: { receipt?: Receipt; account?: ReceiptAccount },
        ): number | undefined => {
          if (event == ReceiptEvent.SCAN) return 10;
        },
      },
      {
        image: LinkReward,
        description:
          "Earn 100 points for every account you link. We only check it for receipts.",
        issuer: (
          event: ReceiptEvent,
          details: { receipt?: Receipt; account?: ReceiptAccount },
        ): number | undefined => {
          if (event == ReceiptEvent.LINK) return 100;
        },
      },
      {
        image: MoreReward,
        description:
          "Check back for special offers and more ways to earn cash for your data.",
        issuer: (
          event: ReceiptEvent,
          details: { receipt?: Receipt; account?: ReceiptAccount },
        ): number | undefined => {
          return undefined;
        },
      },
    ],
    redeem: (total: number): number | undefined =>
      total > 0 ? total : undefined,
  })
  .mount("#app");
