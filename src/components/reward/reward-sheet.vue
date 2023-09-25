<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import CrossMarkIconOutline from "@/assets/icons/cross-mark-outline.svg?component";
import IconButton from "@/components/buttons/icon-button.vue";
import type { Reward } from "@/service/config";
import RewardCarousel from "@/components/reward/reward-carousel.vue";
import RewardHistory from "@/components/reward/reward-history.vue";
import RewardCounter from "@/components/reward/reward-counter.vue";
import RewardAction from "@/components/reward/reward-action.vue";
import HeaderTitle from "@/components/header/header-title.vue";

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
    <icon-button @click="$emit('close')" :icon="CrossMarkIconOutline" />
  </header-title>
  <reward-counter class="reward-counter" />
  <reward-history class="reward-history" @click="$emit('history')" />
  <reward-carousel :rewards="rewards" />
  <reward-action @account="$emit('account')" @redeem="$emit('close')" />
</template>

<style scoped>
.reward-history {
  margin: 2em 0;
}
</style>
