<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import { ref } from "vue";
import BottomSheet from "@/components/BottomSheet.vue";
import ScreenTitle from "@/components/ScreenTitle.vue";
import CloseIcon from "@/components/icons/outline/CloseIcon.vue";
import Counter from "@/modules/reward/Counter.vue";
import ConfettiExplosion from "vue-confetti-explosion";
import CircleButton from "@/components/buttons/CircleButton.vue";
import SquareButton from "@/components/buttons/SquareButton.vue";
import AccountIcon from "@/components/icons/AccountIcon.vue";
import RedeemIcon from "@/components/icons/outline/RedeemIcon.vue";
import TextButton from "@/components/buttons/TextButton.vue";
import ScanIcon from "@/components/icons/outline/ScanIcon.vue";
import HistorySummary from "@/modules/history/HistorySummary.vue";
import ReceiptIcon from "@/components/icons/solid/ReceiptIcon.vue";
import OfferCarousel from "@/modules/offer/OfferCarousel.vue";

const show = ref(true);
</script>

<template>
  <bottom-sheet @dismiss="$emit('close')" :show="show">
    <div class="body">
      <div class="heading">
        <screen-title
          title="Data Rewards"
          subtitle="Share data. Earn rewards."
        />
        <circle-button @click="show = false" :icon="CloseIcon" />
      </div>
      <ConfettiExplosion class="confetti" />
      <counter :amount="2750" class="counter" />
      <history-summary
        class="history-summary"
        :amount="25"
        :date="new Date()"
        :icon="ReceiptIcon"
      />
      <div>
        <p class="offers">Offers</p>
        <offer-carousel
          :offers="[
            {
              src: './src/assets/offer-card.png',
              description:
                'Share your receipts to earn rewards like gift cards or cash!',
            },
            {
              src: './src/assets/offer-card.png',
              description:
                'Share your receipts to earn rewards like gift cards or cash!',
            },
            {
              src: './src/assets/offer-card.png',
              description:
                'Share your receipts to earn rewards like gift cards or cash!',
            },
          ]"
        />
      </div>
      <div class="button-row">
        <square-button
          :icon="AccountIcon"
          text="Link Accounts"
          class="account-icon"
        />
        <square-button :icon="RedeemIcon" text="Redeem Points" />
      </div>
      <text-button text="Scan Receipt" :icon="ScanIcon" />
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

.button-row {
  display: flex;
  align-items: start;
  margin: 2em auto;
  width: fit-content;
}

.account-icon {
  margin-right: 3.125em;
}

.confetti {
  margin: auto;
}

.history-summary {
  margin: 2em 0;
}

.offers {
  font-family: var(--tiki-font-family);
  font-size: var(--tiki-font-size);
  line-height: var(--tiki-line-height);
  color: var(--tiki-primary-text-color);
  text-transform: uppercase;
  font-weight: bold;
}

.carousel {
  margin-top: 1em;
}
</style>
