<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import { initialState, TikiReceiptState } from "@/tiki-receipt-state";
import { apply } from "@/service/theme";
import { inject, ref, watch } from "vue";
import BottomSheet from "@/components/bottom-sheet.vue";
import ProgramSheet from "@/components/program/program-sheet.vue";
import TermsSheet from "@/components/terms-sheet.vue";
import LearnSheet from "@/components/learn-sheet.vue";
import RewardSheet from "@/components/reward/reward-sheet.vue";
import HistorySheet from "@/components/history/history-sheet.vue";
import AccountSheet from "@/components/account/account-sheet.vue";
import type { TikiService } from "@/service/tiki-service";

const emit = defineEmits(["update:present"]);
const props = defineProps({
  present: {
    type: Boolean,
    default: false,
  },
});

const tiki: TikiService | undefined = inject("Tiki");
apply(document, tiki?.config.theme);

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
</script>

<template>
  <Transition appear name="fade">
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
