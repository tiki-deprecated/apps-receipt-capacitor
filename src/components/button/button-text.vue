<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import type { PropType } from "vue";
import { ButtonTextState } from "@/components";

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
});
const click = () => {
  if (
    props.state != ButtonTextState.STANDARD_DISABLED &&
    props.state != ButtonTextState.BORING_DISABLED &&
    props.state != ButtonTextState.ALERT_DISABLED &&
    props.state != ButtonTextState.STANDARD_LOADING &&
    props.state != ButtonTextState.BORING_LOADING &&
    props.state != ButtonTextState.ALERT_LOADING
  )
    emit("click");
};
</script>

<template>
  <div>
    <button
      class="textButton"
      :class="{
        standard:
          state === ButtonTextState.STANDARD ||
          state === ButtonTextState.STANDARD_LOADING ||
          state === ButtonTextState.STANDARD_DISABLED,
        boring:
          state === ButtonTextState.BORING ||
          state === ButtonTextState.BORING_LOADING ||
          state === ButtonTextState.BORING_DISABLED,
        alert:
          state === ButtonTextState.ALERT ||
          state === ButtonTextState.ALERT_LOADING ||
          state === ButtonTextState.ALERT_DISABLED,
        disable:
          state === ButtonTextState.STANDARD_DISABLED ||
          state === ButtonTextState.BORING_DISABLED ||
          state === ButtonTextState.ALERT_DISABLED ||
          state === ButtonTextState.STANDARD_LOADING ||
          state === ButtonTextState.ALERT_LOADING ||
          state === ButtonTextState.BORING_LOADING,
      }"
      @click.stop.prevent="click"
    >
      <span
        v-if="
          state === ButtonTextState.STANDARD_LOADING ||
          state === ButtonTextState.BORING_LOADING ||
          state === ButtonTextState.ALERT_LOADING
        "
        id="loading"
      />
      <span v-else>{{ text }}</span>
    </button>
  </div>
</template>

<style scoped>
#loading {
  display: inline-block;
  width: 1.2em;
  height: 1.2em;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to {
    -webkit-transform: rotate(360deg);
  }
}
@-webkit-keyframes spin {
  to {
    -webkit-transform: rotate(360deg);
  }
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
  color: var(--tiki-primary-background-color);
}

.disable {
  opacity: 50%;
}
</style>
