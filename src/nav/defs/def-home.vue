<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import { inject } from "vue";
import { InjectKey } from "@/utils";
import { NavDef, type Navigate } from "@/nav";
import { CloSheetHome } from "@/components";
import { AccountType } from "@mytiki/capture-receipt-capacitor";
const navigate: Navigate = inject(InjectKey.navigate)!;

const emits = defineEmits(['company'])

const companyNavigation = (company: AccountType) =>{
  emits('company', company)
  navigate.to(NavDef.CloCompany)
}
</script>

<template>
  <clo-sheet-home 
  @details="navigate.to(NavDef.CloDetails)"
  @close="navigate.clear()"
  @company="companyNavigation"
  />
</template>
