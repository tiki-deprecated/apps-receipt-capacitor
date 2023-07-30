<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import CrossMarkIconOutline from "@/components/icons/CrossMarkIconOutline.vue";
import ConfettiExplosion from "vue-confetti-explosion";
import CircleButton from "@/components/buttons/CircleButton.vue";
import type { Reward } from "@/modules/reward/Reward";
import RewardCarousel from "@/modules/reward/RewardCarousel.vue";
import RewardHistory from "@/modules/reward/RewardHistory.vue";
import RewardCounter from "@/modules/reward/RewardCounter.vue";
import RewardAction from "@/modules/reward/RewardAction.vue";
import HeaderTitle from "@/components/HeaderTitle.vue";
import { HistoryEventType, icon } from "@/modules/history/HistoryEventType";

defineEmits(["close", "history", "account"]);
defineProps({
  rewards: {
    type: Array<Reward>,
    required: true,
  },
});
</script>

<template>
  <header-title title="Data Rewards" subtitle="Share data. Earn rewards.">
    <circle-button @click="$emit('close')" :icon="CrossMarkIconOutline" />
  </header-title>
  <ConfettiExplosion class="confetti" />
  <reward-counter :amount="2750" class="reward-counter" />
  <reward-history
    class="reward-history"
    :amount="25"
    :date="new Date()"
    :icon="icon(HistoryEventType.SCAN)"
    @click="$emit('history')"
  />
  <reward-carousel :rewards="rewards" />
  <reward-action @account="$emit('account')" />
</template>

<style scoped>
.confetti {
  margin: auto;
}

.reward-history {
  margin: 2em 0;
}
</style>
