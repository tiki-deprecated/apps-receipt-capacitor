<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import ArrowIcon from "@/icon/ArrowIcon.vue";

defineProps({
  text: String,
});
defineEmits(["click"]);
</script>

<template>
  <button class="back" @click="$emit('click')">
    <arrow-icon class="icon" />
    {{ text }}
  </button>
</template>

<style scoped>
.back {
  display: flex;
  align-items: center;
  color: var(--tiki-primary-text-color);
  font-weight: bold;
  text-transform: uppercase;
  font-size: var(--tiki-font-size-xl);
  line-height: var(--tiki-line-height-xl);
  font-family: var(--tiki-font-family);
  background-color: transparent;
  border: none;
}

.icon {
  color: var(--tiki-primary-text-color);
  height: var(--tiki-font-size);
  margin-right: 0.4em;
}
</style>
