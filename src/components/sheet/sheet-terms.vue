<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import { ButtonText, HeaderBack, ButtonTextState } from "@/components";
import { inject, ref } from "vue";
import type { Publish } from "@/service";
import Showdown from "showdown";
import { Keys } from "@/utils";

const publish: Publish = inject(Keys.publish)!;
const emit = defineEmits(["back", "accept", "close"]);
const props = defineProps({
  markdown: {
    type: String,
    required: true,
  },
});

const terms = new Showdown.Converter().makeHtml(props.markdown);
const isLoading = ref<boolean>(false);
const accept = async () => {
  isLoading.value = true;
  await publish.createLicense();
  isLoading.value = false;
  emit("accept");
};
</script>

<template>
  <div class="full-screen">
    <header-back
      text="Terms and Conditions"
      @back="$emit('back')"
      @close="$emit('close')"
    />
    <div class="terms" v-html="terms" />
    <button-text
      text="I agree"
      class="agree"
      :state="
        isLoading ? ButtonTextState.STANDARD_LOADING : ButtonTextState.STANDARD
      "
      @click="accept"
    />
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
  border-bottom: 1px solid var(--tiki-success-color);
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
  color: var(--tiki-success-color);
}

.terms :deep(img) {
  max-width: 100%;
}
</style>
