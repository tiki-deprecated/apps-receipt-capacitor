<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import { IconCrossMarkOutline } from "@/assets";
import { ButtonBack, ButtonIcon } from "@/components";

defineEmits(["back", "close"]);
defineProps({
  text: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="heading">
    <button-back :text="text" @click="$emit('back')" />
    <button-icon :icon="IconCrossMarkOutline" @click="$emit('close')" />
  </div>
</template>

<style scoped>
.heading {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin: 0 0.5em 1em 0.5em;
}
</style>
