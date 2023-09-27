<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import type { PropType } from "vue";

const emit = defineEmits(["click"]);
const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  state: {
    type: String as PropType<"STANDARD" | "BORING" | "ALERT">,
    required: false,
    default: "STANDARD",
  },
});
</script>

<template>
  <button
    class="textButton"
    :class="{
      standard: state === 'STANDARD',
      boring: state === 'BORING',
      alert: state === 'ALERT',
    }"
    @click.stop.prevent="$emit('click')"
  >
    {{ text }}
  </button>
</template>

<style scoped>
.textButton {
  width: 100%;
  height: 2.7em;
  border-radius: 0.625em;
  border: solid 1px;
  cursor: pointer;
  font-weight: 500;
  font-size: var(--tiki-font-size-xl);
  line-height: var(--tiki-line-height-xl);
  font-family: var(--tiki-font-family);
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 5%);
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-tap-highlight-color: transparent;
}

.standard {
  border-color: var(--tiki-success-color);
  background-color: var(--tiki-success-color);
  color: var(--tiki-primary-background-color);
}

.boring {
  border-color: var(--tiki-primary-background-color);
  background-color: var(--tiki-primary-background-color);
  color: var(--tiki-primary-text-color);
}

.alert {
  border-color: var(--tiki-error-color);
  background-color: var(--tiki-error-color);
  color: var(--tiki-primary-text-color);
}
</style>
