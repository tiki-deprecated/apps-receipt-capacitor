<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import type { Bullet } from "@/modules/offer/Bullet";
import CrossMarkIcon from "@/components/icons/CrossMarkIcon.vue";
import CheckIcon from "@/components/icons/CheckIcon.vue";

defineProps({
  bullets: Array<Bullet>,
});
</script>

<template>
  <div>
    <p class="title">How your data will be used</p>
    <div v-for="bullet in bullets" class="bullet">
      <check-icon class="icon" v-if="bullet.isUsed" style="color: #00b272" />
      <cross-mark-icon
        class="icon"
        v-if="!bullet.isUsed"
        style="color: #c73000"
      />
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
}

.bullet {
  margin: 16px 0;
  display: flex;
  align-items: center;
  font-family: var(--tiki-font-family);
  font-weight: bold;
  font-size: var(--tiki-font-size);
  line-height: var(--tiki-line-height);
  color: var(--tiki-secondary-text-color);
}

.icon {
  margin-right: 0.625em;
  height: 0.75em;
}
</style>
