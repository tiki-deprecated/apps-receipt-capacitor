<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import Offer from "@/components/tiki/screen/Offer.vue";

defineProps({
  present: {
    type: Boolean,
    default: false,
  },
});
defineEmits(["update:present"]);
</script>

<template>
  <Transition appear name="fade">
    <offer v-if="present" @close="$emit('update:present', false)"> </offer>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
