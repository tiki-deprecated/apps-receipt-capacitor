<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import AccountSelect from "../account/account-select.vue";
import AccountForm from "../account/account-form.vue";
import HeaderBack from "@/components/header/header-back.vue";
import TextButton from "@/components/button/button-text.vue";
import { type Account, AMAZON } from "@mytiki/capture-receipt-capacitor";
import type { TikiService } from "@/service";
import { ref, inject, computed } from "vue";
import { ButtonTextState } from "@/components/button/button-text-state";

const emit = defineEmits(["close", "back"]);
const tiki: TikiService = inject("Tiki")!;

const form = ref<Account>({ username: "", password: "", type: AMAZON });
const error = ref<string>();

const canSubmit = computed(
  () =>
    form.value.username != undefined &&
    form.value.password != undefined &&
    form.value.username?.length > 0 &&
    form.value.password?.length > 0,
);

const isLoading = ref<boolean>(false)

const submit = async () => {
  isLoading.value = true
  error.value = "";
  try {
    await tiki.capture.login(form.value);
    form.value = { username: "", password: "", type: AMAZON };
    tiki.capture.scan().catch((error) => console.error(error.toString()));
    emit("back");
  } catch (err: any) {
    error.value = err.toString();
  }
  isLoading.value = false
};
</script>

<template>
  <div>
    <header-back
      text="Add Retailer"
      @back="$emit('back')"
      @close="$emit('close')"
    />
    <account-select v-model:account-type="form.type" />
    <account-form
      v-model:account="form"
      :error="error"
      :account-type="form.type"
      @update:account="(val) => (form = val)"
    />
    <text-button
      text="Connect Retailer"
      :state="canSubmit && !isLoading ? ButtonTextState.STANDARD  : ButtonTextState.DISABLED"
      @click="submit"
      :isLoading="isLoading"
    />
  </div>
</template>
