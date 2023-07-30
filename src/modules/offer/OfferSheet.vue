<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import { Offer } from "./Offer";
import type { PropType } from "vue";
import QuestionIcon from "@/components/icons/QuestionIcon.vue";
import TextButton from "@/components/buttons/TextButton.vue";
import CircleButton from "@/components/buttons/CircleButton.vue";
import OfferDataUse from "@/modules/offer/OfferDataUse.vue";
import Card from "@/components/Card.vue";
import HeaderTitle from "@/components/HeaderTitle.vue";

defineEmits(["close", "learn", "accept"]);
defineProps({
  offer: {
    type: Object as PropType<Offer>,
    required: true,
  },
});
</script>

<template>
  <header-title title="Data Rewards" subtitle="Share data. Earn rewards.">
    <circle-button :icon="QuestionIcon" @click="$emit('learn')" />
  </header-title>
  <card :image="offer.image" :description="offer.description" />
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
