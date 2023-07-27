<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
defineProps({
  title: String,
  subtitle: String,
});
</script>

<template>
  <div class="screen-title">
    <p class="title">{{ title }}</p>
    <p class="subtitle">{{ subtitle }}</p>
  </div>
</template>

<style scoped>
.title {
  font-family: var(--tiki-font-family);
  color: var(--tiki-primary-text-color);
  font-weight: bold;
  font-size: calc(var(--tiki-font-size) * 1.75);
  line-height: calc(var(--tiki-font-size) * 2);
  text-transform: uppercase;
  margin: 0;
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
