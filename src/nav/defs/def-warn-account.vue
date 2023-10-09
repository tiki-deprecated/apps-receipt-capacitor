<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import SheetWarn from "@/components/sheet/sheet-warn.vue";
import { inject } from "vue";
import * as Keys from "@/utils/inject-key";
const navigate = inject(Keys.navigate)!;
</script>

<template>
  <sheet-warn
    :account="navigate.params.get('account')"
    @back="navigate.pop()"
    @close="navigate.clear()"
  />
</template>
