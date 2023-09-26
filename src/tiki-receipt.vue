<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import * as SheetState from "@/components/sheet/sheet-state";
import { inject, ref, watch, type RendererElement } from "vue";
import BottomSheet from "@/components/sheet/sheet-bottom.vue";
import Program from "@/components/sheet/sheet-program.vue";
import Terms from "@/components/sheet/sheet-terms.vue";
import Learn from "@/components/sheet/sheet-learn.vue";
import type { TikiService } from "@/service/tiki-service";
import * as Swipe from "@/utils/swipe";
import * as Theme from "@/config/theme";

const emit = defineEmits([
  /**
   * Updates the v-model present boolean with the
   * current presentation state of the UI.
   */
  "update:present",
]);
const props = defineProps({
  /**
   * Display the UI if true, hide if false.
   * Recommended to use a v-model e.g.`v-model:present="present"`
   * to auto-track if the UI was closed by a user action.
   */
  present: {
    type: Boolean,
    default: false,
  },
});

const state = ref(SheetState.Sheets.Hidden);
watch(
  () => props.present,
  async (present) => {
    if (present) {
      try {
        state.value = await SheetState.initial(tiki!);
      } catch (e) {
        console.error(e);
        emit("update:present", false);
      }
    } else state.value = SheetState.Sheets.Hidden;
  },
);

const tiki: TikiService | undefined = inject("Tiki");
Theme.apply(document, tiki?.config.theme);
const swipe = (direction: string, element: RendererElement) => {
  if (Swipe.close(direction, element)) state.value = SheetState.Sheets.Hidden;
};
</script>

<template>
  <Transition appear name="fade" v-touch:swipe="swipe">
    <bottom-sheet
      v-if="present"
      @dismiss="$emit('update:present', false)"
      :show="state !== SheetState.Sheets.Hidden"
    >
      <div class="body">
        <program
          v-if="state === SheetState.Sheets.Program"
          @learn="state = SheetState.Sheets.Learn"
          @accept="state = SheetState.Sheets.Terms"
          @close="state = SheetState.Sheets.Hidden"
          :description="tiki!.config.offer.details.description!"
          :image="tiki!.config.offer.details.image!"
          :bullets="tiki!.config.offer.details.bullets!"
        />
        <terms
          v-if="state === SheetState.Sheets.Terms"
          :markdown="tiki!.config.terms"
          @back="state = SheetState.Sheets.Program"
          @accept="state = SheetState.Sheets.Reward"
        />
        <learn
          v-if="state === SheetState.Sheets.Learn"
          :markdown="tiki!.config.learn"
          @back="state = SheetState.Sheets.Program"
        />
        <!--        <account-sheet-->
        <!--          v-if="state === TikiReceiptState.Account"-->
        <!--          @close="state = TikiReceiptState.Hidden"-->
        <!--          @back="state = TikiReceiptState.Reward"-->
        <!--          :accountType="accountType!"-->
        <!--        />-->
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
