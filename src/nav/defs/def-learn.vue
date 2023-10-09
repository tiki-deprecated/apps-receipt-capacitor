<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import { inject } from "vue";
import { Keys } from "@/utils";
import { type Navigate } from "@/nav";
import { SheetLearn } from "@/components";
import type { Config } from "@/config";
const navigate: Navigate = inject(Keys.navigate)!;
const config: Config = inject(Keys.config)!;
</script>

<template>
  <sheet-learn
    :markdown="config.learn"
    @back="navigate.pop()"
    @close="navigate.clear()"
  />
</template>
