<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
defineProps({
  amount: {
    type: Number,
    required: true,
  },
});
</script>

<template>
  <p class="reward-counter">
    {{ amount.toLocaleString("en", { useGrouping: true }) }} pts
  </p>
</template>

<style scoped>
.reward-counter {
  font-family: var(--tiki-font-family);
  font-size: calc(var(--tiki-font-size) * 3.625);
  font-weight: bold;
  color: var(--tiki-accent-color);
  line-height: calc(var(--tiki-line-height) * 3.625);
  text-align: center;
  margin: 0;
  padding: 0;
}
</style>
