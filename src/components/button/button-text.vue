<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import type { PropType } from "vue";
import { ButtonTextState } from "@/components/button/button-text-state";

const emit = defineEmits(["click"]);
const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  state: {
    type: String as PropType<ButtonTextState>,
    required: false,
    default: "STANDARD",
  },
  isLoading: {
    type: Boolean,
    required: false,
    default: false
  }
});
const click = () => {
  if (props.state != ButtonTextState.DISABLED) emit("click");
};
</script>

<template>
  <button
    class="textButton"
    :class="{
      standard: state === ButtonTextState.STANDARD,
      boring: state === ButtonTextState.BORING,
      alert: state === ButtonTextState.ALERT,
      disable: state === ButtonTextState.DISABLED
    }"
    @click.stop.prevent="click"
  >
  <div id="loading" v-if="isLoading"/>
  <span v-else>
    {{ text }}
  </span>
  </button>
</template>

<style scoped>

#loading {
  display: inline-block;
  width: 1.2em;
  height: 1.2em;
  border: 3px solid rgba(255,255,255,.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { -webkit-transform: rotate(360deg); }
}
@-webkit-keyframes spin {
  to { -webkit-transform: rotate(360deg); }
} 
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

.disable {
  opacity: 50%;
  border-color: var(--tiki-success-color);
  background-color: var(--tiki-success-color);
  color: var(--tiki-primary-background-color);
}
</style>
