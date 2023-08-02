/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import type { App } from "vue";
import "@/assets/main.css";
import TikiReceipt from "@/tiki-receipt.vue";
import type { Config } from "@/utils/config/config";
import type { Program } from "@/modules/program/program";
import type { Theme } from "@/utils/config/theme";
import * as TikiSdkLicensing from "@mytiki/tiki-sdk-capacitor";
import * as TikiReceiptCapture from "@mytiki/tiki-capture-receipt-capacitor";
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

interface Tiki {
  config: Config;
  licensing: TikiSdk;
  capture: ReceiptCapture;
  initialize?: () => Promise<void>;
}

export default {
  install: (app: App, config: Config) => {
    app.component("TikiReceipt", TikiReceipt);
    app.provide("Tiki", {
      config: config,
      licensing: TikiSdkLicensing.instance,
      capture: TikiReceiptCapture.instance,
      initialize: async (): Promise<void> => {
        console.log("INIT ME");
      },
    } as Tiki);
  },
};

export {
  TikiReceipt,
  Usecase,
  Tag,
  CommonUsecases,
  CommonTags,
  AccountProvider,
};
export type {
  Tiki,
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
};
