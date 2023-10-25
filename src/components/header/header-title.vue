<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import { IconCrossMarkOutline } from "@/assets";
import { ButtonIcon } from "@/components";

defineEmits(["close"]);
defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: false,
    default: "",
  },
});
</script>

<template>
  <div class="heading">
    <div class="screen-title">
      <p class="title">{{ title }}</p>
      <p class="subtitle">{{ subtitle }}</p>
    </div>
    <button-icon :icon="IconCrossMarkOutline" @click="$emit('close')" />
  </div>
</template>

<style scoped>
.heading {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin: 0.5em 0.5em 2em 0.5em;
}

.title {
  font-family: var(--tiki-font-family);
  color: var(--tiki-primary-text-color);
  font-weight: 600;
  font-size: calc(var(--tiki-font-size) * 1.50);
  text-transform: uppercase;
  margin: 0.15em 0 0 0;
}

.subtitle {
  margin: 0.5em 0 0 0;
  font-family: var(--tiki-font-family);
  color: var(--tiki-secondary-text-color);
  font-weight: 500;
  font-size: var(--tiki-font-size);
  line-height: var(--tiki-line-height);
}
</style>
