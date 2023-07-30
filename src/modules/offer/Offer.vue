<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import BottomSheet from "@/components/BottomSheet.vue";
import ScreenTitle from "@/components/ScreenTitle.vue";
import QuestionIcon from "@/components/icons/outline/QuestionIcon.vue";
import TextButton from "@/components/buttons/TextButton.vue";
import DataUse from "@/modules/offer/DataUse.vue";
import type { Bullet } from "@/modules/offer/DataUse.vue";
import OfferCard from "@/modules/offer/OfferCard.vue";
import CircleButton from "@/components/buttons/CircleButton.vue";

defineProps({
  reward: String,
  description: String,
  bullets: {
    type: Array<Bullet>,
    required: true,
  },
});
</script>

<template>
  <bottom-sheet @dismiss="$emit('close')">
    <div class="body">
      <div class="heading">
        <screen-title
          title="Data Rewards"
          subtitle="Share data. Earn rewards."
        />
        <circle-button :icon="QuestionIcon" />
      </div>
      <offer-card :src="reward" :description="description" />
      <data-use :bullets="bullets" class="data-use" />
      <div class="footer">
        <text-button text="Back off" :focus="false" class="back-off" />
        <text-button text="I'm in" />
      </div>
    </div>
  </bottom-sheet>
</template>

<style scoped>
.body {
  padding: 1.5em 1em 2.5em 1em;
  box-sizing: border-box;
}

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
