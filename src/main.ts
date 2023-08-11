/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import type { App } from "vue";
import "@/assets/main.css";
import TikiReceipt from "@/tiki-receipt.vue";
import type { Config, Program, Theme, Reward } from "@/service/config";
import type { ReceiptService } from "@/service/receipt/receipt-service";
import type { HistoryService } from "@/service/history/history-service";
import type { SdkService } from "@/service/sdk-service";
import type { HistoryEvent } from "@/service/history/history-event";
import { ReceiptEvent } from "@/service/receipt/receipt-event";
import type { ReceiptAccount } from "@/service/receipt/receipt-account";
import { ReceiptAccountType } from "@/service/receipt/receipt-account";
import Vue3TouchEvents from "vue3-touch-events";
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
  HistoryService,
  HistoryEvent,
  SdkService,
  ReceiptService,
  ReceiptAccount,
};
