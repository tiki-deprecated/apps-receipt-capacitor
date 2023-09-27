<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import { inject, type RendererElement, watch } from "vue";
import SheetBottom from "@/components/sheet/sheet-bottom.vue";
import SheetOffer from "@/components/sheet/sheet-offer.vue";
import SheetTerms from "@/components/sheet/sheet-terms.vue";
import SheetLearn from "@/components/sheet/sheet-learn.vue";
import SheetHome from "@/components/sheet/sheet-home.vue";
import type { TikiService } from "@/service/tiki-service";
import * as Swipe from "@/utils/swipe";
import * as Theme from "@/config/theme";
import { Navigate, Sheets } from "@/utils/navigate";
import SheetGoogle from "@/components/sheet/sheet-google.vue";
import SheetRetailer from "@/components/sheet/sheet-retailer.vue";

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

const navigate = new Navigate();
watch(
  () => props.present,
  async (present) => {
    if (present) {
      try {
        await navigate.initialize(tiki!);
      } catch (e) {
        console.error(e);
        emit("update:present", false);
      }
    } else navigate.clear();
  },
);

const tiki: TikiService | undefined = inject("Tiki");
Theme.apply(document, tiki?.config.theme);
const swipe = (direction: string, element: RendererElement) => {
  if (Swipe.close(direction, element)) navigate.clear();
};
</script>

<template>
  <Transition appear name="fade" v-touch:swipe="swipe">
    <sheet-bottom
      v-if="present"
      @dismiss="$emit('update:present', false)"
      :show="navigate.ref.value !== Sheets.Hidden"
    >
      <div class="body">
        <sheet-offer
          v-if="navigate.ref.value === Sheets.Offer"
          @learn="navigate.to(Sheets.Learn)"
          @accept="navigate.to(Sheets.Terms)"
          @close="navigate.clear()"
          :description="tiki!.config.offer.description!"
          :image="tiki!.config.offer.image!"
          :bullets="tiki!.config.offer.bullets!"
        />
        <sheet-terms
          v-if="navigate.ref.value === Sheets.Terms"
          :markdown="tiki!.config.terms"
          @back="navigate.pop()"
          @accept="navigate.to(Sheets.Home)"
        />
        <sheet-learn
          v-if="navigate.ref.value === Sheets.Learn"
          :markdown="tiki!.config.learn"
          @back="navigate.pop()"
        />
        <sheet-home
          v-if="navigate.ref.value === Sheets.Home"
          @close="navigate.clear()"
          @learn="navigate.to(Sheets.Learn)"
          @withdraw="tiki!.config.callback"
          @gmail="navigate.to(Sheets.Google)"
          @retailer="navigate.to(Sheets.Retailer)"
        />
        <sheet-google
          v-if="navigate.ref.value === Sheets.Google"
          @back="navigate.pop()"
        />
        <sheet-retailer
          v-if="navigate.ref.value === Sheets.Retailer"
          @back="navigate.pop()"
        />
        <!--        <account-sheet-->
        <!--          v-if="state === TikiReceiptState.Account"-->
        <!--          @close="state = TikiReceiptState.Hidden"-->
        <!--          @back="state = TikiReceiptState.Reward"-->
        <!--          :accountType="accountType!"-->
        <!--        />-->
      </div>
    </sheet-bottom>
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
