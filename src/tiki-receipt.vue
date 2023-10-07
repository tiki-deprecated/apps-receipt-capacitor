<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import { inject, watch } from "vue";
import SheetBottom from "@/components/sheet/sheet-bottom.vue";
import SheetOffer from "@/components/sheet/sheet-offer.vue";
import SheetTerms from "@/components/sheet/sheet-terms.vue";
import SheetLearn from "@/components/sheet/sheet-learn.vue";
import SheetHome from "@/components/sheet/sheet-home.vue";
import type { TikiService } from "@/service";
import { Navigate, Sheets } from "@/utils/navigate";
import SheetGmail from "@/components/sheet/sheet-gmail.vue";
import SheetRetailer from "@/components/sheet/sheet-retailer.vue";
import SheetAddGmail from "@/components/sheet/sheet-add-gmail.vue";
import SheetAddRetailer from "@/components/sheet/sheet-add-retailer.vue";
import SheetWarn from "@/components/sheet/sheet-warn.vue";
import type { Account } from "@mytiki/capture-receipt-capacitor";

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

const tiki: TikiService = inject("Tiki")!;
tiki.config.theme.apply(document);

const warn = (account: Account) =>
  navigate.to(Sheets.Warn, new Map([["account", account]]));
</script>

<template>
  <Transition appear name="fade">
    <sheet-bottom
      v-if="present"
      :show="navigate.ref.value !== Sheets.Hidden"
      @dismiss="$emit('update:present', false)"
    >
      <div class="body">
        <sheet-offer
          v-if="navigate.ref.value === Sheets.Offer"
          :description="tiki.config.offer.description"
          :image="tiki.config.offer.image"
          :bullets="tiki.config.offer.bullets"
          @learn="navigate.to(Sheets.Learn)"
          @accept="navigate.to(Sheets.Terms)"
          @close="navigate.clear()"
        />
        <sheet-terms
          v-if="navigate.ref.value === Sheets.Terms"
          :markdown="tiki.config.terms"
          @back="navigate.pop()"
          @accept="navigate.to(Sheets.Home)"
          @close="navigate.clear()"
        />
        <sheet-learn
          v-if="navigate.ref.value === Sheets.Learn"
          :markdown="tiki.config.learn"
          @back="navigate.pop()"
          @close="navigate.clear()"
        />
        <sheet-home
          v-if="navigate.ref.value === Sheets.Home"
          @close="navigate.clear()"
          @learn="navigate.to(Sheets.Learn)"
          @withdraw="navigate.clear()"
          @gmail="navigate.to(Sheets.Google)"
          @retailer="navigate.to(Sheets.Retailer)"
        />
        <sheet-gmail
          v-if="navigate.ref.value === Sheets.Google"
          @back="navigate.pop()"
          @close="navigate.clear()"
          @add="navigate.to(Sheets.AddGoogle)"
          @warn="warn"
          @skip="
            navigate.pop();
            navigate.to(Sheets.AddGoogle);
          "
        />
        <sheet-retailer
          v-if="navigate.ref.value === Sheets.Retailer"
          @back="navigate.pop()"
          @close="navigate.clear()"
          @add="navigate.to(Sheets.AddRetailer)"
          @warn="warn"
          @skip="
            navigate.pop();
            navigate.to(Sheets.AddRetailer);
          "
        />
        <sheet-add-retailer
          v-if="navigate.ref.value === Sheets.AddRetailer"
          @back="navigate.pop()"
          @close="navigate.clear()"
        />
        <sheet-add-gmail
          v-if="navigate.ref.value === Sheets.AddGoogle"
          @back="navigate.pop()"
          @close="navigate.clear()"
        />
        <sheet-warn
          v-if="navigate.ref.value === Sheets.Warn"
          :account="navigate.params.get('account')"
          @back="navigate.pop()"
          @close="navigate.clear()"
        />
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
  padding: 1.25em 1em 2.5em 1em;
  box-sizing: border-box;
}
</style>
