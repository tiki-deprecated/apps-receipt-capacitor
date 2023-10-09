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
} from "./defs";
import { inject, type Ref } from "vue";
import * as Keys from "@/utils/inject-key";
const state: Ref<NavDef> = inject(Keys.navigate)!.ref;
</script>

<template>
  <div class="body">
    <add-google v-if="state === NavDef.AddGoogle" />
    <add-retailer v-if="state === NavDef.AddRetailer" />
    <home v-if="state === NavDef.Home" />
    <learn v-if="state === NavDef.Learn" />
    <list-google v-if="state === NavDef.ListGoogle" />
    <list-retailer v-if="state === NavDef.ListRetailer" />
    <offer v-if="state === NavDef.Offer" />
    <terms v-if="state === NavDef.Terms" />
    <warn-account v-if="state === NavDef.WarnAccount" />
  </div>
</template>

<style>
.body {
  padding: 1.25em 1em 2.5em 1em;
  box-sizing: border-box;
}
</style>
