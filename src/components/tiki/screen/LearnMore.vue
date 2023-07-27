<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import LearnMore from "@/assets/learn-more.md";
import BackButton from "@/components/tiki/element/BackButton.vue";
import BottomSheet from "@/components/tiki/element/BottomSheet.vue";
import TextButton from "@/components/tiki/element/TextButton.vue";
</script>

<template>
  <bottom-sheet @dismiss="$emit('close')">
    <div class="body">
      <back-button text="Back" class="back" />
      <learn-more class="learn-more" />
    </div>
  </bottom-sheet>
</template>

<style scoped>
.body {
  padding: 1.5em 1em 2.5em 1em;
  display: flex;
  flex-flow: column;
  height: 100vh;
  box-sizing: border-box;
}

.back {
  flex: 0 0 auto;
  margin-bottom: 0.625em;
}

.learn-more {
  overflow: scroll;
  flex: 1 1 auto;
  border-bottom: 1px solid var(--tiki-accent-color);
}

.learn-more :deep {
  font-family: var(--tiki-font-family);
  line-height: var(--tiki-line-height);
  font-size: var(--tiki-font-size);
  color: var(--tiki-primary-text-color);
}

.learn-more :deep(h1) {
  font-size: var(--tiki-font-size-xl);
  line-height: var(--tiki-line-height-xl);
  font-weight: bold;
}

.learn-more :deep(h2) {
  font-size: var(--tiki-font-size-lg);
  line-height: var(--tiki-line-height-lg);
  font-weight: bold;
}

.learn-more :deep(h3) {
  font-size: var(--tiki-font-size);
  line-height: var(--tiki-line-height);
  font-weight: bold;
}

.learn-more :deep(h4) {
  font-size: var(--tiki-font-size-sm);
  line-height: var(--tiki-line-height-sm);
  font-weight: bold;
}

.learn-more :deep(h5) {
  font-size: var(--tiki-font-size-xs);
  line-height: var(--tiki-line-height-xs);
  font-weight: bold;
}

.learn-more :deep(h6) {
  font-size: var(--tiki-font-size-xs);
  line-height: var(--tiki-line-height-xs);
  font-weight: bold;
}

.learn-more :deep(a) {
  color: var(--tiki-accent-color);
}
</style>
