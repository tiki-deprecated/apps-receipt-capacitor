<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
defineProps({
  src: String,
  description: String,
});
</script>

<template>
  <div class="card">
    <img :src="src" alt="" class="img" />
    <p class="description">{{ description }}</p>
  </div>
</template>

<style scoped>
.card {
  width: 100%;
  padding: 1.25em;
  background-color: var(--tiki-primary-background-color);
  box-sizing: border-box;
  border-radius: 0.625em;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 5%);
}

.img {
  width: 100%;
  height: auto;
}

.description {
  margin: 0.3125em 0 0 0;
  font-family: var(--tiki-font-family);
  font-size: var(--tiki-font-size);
  line-height: var(--tiki-line-height);
  color: var(--tiki-secondary-text-color);
  font-weight: bold;
}
</style>
