<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import { inject } from "vue";
import * as Keys from "@/utils/inject-key";
import { type Navigate } from "@/nav";
import SheetAddRetailer from "@/components/sheet/sheet-add-retailer.vue";
const navigate: Navigate = inject(Keys.navigate)!;
</script>

<template>
  <sheet-add-retailer @back="navigate.pop()" @close="navigate.clear()" />
</template>
