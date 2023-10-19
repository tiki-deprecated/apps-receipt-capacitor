<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import { type Navigate, NavDef } from "@/nav";
import NavDefs from "./nav-defs.vue";
import { SheetBottom } from "@/components";
import { inject, watch } from "vue";
import type { LicenseRecord } from "@mytiki/tiki-sdk-capacitor";
import { InjectKey } from "@/utils";
import type { Publish } from "@/service";
import type { Config } from "@/config";

const navigate: Navigate = inject(InjectKey.navigate)!;
const publish: Publish = inject(InjectKey.publish)!;
const config: Config = inject(InjectKey.config)!;
defineEmits(["update:show"]);
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  }
});

config.theme.apply(document);

watch(
  () => props.show,
  async (show) => {
    if (show) {
      const license: LicenseRecord | undefined = await publish.getLicense();
      if (!license) navigate.to(NavDef.CloOffer);
      else navigate.to(NavDef.Home);
    } else navigate.clear();
  },
);
</script>

<template>
  <sheet-bottom
    v-if="show"
    :show="navigate.ref.value !== NavDef.None"
    @dismiss="$emit('update:show', false)"
  >
    <nav-defs />
  </sheet-bottom>
</template>

<style scoped></style>
