<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import { inject } from "vue";
import * as Keys from "@/utils/inject-key";
import { type Navigate, NavDef } from "@/nav";
import SheetGmail from "@/components/sheet/sheet-gmail.vue";
import type { Account } from "@mytiki/capture-receipt-capacitor";
const navigate: Navigate = inject(Keys.navigate)!;
const warn = (account: Account) =>
  navigate.to(NavDef.WarnAccount, new Map([["account", account]]));
</script>

<template>
  <sheet-gmail
    @back="navigate.pop()"
    @close="navigate.clear()"
    @add="navigate.to(NavDef.AddGoogle)"
    @warn="warn"
    @skip="
      navigate.pop();
      navigate.to(NavDef.AddGoogle);
    "
  />
</template>
