<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import { inject } from "vue";
import { Keys } from "@/utils";
import { type Navigate, NavDef } from "@/nav";
import { SheetHome } from "@/components";
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
