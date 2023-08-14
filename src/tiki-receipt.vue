<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import { initialState, TikiReceiptState } from "@/tiki-receipt-state";
import { inject, ref, watch } from "vue";
import BottomSheet from "@/components/bottom-sheet.vue";
import ProgramSheet from "@/components/program/program-sheet.vue";
import TermsSheet from "@/components/terms-sheet.vue";
import LearnSheet from "@/components/learn-sheet.vue";
import RewardSheet from "@/components/reward/reward-sheet.vue";
import HistorySheet from "@/components/history/history-sheet.vue";
import AccountSheet from "@/components/account/account-sheet.vue";
import type { TikiService } from "@/service/tiki-service";
import type { Theme } from "@/service/config";

const emit = defineEmits(["update:present"]);
const props = defineProps({
  present: {
    type: Boolean,
    default: false,
  },
});
const state = ref(TikiReceiptState.Hidden);
watch(
  () => props.present,
  async (present) => {
    if (present) {
      try {
        state.value = await initialState(tiki!);
      } catch (e) {
        console.error(e);
        emit("update:present", false);
      }
    } else state.value = TikiReceiptState.Hidden;
  },
);

const tiki: TikiService | undefined = inject("Tiki");
const stylize = (property: string, value?: string) => {
  if (value != undefined)
    document.documentElement.style.setProperty(property, value);
};
const theme: Theme | undefined = tiki?.config.theme;
stylize("--tiki-font-family", theme?.fontFamily);
stylize("--tiki-primary-text-color", theme?.primaryTextColor);
stylize("--tiki-secondary-text-color", theme?.secondaryTextColor);
stylize("--tiki-primary-background-color", theme?.primaryBackgroundColor);
stylize("--tiki-secondary-background-color", theme?.secondaryBackgroundColor);
stylize("--tiki-accent-color", theme?.accentColor);

const closeUI = () => {
  return function (direction: string, element) {

  const isHeadingElement = (className: string) : Boolean => ['heading', 'title'].includes(className);
  const isFullScreenElement = (className: string) : Boolean => className === 'full-screen';
  if (
    direction === 'bottom' &&
    (
      isHeadingElement(element.target.className) ||
      (
        element.target.className === 'body' &&
        (
          isHeadingElement(element.target.firstElementChild.className) ||
          isFullScreenElement(element.target.firstElementChild.className)
        )
      )
    )
  ) {
    state.value = TikiReceiptState.Hidden;
  }
}

};
</script>

<template>
  <Transition appear name="fade" v-touch:swipe="closeUI()">
    <bottom-sheet
      v-if="present"
      @dismiss="$emit('update:present', false)"
      :show="state !== TikiReceiptState.Hidden"
    >
      <div class="body">
        <program-sheet
          v-if="state === TikiReceiptState.Program"
          @learn="state = TikiReceiptState.Learn"
          @accept="state = TikiReceiptState.Terms"
          @close="state = TikiReceiptState.Hidden"
          :program="tiki!.config.program"
        />
        <terms-sheet
          v-if="state === TikiReceiptState.Terms"
          :program="tiki!.config.program"
          @back="state = TikiReceiptState.Program"
          @accept="state = TikiReceiptState.Reward"
        />
        <learn-sheet
          v-if="state === TikiReceiptState.Learn"
          :program="tiki!.config.program"
          @back="state = TikiReceiptState.Program"
        />
        <reward-sheet
          v-if="state === TikiReceiptState.Reward"
          :rewards="tiki!.config.rewards"
          @close="state = TikiReceiptState.Hidden"
          @history="state = TikiReceiptState.History"
          @account="state = TikiReceiptState.Account"
        />
        <history-sheet
          v-if="state === TikiReceiptState.History"
          @close="state = TikiReceiptState.Hidden"
          @back="state = TikiReceiptState.Reward"
        />
        <account-sheet
          v-if="state === TikiReceiptState.Account"
          @close="state = TikiReceiptState.Hidden"
          @back="state = TikiReceiptState.Reward"
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
