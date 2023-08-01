<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide } from "vue3-carousel";
import Card from "@/components/card.vue";
import type { Reward } from "@/modules/reward/reward";

defineProps({
  rewards: Array<Reward>,
});
</script>

<template>
  <div>
    <p class="rewards-title">Offers</p>
    <carousel :items-to-show="1.05" :wrap-around="true" snapAlign="start">
      <slide v-for="reward in rewards" :key="reward">
        <card
          :image="reward.image"
          :description="reward.description"
          class="card"
        />
      </slide>
    </carousel>
  </div>
</template>

<style scoped>
.card {
  margin-right: 1em;
}

.rewards-title {
  font-family: var(--tiki-font-family);
  font-size: var(--tiki-font-size);
  line-height: var(--tiki-line-height);
  color: var(--tiki-primary-text-color);
  text-transform: uppercase;
  font-weight: bold;
}
</style>
