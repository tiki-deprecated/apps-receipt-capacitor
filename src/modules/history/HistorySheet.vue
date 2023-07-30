<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import HistoryDetails from "@/modules/history/HistoryDetails.vue";
import HeaderBack from "@/components/HeaderBack.vue";
import CrossMarkIconOutline from "@/components/icons/CrossMarkIconOutline.vue";
import CircleButton from "@/components/buttons/CircleButton.vue";

defineEmits(["close", "back"]);
</script>

<template>
  <header-back text="Rewards" @back="$emit('back')">
    <circle-button @click="$emit('close')" :icon="CrossMarkIconOutline" />
  </header-back>
  <history-details />
</template>
