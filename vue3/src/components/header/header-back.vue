<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import IconCrossMark from "@/assets/icons/crossmark-outline.svg?component";
import ButtonBack from "@/components/button/button-back.vue";
import ButtonIcon from "@/components/button/button-icon.vue";

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
    <button-icon :icon="IconCrossMark" @click="$emit('close')" />
  </div>
</template>

<style scoped>
.heading {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin: 0 0.5em 2em 0.5em;
}
</style>
