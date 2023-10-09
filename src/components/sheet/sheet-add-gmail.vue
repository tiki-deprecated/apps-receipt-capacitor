<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import {
  AccountForm,
  HeaderBack,
  ButtonText,
  ButtonTextState,
} from "@/components";
import { type Account, GMAIL } from "@mytiki/capture-receipt-capacitor";
import { computed, inject, ref } from "vue";
import { type Capture } from "@/service";
import { Keys } from "@/utils";

const emit = defineEmits(["close", "back"]);
const capture: Capture = inject(Keys.capture)!;

const form = ref<Account>({ username: "", password: "", type: GMAIL });
const error = ref<string>();

const canSubmit = computed(
  () =>
    form.value.username != undefined &&
    form.value.password != undefined &&
    form.value.username?.length > 0 &&
    form.value.password?.length > 0,
);

const isLoading = ref<boolean>(false);

const submit = async () => {
  isLoading.value = true;
  error.value = "";
  try {
    await capture.login(form.value);
    form.value = { username: "", password: "", type: GMAIL };
    capture.scan().catch((error) => console.error(error.toString()));
    emit("back");
  } catch (err: any) {
    error.value = err.toString();
  }
  isLoading.value = false;
};

const updateAccount = (account: Account) => (form.value = account);
</script>

<template>
  <div>
    <header-back
      text="Add Gmail"
      @back="$emit('back')"
      @close="$emit('close')"
    />
    <account-form
      :account="form"
      :error="error"
      :account-type="form.type"
      @update:account="updateAccount"
    />
    <button-text
      text="Connect Gmail"
      :state="
        isLoading
          ? ButtonTextState.STANDARD_LOADING
          : canSubmit
          ? ButtonTextState.STANDARD
          : ButtonTextState.STANDARD_DISABLED
      "
      :is-loading="isLoading"
      @click="submit"
    />
  </div>
</template>
