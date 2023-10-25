<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import {
  AddGoogle,
  AddRetailer,
  Home,
  Learn,
  ListGoogle,
  ListRetailer,
  Offer,
  Terms,
  WarnAccount,
  NavDef,
  CloSheetOffer,
  CloSheetDetails,
  CloSheetCompany
} from "./defs";
import { inject, ref } from "vue";
import type { Ref } from "vue";
import { InjectKey } from "@/utils";
import { AccountType } from "@mytiki/capture-receipt-capacitor";
const state: Ref<NavDef> = inject(InjectKey.navigate)!.ref;

const company = ref<AccountType>();
const companyNavigation = (event: AccountType) => {
  company.value = event
};
</script>

<template>
  <div class="body">
    <add-google v-if="state === NavDef.AddGoogle" />
    <add-retailer v-if="state === NavDef.AddRetailer" />
    <home v-if="state === NavDef.Home" @company="companyNavigation"/>
    <learn v-if="state === NavDef.Learn" />
    <list-google v-if="state === NavDef.ListGoogle" />
    <list-retailer v-if="state === NavDef.ListRetailer" />
    <offer v-if="state === NavDef.Offer" />
    <terms v-if="state === NavDef.Terms" />
    <warn-account v-if="state === NavDef.WarnAccount" />
    <clo-sheet-offer v-if="state === NavDef.CloOffer"/>
    <clo-sheet-details v-if="state === NavDef.CloDetails"/>
    <clo-sheet-company v-if="state === NavDef.CloCompany" :company="company" />
  </div>
</template>

<style>
.body {
  padding: 1.25em 1em 2.5em 1em;
  box-sizing: border-box;
}
</style>
