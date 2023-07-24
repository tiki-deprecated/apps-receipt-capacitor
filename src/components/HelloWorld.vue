<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
defineProps<{
  msg: string;
  body: string;
}>();
</script>

<template>
  <div class="greetings">
    <h1>{{ msg }}</h1>
    <h3>{{ body }}</h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: var(--tiki-font-size-xl);
  line-height: var(--tiki-line-height-xl);
  position: relative;
  top: -10px;
  color: var(--tiki-accent-color);
}

h3 {
  font-size: var(--tiki-font-size-lg);
  line-height: var(--tiki-line-height-lg);
  font-weight: normal;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}
</style>
