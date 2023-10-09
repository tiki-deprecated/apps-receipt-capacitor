<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import { inject } from "vue";
import { Keys } from "@/utils";
import { type Navigate } from "@/nav";
import { SheetAddGmail } from "@/components";
const navigate: Navigate = inject(Keys.navigate)!;
</script>

<template>
  <sheet-add-gmail @back="navigate.pop()" @close="navigate.clear()" />
</template>
