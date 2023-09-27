<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import { BulletState } from "@/components/bullet/bullet-state";
import ButtonIcon from "@/components/button/button-icon.vue";
import BulletPoint from "@/components/bullet/bullet-point.vue";
import IconQuestion from "@/assets/icons/question.svg?component";

defineEmits(["learn"]);
defineProps({
  title: {
    type: String,
    required: false,
    default: "How to earn $1/Month",
  },
  bullets: {
    type: Array<{
      text: String;
      state?: BulletState;
    }>,
    required: false,
    default: [],
  },
});
</script>

<template>
  <div>
    <div class="title">
      <div>How to earn $1/Month</div>
      <div>
        <button-icon :icon="IconQuestion" @click="$emit('learn')" />
      </div>
    </div>
    <div v-for="bullet in bullets" class="bullet">
      <bullet-point class="icon" :state="bullet.state" />
      {{ bullet.text }}
    </div>
  </div>
</template>

<style scoped>
.title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-transform: uppercase;
  font-family: var(--tiki-font-family);
  font-size: var(--tiki-font-size);
  line-height: var(--tiki-line-height);
  color: var(--tiki-primary-text-color);
  font-weight: bold;
}

.bullet {
  display: flex;
  align-items: center;
  font-size: var(--tiki-font-size);
  line-height: var(--tiki-line-height);
  margin: 0.75em 0;
  font-weight: 500;
  color: var(--tiki-secondary-text-color);
}

.bullet .icon {
  width: 1.21875em;
  margin-right: 1em;
}
</style>
