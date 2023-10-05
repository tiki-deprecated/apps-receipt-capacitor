<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
defineProps({
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="card">
    <img :src="image" alt="" class="img" />
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
  height: 3.9375em;
  font-family: var(--tiki-font-family);
  font-size: var(--tiki-font-size);
  line-height: var(--tiki-line-height-sm);
  color: rgba(28, 0, 0, 0.6);
  font-weight: bold;
  text-align: left;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
}
</style>
