<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import { inject } from "vue";
import * as Keys from "@/utils/inject-key";
import { type Navigate } from "@/nav";
import SheetLearn from "@/components/sheet/sheet-learn.vue";
import type { TikiService } from "@/service";
const navigate: Navigate = inject(Keys.navigate)!;
const tiki: TikiService = inject(Keys.tiki)!;
</script>

<template>
  <sheet-learn
    :markdown="tiki.config.learn"
    @back="navigate.pop()"
    @close="navigate.clear()"
  />
</template>
