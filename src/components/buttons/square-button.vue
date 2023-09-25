<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import BulletPoint from "@/components/bullet/bullet-point.vue"
import { BulletState } from "@/components/bullet/bullet-state";

defineProps({
  icon: {
    type: Object,
    required: true,
  },
  text: String,
});

defineEmits(["click"]);
</script>

<template>
  <div class="square-button icon" @click="$emit('click')"> 
    <span>
      {{ text }}
    </span>
    <bullet-point :state="BulletState.NULL"/>
  </div>
</template>

<style scoped>

span {
  font-size: 16px;
  font-weight: bold;
  line-height: var(--tiki-line-height-xs);
  margin-bottom: 1em;
  color: var(--tiki-secondary-text-color);
}
.square-button {
  border: none;
  background: transparent;
  font-family: var(--tiki-font-family);
  line-height: var(--tiki-line-height-xs);
  font-size: var(--tiki-font-size-xs);
  font-weight: 500;
  color: var(--tiki-secondary-text-color);
}

.icon {
  padding: 1.75em;
  border-radius: 0.833em;
  height: 5em;
  background-color: var(--tiki-primary-background-color);
  display: flex;
  margin-bottom: 0.667em;
  color: var(--tiki-primary-text-color);
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 5%);
  flex-flow: column;
  align-items: center;
  width: 4em;
}

.noAccount {
  background-color: rgba(220,220,220, 0.3);
  border: none
}
</style>
