<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import { inject } from "vue";
import { Keys } from "@/utils";
import { SheetOffer } from "@/components";
import { type Navigate, NavDef } from "@/nav";
import type { Config } from "@/config";
const navigate: Navigate = inject(Keys.navigate)!;
const config: Config = inject(Keys.config)!;
</script>

<template>
  <sheet-offer
    :description="config.offer.description"
    :image="config.offer.image"
    :bullets="config.offer.bullets"
    @learn="navigate.to(NavDef.Learn)"
    @accept="navigate.to(NavDef.Terms)"
    @close="navigate.clear()"
  />
</template>
