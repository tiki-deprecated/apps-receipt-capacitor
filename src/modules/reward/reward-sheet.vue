<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import CrossMarkIconOutline from "@/components/icons/cross-mark-icon-outline.vue";
import CircleButton from "@/components/buttons/circle-button.vue";
import type { Reward } from "@/modules/reward/reward";
import RewardCarousel from "@/modules/reward/reward-carousel.vue";
import RewardHistory from "@/modules/reward/reward-history.vue";
import RewardCounter from "@/modules/reward/reward-counter.vue";
import RewardAction from "@/modules/reward/reward-action.vue";
import HeaderTitle from "@/components/header-title.vue";
import { HistoryEventType, icon } from "@/modules/history/history-event-type";

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
  <reward-counter class="reward-counter" />
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
.reward-history {
  margin: 2em 0;
}
</style>
