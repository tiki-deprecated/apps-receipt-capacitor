<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import { inject } from "vue";
import * as Keys from "@/utils/inject-key";
import SheetOffer from "@/components/sheet/sheet-offer.vue";
import { type Navigate, NavDef } from "@/nav";
import type { TikiService } from "@/service";
const navigate: Navigate = inject(Keys.navigate)!;
const tiki: TikiService = inject(Keys.tiki)!;
</script>

<template>
  <sheet-offer
    :description="tiki.config.offer.description"
    :image="tiki.config.offer.image"
    :bullets="tiki.config.offer.bullets"
    @learn="navigate.to(NavDef.Learn)"
    @accept="navigate.to(NavDef.Terms)"
    @close="navigate.clear()"
  />
</template>
