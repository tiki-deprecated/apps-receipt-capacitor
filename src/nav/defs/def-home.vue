<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import { inject } from "vue";
import * as Keys from "@/utils/inject-key";
import { type Navigate, NavDef } from "@/nav";
import SheetHome from "@/components/sheet/sheet-home.vue";
const navigate: Navigate = inject(Keys.navigate)!;
</script>

<template>
  <sheet-home
    @close="navigate.clear()"
    @learn="navigate.to(NavDef.Learn)"
    @withdraw="navigate.clear()"
    @gmail="navigate.to(NavDef.ListGoogle)"
    @retailer="navigate.to(NavDef.ListRetailer)"
  />
</template>
