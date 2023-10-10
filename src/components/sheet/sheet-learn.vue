<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import { HeaderBack } from "@/components";
import Showdown from "showdown";

defineEmits(["back", "close"]);
const props = defineProps({
  markdown: {
    type: String,
    required: true,
  },
});

const learn = new Showdown.Converter().makeHtml(props.markdown);
</script>

<template>
  <div class="full-screen">
    <header-back
      text="Learn More"
      @back="$emit('back')"
      @close="$emit('close')"
    />
    <div class="learn-more" v-html="learn" />
  </div>
</template>

<style scoped>
.full-screen {
  display: flex;
  flex-flow: column;
  height: 95vh;
}

.learn-more {
  overflow-y: scroll;
  overflow-x: scroll;
  flex: 1 1 auto;
  border-bottom: 1px solid var(--tiki-success-color);
}

.learn-more :deep(h1),
.learn-more :deep(h2),
.learn-more :deep(h3),
.learn-more :deep(h4),
.learn-more :deep(h5),
.learn-more :deep(h6),
.learn-more :deep(p),
.learn-more :deep(a),
.learn-more :deep(ul),
.learn-more :deep(ol),
.learn-more :deep(table) {
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

.learn-more :deep(h5),
.learn-more :deep(h6) {
  font-size: var(--tiki-font-size-xs);
  line-height: var(--tiki-line-height-xs);
  font-weight: bold;
}

.learn-more :deep(a) {
  color: var(--tiki-success-color);
}

.learn-more :deep(img) {
  max-width: 100%;
}

.learn-more :deep(.icon-x-scroll-wrapper) {
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
}

.learn-more :deep(.icon-x-scroll) {
  display: inline-block;
}
</style>
