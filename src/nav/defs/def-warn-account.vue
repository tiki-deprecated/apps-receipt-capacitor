<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import { SheetWarn } from "@/components";
import { inject } from "vue";
import { InjectKey } from "@/utils";
const navigate = inject(InjectKey.navigate)!;
</script>

<template>
  <sheet-warn
    :account="navigate.params.get('account')"
    @back="navigate.pop()"
    @close="navigate.clear()"
  />
</template>
