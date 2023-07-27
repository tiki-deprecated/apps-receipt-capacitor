<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
defineProps({
  text: String,
});
defineEmits(["click"]);
</script>

<template>
  <button class="back" @click="$emit('click')">
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" class="icon">
      <path
        d="M8.08683 15.6087L9.4312 14.2644L4.12304 8.93381H15.6955V7.06629H4.12304L9.4312 1.73573L8.08683 0.391357L0.478027 8.00016L8.08683 15.6087Z"
      />
    </svg>
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
  fill: var(--tiki-primary-text-color);
  height: var(--tiki-font-size);
  margin-right: 0.4em;
}
</style>
