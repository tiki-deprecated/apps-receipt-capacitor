<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import { inject } from "vue";
import { InjectKey } from "@/utils";
import { type Navigate } from "@/nav";
import { SheetLearn } from "@/components";
import type { Config } from "@/config";
const navigate: Navigate = inject(InjectKey.navigate)!;
const config: Config = inject(InjectKey.config)!;
</script>

<template>
  <sheet-learn
    :markdown="config.learn"
    @back="navigate.pop()"
    @close="navigate.clear()"
  />
</template>
