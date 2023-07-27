<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import BottomSheet from "@/components/tiki/element/BottomSheet.vue";
import ScreenTitle from "@/components/tiki/element/ScreenTitle.vue";
import QuestionButton from "@/components/tiki/element/QuestionButton.vue";
import TextButton from "@/components/tiki/element/TextButton.vue";
import DataUse, { Bullet } from "@/components/tiki/element/DataUse.vue";
import OfferCard from "@/components/tiki/element/OfferCard.vue";

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
        <question-button />
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
