<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import VueMarkdown from "vue-markdown-render";
import TextButton from "@/components/buttons/text-button.vue";
import HeaderBack from "@/components/header/header-back.vue";
import { inject } from "vue";
import type { PropType } from "vue";
import type { Program } from "@/service/config";
import type { TikiService } from "@/service/tiki-service";

const tiki: TikiService | undefined = inject("Tiki");
const emit = defineEmits(["back", "accept"]);
const props = defineProps({
  program: {
    type: Object as PropType<Program>,
    required: true,
  },
});

const accept = () => {
  tiki!.sdk.createLicense();
  emit("accept");
};
</script>

<template>
  <div class="full-screen">
    <header-back text="Back" @click="$emit('back')" />
    <vue-markdown :source="program.terms" class="terms" />
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
.terms :deep(ul),
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

.terms :deep(img) {
  max-width: 100%;
}
</style>
