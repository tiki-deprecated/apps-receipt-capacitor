<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import { inject } from "vue";
import { InjectKey } from "@/utils";
import { NavDef, type Navigate } from "@/nav";
import { CloSheetHome } from "@/components";
const navigate: Navigate = inject(InjectKey.navigate)!;
</script>

<template>
  <clo-sheet-home @company="navigate.to(NavDef.CloDetails)"/>
</template>
