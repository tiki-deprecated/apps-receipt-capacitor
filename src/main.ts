/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import type { App } from "vue";
import "@/assets/main.css";
import TikiReceipt from "@/tiki-receipt.vue";
import type { Config } from "@/service/config";
import type { Program } from "@/service/program";
import type { Theme } from "@/service/theme";
import type { Reward } from "@/service/reward";
import type { LicenseService } from "@/service/license-service";
import type { RewardService } from "@/service/reward-service";
import type { HistoryService } from "@/service/history-service";
import type { AccountService } from "@/service/account-service";
import type { HistoryEvent } from "@/service/history-event";
import { HistoryEventType } from "@/service/history-event-type";
import type { Account } from "@/service/account";
import Vue3TouchEvents from "vue3-touch-events";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import {
  Usecase,
  Tag,
  CommonUsecases,
  CommonTags,
} from "@mytiki/tiki-sdk-capacitor";
import type {
  TikiSdk,
  LicenseRecord,
  ReceiptRecord,
  TitleRecord,
  PayableRecord,
} from "@mytiki/tiki-sdk-capacitor";
import type {
  AdditionalLine,
  Coupon,
  StringType,
  FloatType,
  Product,
  Promotion,
  PaymentMethod,
  Survey,
  SurveyAnswer,
  SurveyQuestion,
  Shipment,
  Receipt,
  Retailer,
  ReceiptCapture,
} from "@mytiki/tiki-capture-receipt-capacitor";
import { AccountProvider } from "@mytiki/tiki-capture-receipt-capacitor";
import { TikiService } from "@/service/tiki-service";

export default {
  install: (app: App, config: Config) => {
    app.component("TikiReceipt", TikiReceipt);
    app.component("v-select", vSelect);
    app.provide("Tiki", new TikiService(config));
    app.use(Vue3TouchEvents);
  },
};

export {
  TikiReceipt,
  Usecase,
  Tag,
  CommonUsecases,
  CommonTags,
  AccountProvider,
  HistoryEventType,
};
export type {
  TikiService,
  Config,
  Theme,
  Program,
  TikiSdk,
  LicenseRecord,
  ReceiptRecord,
  TitleRecord,
  PayableRecord,
  AdditionalLine,
  Coupon,
  StringType,
  FloatType,
  Product,
  Promotion,
  PaymentMethod,
  Survey,
  SurveyAnswer,
  SurveyQuestion,
  Shipment,
  Receipt,
  Retailer,
  ReceiptCapture,
  Reward,
  AccountService,
  HistoryService,
  LicenseService,
  RewardService,
  HistoryEvent,
  Account,
};
