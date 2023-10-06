<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->
<script setup lang="ts">
import AccountSelect from "../account/account-select.vue";
import AccountForm from "../account/account-form.vue";
import HeaderBack from "@/components/header/header-back.vue";
import TextButton from "@/components/button/button-text.vue";
import { type Account, ACME_MARKETS } from "@mytiki/capture-receipt-capacitor";
import type { TikiService } from "@/service";
import { ref, inject, computed } from "vue";
import { ButtonTextState } from "@/components/button/button-text-state";

const emit = defineEmits(["close", "back"]);
const tiki: TikiService = inject("Tiki")!;

const form = ref<Account>({ username: "", password: "", type: ACME_MARKETS });
const error = ref<string>();

const canSubmit = computed(
  () =>
    form.value.username != undefined &&
    form.value.password != undefined &&
    form.value.username?.length > 0 &&
    form.value.password?.length > 0,
);

const submit = async () => {
  try {
    await tiki.capture.login(form.value);
    tiki.capture.scan().catch((error) => console.error(error.toString()));
    error.value = "";
    form.value = { username: "", password: "", type: ACME_MARKETS };
    emit("back");
  } catch (err: any) {
    error.value = err.toString();
  }
};
</script>

<template>
  <div>
    <header-back
      text="Add Retailer"
      @back="$emit('back')"
      @close="$emit('close')"
    />
    <account-select
      :account-type="form.type"
      @update:accountType="(val) => (form.type = val)"
    />
    <account-form
      v-model:account="form"
      :error="error"
      :account-type="form.type"
      @update:account="(val) => (form = val)"
    />
    <text-button
      text="Connect Retailer"
      :state="canSubmit ? ButtonTextState.STANDARD : ButtonTextState.DISABLED"
      @click="submit"
    />
  </div>
</template>
