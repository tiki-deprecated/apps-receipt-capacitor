<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import TextButton from "@/components/buttons/TextButton.vue";
import HeaderBack from "@/components/HeaderBack.vue";
import { TikiSdk } from "@mytiki/tiki-sdk-capacitor";
import { inject } from "vue";
import * as Service from "@/modules/terms/TermsService";

const tiki: TikiSdk | undefined = inject("TikiSdk");
const emit = defineEmits(["back", "accept"]);
defineProps({
  src: {
    type: Object,
    required: true,
  },
  ptr: {
    type: String,
    required: true,
  },
});

const accept = () => {
  Service.accept(tiki!, {}, {});
  emit("accept");
};
</script>

<template>
  <div class="full-screen">
    <header-back text="Back" @click="$emit('back')" />
    <component :is="src" class="terms" />
    <text-button text="I agree" class="agree" @click="accept" />
  </div>
</template>

<style scoped>
.full-screen {
  display: flex;
  flex-flow: column;
  height: 95vh;
}

.agree {
  flex: 0 0 auto;
  margin: 2em 0;
}

.terms {
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
