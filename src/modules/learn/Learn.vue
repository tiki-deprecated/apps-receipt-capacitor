<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import BackButton from "@/components/buttons/BackButton.vue";

defineEmits(["back"]);
defineProps({
  src: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="full-screen">
    <back-button text="Back" class="back" @click="$emit('back')" />
    <component :is="src" class="learn-more" />
  </div>
</template>

<style scoped>
.full-screen {
  display: flex;
  flex-flow: column;
  height: 95vh;
}

.back {
  flex: 0 0 auto;
  margin-bottom: 0.625em;
}

.learn-more {
  overflow-y: scroll;
  overflow-x: clip;
  flex: 1 1 auto;
  border-bottom: 1px solid var(--tiki-accent-color);
}

.terms :deep(h1),
.terms :deep(h2),
.terms :deep(h3),
.terms :deep(h4),
.terms :deep(h5),
.terms :deep(h6),
.terms :deep(p),
.terms :deep(a),
.terms :deep(table) {
  font-family: var(--tiki-font-family);
  line-height: var(--tiki-line-height);
  font-size: var(--tiki-font-size);
  color: var(--tiki-primary-text-color);
}

.terms :deep(h1) {
  font-size: var(--tiki-font-size-xl);
  line-height: var(--tiki-line-height-xl);
  font-weight: bold;
}

.terms :deep(h2) {
  font-size: var(--tiki-font-size-lg);
  line-height: var(--tiki-line-height-lg);
  font-weight: bold;
}

.terms :deep(h3) {
  font-size: var(--tiki-font-size);
  line-height: var(--tiki-line-height);
  font-weight: bold;
}

.terms :deep(h4) {
  font-size: var(--tiki-font-size-sm);
  line-height: var(--tiki-line-height-sm);
  font-weight: bold;
}

.terms :deep(h5),
.terms :deep(h6) {
  font-size: var(--tiki-font-size-xs);
  line-height: var(--tiki-line-height-xs);
  font-weight: bold;
}

.terms :deep(a) {
  color: var(--tiki-accent-color);
}
</style>
