<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import { TikiSdk } from "@mytiki/tiki-sdk-capacitor";
import { initialState, State } from "@/utils/state";
import type { Config } from "@/utils/config/config";
import { apply } from "@/utils/config/theme";
import { inject, PropType, ref, watch } from "vue";
import BottomSheet from "@/components/bottom-sheet.vue";
import ProgramSheet from "@/modules/program/program-sheet.vue";
import TermsSheet from "@/modules/terms/terms-sheet.vue";
import LearnSheet from "@/modules/learn/learn-sheet.vue";
import RewardSheet from "@/modules/reward/reward-sheet.vue";
import HistorySheet from "@/modules/history/history-sheet.vue";
import AccountSheet from "@/modules/account/account-sheet.vue";

const tiki: TikiSdk | undefined = inject("TikiSdk");
const defaultConfig: Config | undefined = inject("TikiReceiptConfig");

const emit = defineEmits(["update:present"]);
const props = defineProps({
  present: {
    type: Boolean,
    default: false,
  },
  config: {
    type: Object as PropType<Config>,
    required: false,
  },
});
const config: Config = props.config ?? defaultConfig!;
apply(document, config.theme);
const state = ref(State.Hidden);
watch(
  () => props.present,
  async (present) => {
    if (present) {
      try {
        state.value = State.Account;
        // state.value = await initialState(tiki!);
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
        <program-sheet
          v-if="state === State.Program"
          @learn="state = State.Learn"
          @accept="state = State.Terms"
          @close="state = State.Hidden"
          :program="config.program"
        />
        <terms-sheet
          v-if="state === State.Terms"
          :program="config.program"
          @back="state = State.Program"
          @accept="state = State.Reward"
        />
        <learn-sheet
          v-if="state === State.Learn"
          :program="config.program"
          @back="state = State.Program"
        />
        <reward-sheet
          v-if="state === State.Reward"
          @close="state = State.Hidden"
          @history="state = State.History"
          @account="state = State.Account"
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
