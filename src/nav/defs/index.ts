/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import AddGoogle from "@/nav/defs/def-add-google.vue";
import AddRetailer from "@/nav/defs/def-add-retailer.vue";
import Home from "@/nav/defs/def-home.vue";
import Learn from "@/nav/defs/def-learn.vue";
import ListGoogle from "@/nav/defs/def-list-google.vue";
import ListRetailer from "@/nav/defs/def-list-retailer.vue";
import Offer from "@/nav/defs/def-offer.vue";
import Terms from "@/nav/defs/def-terms.vue";
import WarnAccount from "@/nav/defs/def-warn-account.vue";
import CloSheetOffer from "@/nav/defs/CLO/def-clo-offer.vue";
import CloSheetDetails from "@/nav/defs/CLO/def-clo-details.vue";
import CloSheetCompany from "@/nav/defs/CLO/def-clo-company.vue"

export {
  AddGoogle,
  AddRetailer,
  Home,
  Learn,
  ListRetailer,
  ListGoogle,
  Offer,
  Terms,
  WarnAccount,
  CloSheetOffer,
  CloSheetDetails,
  CloSheetCompany
};

export enum NavDef {
  None = -1,
  Offer,
  Terms,
  Learn,
  Home,
  ListRetailer,
  ListGoogle,
  AddRetailer,
  AddGoogle,
  WarnAccount,
  CloOffer,
  CloDetails,
  CloCompany
}
