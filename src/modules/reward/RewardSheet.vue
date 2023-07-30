<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import CloseIcon from "@/components/icons/outline/CloseIcon.vue";
import ConfettiExplosion from "vue-confetti-explosion";
import CircleButton from "@/components/buttons/CircleButton.vue";
import ReceiptIcon from "@/components/icons/solid/ReceiptIcon.vue";
import type { Reward } from "@/modules/reward/Reward";
import RewardCarousel from "@/modules/reward/RewardCarousel.vue";
import RewardHistory from "@/modules/reward/RewardHistory.vue";
import RewardCounter from "@/modules/reward/RewardCounter.vue";
import RewardAction from "@/modules/reward/RewardAction.vue";
import HeaderTitle from "@/components/HeaderTitle.vue";

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
    <circle-button @click="$emit('close')" :icon="CloseIcon" />
  </header-title>
  <ConfettiExplosion class="confetti" />
  <reward-counter :amount="2750" class="reward-counter" />
  <reward-history
    class="reward-history"
    :amount="25"
    :date="new Date()"
    :icon="ReceiptIcon"
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
