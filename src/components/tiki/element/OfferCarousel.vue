<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide } from "vue3-carousel";
import OfferCard from "@/components/tiki/element/OfferCard.vue";

defineProps({
  offers: Array<{
    src: String;
    description: String;
  }>,
});
</script>

<template>
  <carousel :items-to-show="1.05" :wrap-around="true" snapAlign="start">
    <slide v-for="offer in offers" :key="offer">
      <offer-card
        :src="offer.src"
        :description="offer.description"
        class="card"
      />
    </slide>
  </carousel>
</template>

<style scoped>
.card {
  margin-right: 1em;
}
</style>
