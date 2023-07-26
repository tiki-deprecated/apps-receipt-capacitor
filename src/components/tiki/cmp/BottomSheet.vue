<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import { ref } from "vue";

defineProps({
  color: String,
  height: String,
});
defineEmits(["dismiss"]);
const slideOut = ref(false);
</script>

<template>
  <div class="overlay" @click.stop.prevent="slideOut = true">
    <Transition
      appear
      name="slide"
      @leave="$emit('dismiss')"
      @close="slideOut = true"
    >
      <div
        v-if="!slideOut"
        class="bottom-sheet"
        :style="{ 'background-color': color, height: height }"
        @click.stop.prevent
      >
        <slot />
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.overlay {
  background-color: rgba(0, 0, 0, 70%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100vw;
  height: 100vh;
  z-index: 998;
  position: fixed;
}

@media (prefers-color-scheme: dark) {
  .overlay {
    //background-color: rgba(0, 0, 0, 70%);
  }
}

.bottom-sheet {
  background-color: var(--tiki-secondary-background-color);
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0%);
  width: 100vw;
  height: 85vh;
  z-index: 999;
  border-radius: 40px 40px 0 0;
}

.slide-enter-active {
  transition: all 0.5s ease-out;
}

.slide-leave-active {
  transition: all 0.3s ease-out;
}

.slide-enter-from,
.slide-leave-to {
  transform: translate(-50%, 100%);
}
</style>
