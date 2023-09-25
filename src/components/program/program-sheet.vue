<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import TextButton from "@/components/buttons/text-button.vue";
import IconButton from "@/components/buttons/icon-button.vue";
import CrossMark from "@/assets/icons/cross-mark-outline.svg?component"
import ProgramDataUse from "@/components/program/program-data-use.vue";
import Card from "@/components/card.vue";
import HeaderTitle from "@/components/header/header-title.vue";
import type { PropType } from "vue";
import type { Program } from "@/service/config";

defineEmits(["close", "learn", "accept"]);
const props = defineProps({
  program: {
    type: Object as PropType<Program>,
    required: true,
  },
});
</script>

<template>
  <header-title title="Data Rewards" subtitle="Share data. Earn rewards.">
    <icon-button :icon="CrossMark" @click="$emit('learn')" />
  </header-title>
  <card :image="program.image" :description="program.description" />
  <program-data-use :bullets="program.bullets" class="data-use" @learn="$emit('learn')"/>
  <div class="footer">
    <text-button
      text="Back off"
      :focus="false"
      class="back-off"
      @click="$emit('close')"
    />
    <text-button text="I'm in" @click="$emit('accept')" />
  </div>
</template>

<style scoped>
.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.back-off {
  margin-right: 1.5em;
}

.data-use {
  margin-top: 1.5em;
  margin-bottom: 2em;
  padding: 0 1em 0 1em;
}
</style>
