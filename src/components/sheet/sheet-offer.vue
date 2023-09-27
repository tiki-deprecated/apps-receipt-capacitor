<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import ButtonText from "@/components/button/button-text.vue";
import ButtonIcon from "@/components/button/button-icon.vue";
import IconCrossMark from "@/assets/icons/crossmark-outline.svg?component";
import Card from "@/components/card.vue";
import HeaderTitle from "@/components/header/header-title.vue";
import BulletList from "@/components/bullet/bullet-list.vue";
import { BulletState } from "@/components/bullet/bullet-state";

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
    type: Array<String>,
    required: true,
  },
});
const bulletList = props.bullets.map((bullet) => {
  return { text: bullet, state: BulletState.P0 };
});
</script>

<template>
  <header-title title="Rewards" subtitle="Share data. Earn rewards.">
    <button-icon :icon="IconCrossMark" @click="$emit('close')" />
  </header-title>
  <card :image="image" :description="description" />
  <bullet-list :bullets="bulletList" class="how" @learn="$emit('learn')" />
  <div class="footer">
    <button-text
      text="Back off"
      state="BORING"
      class="back-off"
      @click="$emit('close')"
    />
    <button-text text="I'm in" @click="$emit('accept')" />
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
  width: fit-content;
}

.how :deep(.bullet .icon) {
  width: 0.9em;
  margin-right: 0.625em;
}

.how :deep(.bullet) {
  font-weight: bold;
}
</style>
