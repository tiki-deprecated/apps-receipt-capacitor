/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import "./assets/main.css";

import { createApp } from "vue";
import App from "@/app.vue";
import {
  CommonTags,
  CommonUsecases,
  Tag,
  tiki,
  Usecase,
} from "@mytiki/tiki-sdk-capacitor";
import ProgramCard from "@/assets/program-card.png";
import LearnMore from "@/assets/learn-more.md?raw";
import Terms from "@/assets/terms.md?raw";

createApp(App)
  .provide("TikiSdk", tiki)
  .provide("TikiReceiptConfig", {
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
  })
  .mount("#app");
