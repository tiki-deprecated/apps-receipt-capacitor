<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import type { PropType } from "vue";
import { type BulletState, BulletPoint } from "@/components";

defineProps({
  state: {
    type: String as PropType<
      BulletState.NULL | BulletState.ERROR | BulletState.P100 | BulletState.SYNC
    >,
    required: false,
    default: "NULL",
  },
  text: {
    type: String,
    required: true,
  },
});

defineEmits(["click"]);
</script>

<template>
  <div class="square-button" @click="$emit('click')">
    <span class="text">
      {{ text }}
    </span>
    <bullet-point :state="state" class="state" />
  </div>
</template>

<style scoped>
.square-button {
  background: var(--tiki-primary-background-color);
  font-family: var(--tiki-font-family);
  line-height: var(--tiki-line-height);
  font-size: var(--tiki-font-size);
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 5%);
  height: 5.3125em;
  width: 5.3125em;
  border-radius: 0.833em;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
}

.text {
  font-weight: bold;
  margin-bottom: 0.5em;
  color: var(--tiki-secondary-text-color);
}

.state {
  height: 1.875em;
  width: 1.875em;
}
</style>
