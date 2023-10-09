<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->
<script setup lang="ts">
import HeaderBack from "@/components/header/header-back.vue";
import ButtonText from "@/components/button/button-text.vue";
import { ButtonTextState } from "@/components/button/button-text-state";

defineEmits(["close", "back"]);
</script>

<template>
  <div>
    <header-back
      text="Heads up"
      @back="$emit('back')"
      @close="$emit('close')"
    />
    <div class="alert-text">
      <b>Please keep the app open in the background.</b>
      <p>
        Email syncing can take up to a minute. We will notify you when complete.
      </p>
    </div>
    <button-text
      text="Okay, got it!"
      :state="ButtonTextState.STANDARD"
      @click="$emit('back')"
    />
  </div>
</template>

<style>
.alert-text {
  text-align: center;
  font-family: var(--tiki-font-family);
  font-size: var(--tiki-font-size-lg);
  line-height: var(--tiki-line-height-lg);
  color: var(--tiki-secondary-text-color);
  margin-bottom: 2em;
}
</style>
