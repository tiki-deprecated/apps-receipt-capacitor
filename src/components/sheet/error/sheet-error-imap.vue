<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import HeaderBack from "@/components/header/header-back.vue";
import { ButtonText, ButtonTextState } from "@/components";

defineEmits(["close", "back"]);
</script>

<template>
  <div>
    <header-back
      text="Gmail Error"
      @back="$emit('back')"
      @close="$emit('close')"
    />
    <div class="error-text">
      <p class="alert-text-bold">Enable IMAP to proceed.</p>
      <ol>
        <li class="instruction">Open Gmail in a desktop browser.</li>
        <li class="instruction">Open Settings</li>
        <li class="instruction">Select Forwarding and POP/IMAP</li>
        <li class="instruction">Select <b>Enable Imap</b> under Imap Access</li>
        <li class="instruction">Save changes</li>
      </ol>
    </div>
    <button-text text="Okay, done!" @click="$emit('back')" />
  </div>
</template>

<style>
.error-text {
  font-family: var(--tiki-font-family);
  font-size: var(--tiki-font-size-lg);
  line-height: var(--tiki-line-height-lg);
  color: var(--tiki-secondary-text-color);
  margin-bottom: 2em;
}

.alert-text-bold {
  font-weight: bold;
  text-align: center;
  color: var(--tiki-error-color);
}

.instruction {
  margin: 0.5em 0;
}
</style>
