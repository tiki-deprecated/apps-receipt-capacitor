<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import CrossMarkIconOutline from "@/assets/icons/cross-mark-outline.svg?component";
import type { Reward } from "@/service/config";
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
  <header-title title="Rewards" subtitle="Share data. Earn rewards.">
    <circle-button @click="$emit('close')" :icon="CrossMarkIconOutline" />
  </header-title>
  <reward-action @accountGmail="$emit('accountGmail')"  @accountRetailer="$emit('accountRetailer')" @learn="$emit('learn')"/>
</template>

<style scoped>
.reward-history {
  margin: 2em 0;
}
</style>
