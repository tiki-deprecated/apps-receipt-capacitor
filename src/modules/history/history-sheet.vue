<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import HistoryDetails from "@/modules/history/history-details.vue";
import HeaderBack from "@/components/header-back.vue";
import CrossMarkIconOutline from "@/components/icons/cross-mark-icon-outline.vue";
import CircleButton from "@/components/buttons/circle-button.vue";

defineEmits(["close", "back"]);
</script>

<template>
  <header-back text="Rewards" @back="$emit('back')">
    <circle-button @click="$emit('close')" :icon="CrossMarkIconOutline" />
  </header-back>
  <history-details />
</template>
