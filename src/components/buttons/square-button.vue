<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
defineProps({
  icon: {
    type: Object,
    required: true,
  },
  text: String,
});

defineEmits(["click"]);
</script>

<template>
  <button class="square-button" @click="$emit('click')">
    <component :is="icon" class="icon" />
    {{ text }}
  </button>
</template>

<style scoped>
.square-button {
  border: none;
  background: transparent;
  font-family: var(--tiki-font-family);
  line-height: var(--tiki-line-height-xs);
  font-size: var(--tiki-font-size-xs);
  font-weight: 500;
  color: var(--tiki-secondary-text-color);
}

.icon {
  padding: 1.333em;
  border-radius: 0.833em;
  height: 4.167em;
  background-color: var(--tiki-primary-background-color);
  display: block;
  margin-bottom: 0.667em;
  color: var(--tiki-primary-text-color);
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 5%);
}
</style>
