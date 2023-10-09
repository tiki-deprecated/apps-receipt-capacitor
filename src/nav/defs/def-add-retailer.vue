<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import { inject } from "vue";
import { InjectKey } from "@/utils";
import { type Navigate } from "@/nav";
import { SheetAddRetailer } from "@/components";
const navigate: Navigate = inject(InjectKey.navigate)!;
</script>

<template>
  <sheet-add-retailer @back="navigate.pop()" @close="navigate.clear()" />
</template>
