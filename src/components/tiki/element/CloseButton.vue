<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup>
defineEmits(["click"]);
</script>

<template>
  <button class="ring" @click="$emit('click')">
    <svg viewBox="0 0 14 14" class="icon" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0.477783 13.5222C0.700928 13.7455 0.993164 13.8571 1.28564 13.8571C1.57812 13.8571 1.87061 13.7455 2.09375 13.5222L6.99992 8.61598L11.9062 13.5223C12.1294 13.7457 12.4219 13.8573 12.7144 13.8573C13.0068 13.8573 13.2991 13.7457 13.5222 13.5223C13.9688 13.076 13.9688 12.3529 13.5222 11.9063L8.61589 7.00002L13.5222 2.09369C13.9687 1.6474 13.9685 0.924011 13.5222 0.477722C13.0759 0.0311889 12.3528 0.0311889 11.9062 0.477722L6.99992 5.38405L2.09375 0.477875C1.64746 0.0313416 0.924072 0.0315857 0.477783 0.477875C0.03125 0.924164 0.03125 1.64731 0.477783 2.09384L5.38396 7.00002L0.477783 11.9062C0.03125 12.3525 0.03125 13.0759 0.477783 13.5222Z"
      />
    </svg>
  </button>
</template>

<style scoped>
.icon {
  height: 14px;
  width: auto;
  fill: var(--tiki-secondary-text-color);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.ring {
  border: 2px solid var(--tiki-secondary-text-color);
  background-color: var(--tiki-primary-background-color);
  border-radius: 999px;
  height: 32px;
  width: 32px;
  position: relative;
}
</style>
