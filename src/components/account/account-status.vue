<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import IconMinus from "@/assets/icons/minus.svg?component";
import type { PropType } from "vue";
import { watch, ref } from "vue";
import type { Account } from "@mytiki/capture-receipt-capacitor";

defineEmits(["delete"]);
const props = defineProps({
  account: {
    type: Object as PropType<Account>,
    required: true,
  },
});
const isError = ref(!props.account?.isVerified ?? true);
watch(
  () => props.account?.isVerified ?? false,
  (res) => (isError.value = !res),
);
</script>

<template>
  <div class="container">
    <div class="account">
      <div class="img">
        <div v-if="isError" class="overlay" />
        <img :alt="account.type.name" :src="account.type.icon" />
      </div>
      <div class="text" :class="{ error: isError }">
        <div class="type">
          {{ account.type.name }}
        </div>
        <div class="username">
          {{ account.username }}
        </div>
      </div>
    </div>
    <button class="delete" @click="$emit('delete')">
      <icon-minus class="ico" />
    </button>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: var(--tiki-font-family);
  font-size: var(--tiki-font-size);
  line-height: var(--tiki-line-height);
  color: var(--tiki-secondary-text-color);
}

.account {
  display: flex;
  align-items: center;
}

.account .img {
  height: 3.5em;
  width: 3.5em;
  margin-right: 1.5em;
  position: relative;
}

.account .img .overlay {
  background: var(--tiki-error-color);
  opacity: 25%;
  position: absolute;
  height: 3.5em;
  width: 3.5em;
  top: 0;
  left: 0;
  border-radius: 0.625em;
  z-index: 2;
}

.account .img img {
  position: absolute;
  height: 3.5em;
  width: 3.5em;
  top: 0;
  left: 0;
  border-radius: 0.625em;
  z-index: 1;
}

.account .text .type {
  font-size: var(--tiki-font-size-xl);
  line-height: var(--tiki-line-height);
  font-weight: bold;
}

.account .text .username {
  font-size: var(--tiki-font-size-lg);
  line-height: var(--tiki-line-height);
  font-weight: 500;
}

.error {
  color: var(--tiki-error-color);
}

.delete {
  background: transparent;
  border: none;
  width: 100%;
  text-align: right;
  height: 3.5em;
}

.delete .ico {
  width: 2em;
  height: 2em;
  color: var(--tiki-primary-background-color);
}

.delete .ico :deep(.background) {
  fill: var(--tiki-error-color);
}
</style>
