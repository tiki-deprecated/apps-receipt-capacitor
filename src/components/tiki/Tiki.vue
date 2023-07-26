<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import BottomSheet from "@/components/tiki/cmp/BottomSheet.vue";
import BTest from "@/components/tiki/BTest.vue";

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
    <bottom-sheet
      height="50%"
      v-if="present"
      @dismiss="$emit('update:present', false)"
    >
      <b-test />
    </bottom-sheet>
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
