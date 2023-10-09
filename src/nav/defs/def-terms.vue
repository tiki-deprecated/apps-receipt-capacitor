<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import { inject } from "vue";
import { InjectKey } from "@/utils";
import { type Navigate, NavDef } from "@/nav";
import { SheetTerms } from "@/components";
import type { Config } from "@/config";
const navigate: Navigate = inject(InjectKey.navigate)!;
const config: Config = inject(InjectKey.config)!;
</script>

<template>
  <sheet-terms
    :markdown="config.terms"
    @back="navigate.pop()"
    @accept="navigate.to(NavDef.Home)"
    @close="navigate.clear()"
  />
</template>
