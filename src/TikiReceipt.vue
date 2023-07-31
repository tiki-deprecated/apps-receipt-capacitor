<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import { initialState, State } from "@/state";
import { inject, PropType, ref, watch } from "vue";
import type { Offer } from "@/modules/offer/Offer";
import OfferSheet from "@/modules/offer/OfferSheet.vue";
import TermsSheet from "@/modules/terms/TermsSheet.vue";
import LearnSheet from "@/modules/learn/LearnSheet.vue";
import RewardSheet from "@/modules/reward/RewardSheet.vue";
import HistorySheet from "@/modules/history/HistorySheet.vue";
import BottomSheet from "@/components/BottomSheet.vue";
import AccountSheet from "@/modules/account/AccountSheet.vue";
import type { Reward } from "@/modules/reward/Reward";
import { TikiSdk } from "../../tiki-sdk-capacitor/src";

const tiki: TikiSdk | undefined = inject("TikiSdk");

const emit = defineEmits(["update:present"]);
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
  rewards: {
    type: Array<Reward>,
    required: true,
  },
  ptr: {
    type: String,
    required: true,
  },
});

const state = ref(State.Hidden);
watch(
  () => props.present,
  async (present) => {
    if (present) {
      try {
        state.value = await initialState(tiki!, props.ptr!);
      } catch (e) {
        console.error(e);
        emit("update:present", false);
      }
    } else state.value = State.Hidden;
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
        <terms-sheet
          v-if="state === State.Terms"
          :src="terms"
          @back="state = State.Offer"
          @accept="state = State.Reward"
        />
        <learn-sheet
          v-if="state === State.Learn"
          :src="learnMore"
          @back="state = State.Offer"
        />
        <reward-sheet
          v-if="state === State.Reward"
          @close="state = State.Hidden"
          @history="state = State.History"
          @account="state = State.Account"
          :rewards="rewards"
        />
        <history-sheet
          v-if="state === State.History"
          @close="state = State.Hidden"
          @back="state = State.Reward"
        />
        <account-sheet
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
