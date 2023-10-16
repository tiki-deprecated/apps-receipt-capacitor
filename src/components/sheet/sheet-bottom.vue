<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import { ref, watch } from "vue";
import { close } from "@/utils/swipe";


const props = defineProps({
  show: {
    type: Boolean,
    required: false,
    default: true,
  },
});
defineEmits(["dismiss"]);
const isShow = ref(props.show);
watch(
  () => props.show,
  (show) => (isShow.value = show),
);

const handleTouch = (element: any) =>{
  if(close(element)) isShow.value = false
}
</script>

<template>
  <div class="overlay" @click.stop.prevent="isShow = false" @touchend="handleTouch">
    <Transition appear name="slide" @leave="$emit('dismiss')">
      <div v-if="isShow" class="bottom-sheet" @click.stop>
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

.bottom-sheet {
  background-color: var(--tiki-secondary-background-color);
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0%);
  width: 100vw;
  height: fit-content;
  z-index: 999;
  border-radius: 40px 40px 0 0;
  box-sizing: border-box;
  max-height: 95vh;
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
