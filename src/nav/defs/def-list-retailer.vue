<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import { inject } from "vue";
import { InjectKey } from "@/utils";
import { SheetRetailer } from "@/components";
import { type Navigate, NavDef } from "@/nav";
import type { Account } from "@mytiki/capture-receipt-capacitor";
const navigate: Navigate = inject(InjectKey.navigate)!;
const warn = (account: Account) =>
  navigate.to(NavDef.WarnAccount, new Map([["account", account]]));
</script>

<template>
  <sheet-retailer
    @back="navigate.pop()"
    @close="navigate.clear()"
    @add="navigate.to(NavDef.AddRetailer)"
    @warn="warn"
    @skip="
      navigate.pop();
      navigate.to(NavDef.AddRetailer);
    "
  />
</template>
