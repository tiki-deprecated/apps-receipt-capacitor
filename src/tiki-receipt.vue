<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import { inject, provide, watch, ref } from "vue";
import type { TikiService } from "@/service/tiki-service";
import { Navigate, NavView } from "@/nav";
import * as Keys from "@/utils/inject-key";

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
  }
});

const navigate = new Navigate();
provide(Keys.navigate, navigate);
const tiki: TikiService = inject(Keys.tiki)!;
tiki.inject(provide);
const update = (show: boolean) => emit("update:present", show);
const show = ref<boolean>(false);

watch(
  () => props.present,
  async (present) => {
    if (present) {
      const isInitialized: boolean = tiki?.isInitialized ?? false;
      if (!isInitialized) {
        show.value = false;
        emit("update:present", false);
        throw Error("TIKI SDK is not yet initialized");
      }
    }
    show.value = present;
  },
);

</script>

<template>
    <nav-view :show="present" @update:show="update"/>
</template>

<style scoped>
</style>
