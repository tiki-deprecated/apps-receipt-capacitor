/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import type { App } from "vue";
import "@/assets/main.css";
import TikiReceipt from "@/tiki-receipt.vue";
import type { Program, Theme, Reward, Config } from "@/service/config";
import type { ReceiptService } from "@/service/receipt/receipt-service";
import type { HistoryService } from "@/service/history/history-service";
import type { SdkService } from "@/service/sdk-service";
import type { HistoryEvent } from "@/service/history/history-event";
import { ReceiptEvent } from "@/service/receipt/receipt-event";
import type { ReceiptAccount } from "@/service/receipt/receipt-account";
import { ReceiptAccountType } from "@/service/receipt/receipt-account-type";
import { TikiService } from "@/service/tiki-service";

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
  ReceiptEvent,
  ReceiptAccountType,
};
export type {
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
  HistoryService,
  HistoryEvent,
  SdkService,
  ReceiptService,
  ReceiptAccount,
  TikiService,
};
