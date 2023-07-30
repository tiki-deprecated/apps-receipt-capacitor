<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import { State } from "./state";
import Account from "@/modules/account/Account.vue";
import { PropType, ref, watch } from "vue";
import type { Offer } from "@/modules/offer/Offer";
import OfferSheet from "@/modules/offer/OfferSheet.vue";
import Terms from "@/modules/terms/Terms.vue";
import Learn from "@/modules/learn/Learn.vue";
import Reward from "@/modules/reward/Reward.vue";
import History from "@/modules/history/History.vue";
import BottomSheet from "@/components/BottomSheet.vue";

defineEmits(["update:present"]);
const props = defineProps({
  present: {
    type: Boolean,
    default: false,
  },
  offer: {
    type: Object as PropType<Offer>,
    required: true,
  },
  terms: {
    type: Object,
    required: true,
  },
  learnMore: {
    type: Object,
    required: true,
  },
});

const state = ref(State.Hidden);
watch(
  () => props.present,
  (present) => {
    if (present) state.value = State.Offer;
    else state.value = State.Hidden;
  },
);
</script>

<template>
  <Transition appear name="fade">
    <bottom-sheet
      v-if="present"
      @dismiss="$emit('update:present', false)"
      :show="state !== State.Hidden"
    >
      <div class="body">
        <offer-sheet
          v-if="state === State.Offer"
          @learn="state = State.Learn"
          @accept="state = State.Terms"
          @close="state = State.Hidden"
          :offer="offer"
        />
        <terms
          v-if="state === State.Terms"
          :src="terms"
          @back="state = State.Offer"
          @accept="state = State.Reward"
        />
        <learn
          v-if="state === State.Learn"
          :src="learnMore"
          @back="state = State.Offer"
        />
        <reward
          v-if="state === State.Reward"
          @close="state = State.Hidden"
          @history="state = State.History"
          @account="state = State.Account"
        />
        <history
          v-if="state === State.History"
          @close="state = State.Hidden"
          @back="state = State.Reward"
        />
        <account
          v-if="state === State.Account"
          @close="state = State.Hidden"
          @back="state = State.Reward"
        />
      </div>
    </bottom-sheet>
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

.body {
  padding: 1.5em 1em 2.5em 1em;
  box-sizing: border-box;
}
</style>
