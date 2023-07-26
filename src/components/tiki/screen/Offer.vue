<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import BottomSheet from "@/components/tiki/element/BottomSheet.vue";
</script>

<template>
  <bottom-sheet height="50%" @dismiss="$emit('close')">hello</bottom-sheet>
</template>

<style scoped></style>
