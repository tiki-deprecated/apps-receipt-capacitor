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
  <button class="ring" @click="$emit('click')">
    <component :is="icon" class="icon" />
  </button>
</template>

<style scoped>
.ring {
  border: 2px solid var(--tiki-secondary-text-color);
  background-color: var(--tiki-primary-background-color);
  border-radius: 999px;
  height: 2em;
  width: 2em;
  position: relative;
  font-size: var(--tiki-font-size);
}

.icon {
  height: 1em;
  width: auto;
  color: var(--tiki-secondary-text-color);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
