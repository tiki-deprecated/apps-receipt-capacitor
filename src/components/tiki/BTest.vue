<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
defineEmits(["close"]);
</script>

<template>
  <button @click="this.$parent.$emit('close')">close</button>
</template>

<style scoped></style>
