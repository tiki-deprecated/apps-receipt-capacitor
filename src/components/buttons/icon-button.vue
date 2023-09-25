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
});
defineEmits(["click"]);
</script>

<template>
  <button class="container" @click="$emit('click')">
    <component :is="icon" class="icon" />
  </button>
</template>

<style scoped>
.container {
  height: 2em;
  width: 2em;
  position: relative;
  font-size: var(--tiki-font-size);
  border: none;
  background: transparent;
}

.icon {
  height: 2em;
  width: auto;
  color: var(--tiki-secondary-text-color);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.icon :deep(.background) {
  fill: var(--tiki-primary-background-color);
}
</style>
