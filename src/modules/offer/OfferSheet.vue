<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import { Offer } from "./Offer";
import type { PropType } from "vue";
import SheetTitle from "@/components/SheetTitle.vue";
import QuestionIcon from "@/components/icons/outline/QuestionIcon.vue";
import TextButton from "@/components/buttons/TextButton.vue";
import OfferCard from "@/modules/offer/components/OfferCard.vue";
import CircleButton from "@/components/buttons/CircleButton.vue";
import OfferDataUse from "@/modules/offer/components/OfferDataUse.vue";

defineEmits(["close", "learn", "accept"]);
defineProps({
  offer: {
    type: Object as PropType<Offer>,
    required: true,
  },
});
</script>

<template>
  <div class="heading">
    <sheet-title title="Data Rewards" subtitle="Share data. Earn rewards." />
    <circle-button :icon="QuestionIcon" @click="$emit('learn')" />
  </div>
  <offer-card :src="offer.reward" :description="offer.description" />
  <offer-data-use :bullets="offer.bullets" class="data-use" />
  <div class="footer">
    <text-button
      text="Back off"
      :focus="false"
      class="back-off"
      @click="$emit('close')"
    />
    <text-button text="I'm in" @click="$emit('accept')" />
  </div>
</template>

<style scoped>
.heading {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin: 0 0.5em 2em 0.5em;
}

.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.back-off {
  margin-right: 1.5em;
}

.data-use {
  margin-top: 1.5em;
  margin-bottom: 2em;
}
</style>
