<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
defineProps({
  text: {
    type: String,
    required: true,
  },
  focus: {
    type: Boolean,
    required: false,
    default: true,
  },
});
</script>

<template>
  <button class="textButton" :class="focus ? 'focus' : 'nofocus'">
    {{ text }}
  </button>
</template>

<style scoped>
.textButton {
  width: 100%;
  height: 2.7em;
  border-radius: 0.625em;
  border: solid 1px;
  cursor: pointer;
  font-weight: 500;
  font-size: var(--tiki-font-size-xl);
  line-height: var(--tiki-line-height-xl);
  font-family: var(--tiki-font-family);
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 5%);
}

.textButton.focus {
  border-color: var(--tiki-accent-color);
  background-color: var(--tiki-accent-color);
  color: var(--tiki-primary-background-color);
}

.textButton.nofocus {
  border-color: var(--tiki-primary-background-color);
  background-color: var(--tiki-primary-background-color);
  color: var(--tiki-primary-text-color);
}
</style>
