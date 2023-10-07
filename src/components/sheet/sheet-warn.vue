<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->
<script setup lang="ts">
import HeaderBack from "@/components/header/header-back.vue";
import ButtonText from "@/components/button/button-text.vue";
import { ButtonTextState } from "@/components/button/button-text-state";
import type { PropType } from "vue";
import { inject, ref } from "vue";
import type { Account } from "@mytiki/capture-receipt-capacitor";
import type { TikiService } from "@/service";

const emit = defineEmits(["remove", "close", "back"]);
const props = defineProps({
  account: {
    type: Object as PropType<Account | undefined>,
    required: true,
  },
});

if (props.account === undefined) emit("back");
const tiki: TikiService = inject("Tiki")!;
const isLoading = ref<boolean>(false);
const remove = async () => {
  isLoading.value = true;
  await tiki.capture.logout(props.account);
  isLoading.value = false;
  emit("back");
};
</script>

<template>
  <div>
    <header-back
      text="Remove Account"
      @back="$emit('back')"
      @close="$emit('close')"
    />
    <div class="alert-text">
      <p class="alert-text-bold">
        Warning! Removing this account may disqualify you from payout.
      </p>
      <p>
        To swap accounts, first connect the other one. Then remove this one.
      </p>
      <p>Are you sure you want to proceed?</p>
    </div>
    <button-text
      text="Remove Account"
      class="warning-button"
      :state="isLoading ? ButtonTextState.ALERT_LOADING : ButtonTextState.ALERT"
      @click="remove"
    />
  </div>
</template>

<style>
.alert-text {
  text-align: center;
  font-family: var(--tiki-font-family);
  font-size: var(--tiki-font-size);
  line-height: var(--tiki-line-height);
  color: var(--tiki-secondary-text-color);
  margin-bottom: 2em;
}

.alert-text-bold {
  font-weight: bold;
}
</style>
