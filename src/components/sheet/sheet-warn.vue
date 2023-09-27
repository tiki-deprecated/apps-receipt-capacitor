<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->
<script setup lang="ts">
import HeaderBack from "@/components/header/header-back.vue";
import ButtonText from "@/components/button/button-text.vue";
import { ButtonTextState } from "@/components/button/button-text-state";

defineEmits(["remove", "close", "back"]);
</script>

<template>
  <header-back
    text="Remove Account"
    @back="$emit('back')"
    @close="$emit('close')"
  />
  <div class="alert-text">
    <p class="alert-text-bold">
      Warning! Removing this account may disqualify you from payout.
    </p>
    <p>To swap accounts, first connect the other one. Then remove this one.</p>
    <p>Are you sure you want to proceed?</p>
  </div>
  <button-text
    text="Remove Account"
    @click="$emit('remove')"
    class="warning-button"
    :state="ButtonTextState.ALERT"
  />
</template>

<style>
.alert-text {
  text-align: center;
  font-family: var(--tiki-font-family);
  font-size: var(--tiki-font-size);
  line-height: var(--tiki-line-height);
  color: var(--tiki-secondary-text-color);
  margin: 0 0 1.5em 0;
}

.alert-text-bold {
  font-weight: bold;
}
</style>
