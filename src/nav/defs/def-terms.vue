<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import { inject } from "vue";
import * as Keys from "@/utils/inject-key";
import { type Navigate, NavDef } from "@/nav";
import SheetTerms from "@/components/sheet/sheet-terms.vue";
import type { TikiService } from "@/service";
const navigate: Navigate = inject(Keys.navigate)!;
const tiki: TikiService = inject(Keys.tiki)!;
</script>

<template>
  <sheet-terms
    :markdown="tiki.config.terms"
    @back="navigate.pop()"
    @accept="navigate.to(NavDef.Home)"
    @close="navigate.clear()"
  />
</template>
