<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import { inject, provide, watch } from "vue";
import SheetBottom from "@/components/sheet/sheet-bottom.vue";
import type { TikiService } from "@/service";
import { Navigate, NavView, NavDef } from "@/nav";
import * as Keys from "@/utils/inject-key";
import type { LicenseRecord } from "@mytiki/tiki-sdk-capacitor";

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

const tiki: TikiService = inject(Keys.tiki)!;
tiki.config.theme.apply(document);

const navigate = new Navigate();
provide(Keys.navigate, navigate);

watch(
  () => props.present,
  async (present) => {
    if (present) {
      const isInitialized: boolean = tiki?.isInitialized ?? false;
      if (isInitialized) {
        const license: LicenseRecord | undefined =
          await tiki!.publish.getLicense();
        console.log(`license: ${JSON.stringify(license)}`);
        if (!license) navigate.to(NavDef.Offer);
        else navigate.to(NavDef.Home);
      } else {
        emit("update:present", false);
        throw Error("TIKI SDK is not yet initialized");
      }
    } else navigate.clear();
  },
);
</script>

<template>
  <Transition appear name="fade">
    <sheet-bottom
      v-if="present"
      :show="navigate.ref.value !== NavDef.None"
      @dismiss="$emit('update:present', false)"
    >
      <nav-view />
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
</style>
