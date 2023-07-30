<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import BottomSheet from "@/element/BottomSheet.vue";
import CloseIcon from "@/icon/CloseIcon.vue";
import CircleButton from "@/element/CircleButton.vue";
import { ref } from "vue";
import BackButton from "@/element/BackButton.vue";
import HistoryDetails from "@/element/HistoryDetails.vue";

const show = ref(true);
</script>

<template>
  <bottom-sheet @dismiss="$emit('close')" :show="show">
    <div class="body">
      <div class="heading">
        <back-button text="Rewards" />
        <circle-button @click="show = false" :icon="CloseIcon" />
      </div>
      <history-details />
    </div>
  </bottom-sheet>
</template>

<style scoped>
.body {
  padding: 1.5em 1em 2.5em 1em;
  box-sizing: border-box;
}

.heading {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin: 0 0.5em 2em 0.5em;
}
</style>
