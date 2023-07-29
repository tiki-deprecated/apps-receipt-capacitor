<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import Offer from "@/components/tiki/screen/Offer.vue";
import Terms from "@/components/tiki/screen/Terms.vue";
import LearnMore from "@/components/tiki/screen/LearnMore.vue";
import Reward from "@/components/tiki/screen/Reward.vue";
import History from "@/components/tiki/screen/History.vue";
import Account from "@/components/tiki/screen/Account.vue";

defineProps({
  present: {
    type: Boolean,
    default: false,
  },
});
defineEmits(["update:present"]);
</script>

<template>
  <Transition appear name="fade">
    <!--    <offer-->
    <!--      v-if="present"-->
    <!--      @close="$emit('update:present', false)"-->
    <!--      reward="./src/assets/offer-card.png"-->
    <!--      description="Share your receipts to earn rewards like gift cards or cash!"-->
    <!--      :bullets="[-->
    <!--        { text: 'De-identified (for your privacy)', isUsed: true },-->
    <!--        { text: 'Develop market insights', isUsed: false },-->
    <!--        { text: 'Deliver a more personalized experience ', isUsed: true },-->
    <!--      ]"-->
    <!--    >-->
    <!--    </offer>-->
    <!--    <terms v-if="present" @close="$emit('update:present', false)" />-->
    <!--    <learn-more v-if="present" @close="$emit('update:present', false)" />-->
    <!--    <reward v-if="present" @close="$emit('update:present', false)" />-->
    <!--    <history v-if="present" @close="$emit('update:present', false)" />-->
    <account v-if="present" @close="$emit('update:present', false)" />
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
