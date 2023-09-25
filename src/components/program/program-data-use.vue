<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import progressIcon from "@/assets/icons/progress-box.svg?component";
import QuestionIcon from "@/assets/icons/question.svg?component";
import CircleButton from "@/components/buttons/circle-button.vue";

defineProps({
  bullets: Array<{
    text: string;
  }>,
});
</script>

<template>
  <div>
    <p class="title">How to earn $1/Month <span> 
      <circle-button :icon="QuestionIcon" @click="$emit('learn')" />
    </span></p>
    <div v-for="bullet in bullets" class="bullet">
      <progress-icon class="icon"/>
      {{ bullet.text }}
    </div>
  </div>
</template>

<style scoped>
.title {
  font-family: var(--tiki-font-family);
  font-size: var(--tiki-font-size);
  line-height: var(--tiki-line-height);
  font-weight: bold;
  text-transform: uppercase;
  color: var(--tiki-primary-text-color);
  display: flex;
  justify-content: space-between;
}

.bullet {
  margin: 16px 0;
  display: flex;
  align-items: center;
  font-family: var(--tiki-font-family);
  font-size: var(--tiki-font-size);
  font-weight: bold;
  line-height: var(--tiki-line-height);
  color: var(--tiki-secondary-text-color);
}

.icon {
  margin-right: 0.625em;
}
</style>
