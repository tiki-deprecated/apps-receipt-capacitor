<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import BottomSheet from "@/components/BottomSheet.vue";
import CloseIcon from "@/components/icons/outline/CloseIcon.vue";
import CircleButton from "@/components/buttons/CircleButton.vue";
import { ref } from "vue";
import BackButton from "@/components/buttons/BackButton.vue";
import HistoryDetails from "@/modules/history/HistoryDetails.vue";

defineEmits(["close", "back"]);
</script>

<template>
  <div class="heading">
    <back-button text="Rewards" @click="$emit('back')" />
    <circle-button @click="$emit('close')" :icon="CloseIcon" />
  </div>
  <history-details />
</template>

<style scoped>
.heading {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin: 0 0.5em 2em 0.5em;
}
</style>
