<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import ButtonBack from "@/components/button/button-back.vue";

defineEmits(["back"]);
defineProps({
  text: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="heading">
    <button-back :text="text" @click="$emit('back')" />
    <slot />
  </div>
</template>

<style scoped>
.heading {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin: 0 0.5em 2em 0.5em;
}
</style>
