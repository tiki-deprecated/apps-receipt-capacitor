<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import {
  ButtonText,
  CardOffer,
  HeaderTitle,
  BulletList,
  BulletState,
  ButtonTextState,
} from "@/components";

defineEmits(["close", "learn", "accept"]);
const props = defineProps({
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  bullets: {
    type: Array<string>,
    required: true,
  },
});
const bullets = props.bullets.map((bullet) => {
  return { text: bullet, state: BulletState.P0 };
});
</script>

<template>
  <div>
    <header-title
      title="Rewards"
      subtitle="Share data. Earn rewards."
      @close="$emit('close')"
    />
    <card-offer :image="image" :description="description" />
    <bullet-list :bullets="bullets" class="how" @learn="$emit('learn')" />
    <div class="footer">
      <button-text
        text="Back off"
        :state="ButtonTextState.BORING"
        class="back-off"
        @click="$emit('close')"
      />
      <button-text text="I'm in" @click="$emit('accept')" />
    </div>
  </div>
</template>

<style scoped>
.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.back-off {
  margin-right: 1.5em;
}

.how {
  margin-top: 1.5em;
  margin-bottom: 2em;
  padding: 0 1em 0 1em;
}

.how :deep(.bullet .icon) {
  width: 0.9em;
  margin-right: 0.625em;
}

.how :deep(.bullet) {
  font-weight: bold;
}
</style>
