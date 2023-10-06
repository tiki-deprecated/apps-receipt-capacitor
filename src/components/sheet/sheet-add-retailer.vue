<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->
<script setup lang="ts">
import AccountSelect from "../account/account-select.vue";
import AccountForm from "../account/account-form.vue";
import HeaderBack from "@/components/header/header-back.vue";
import TextButton from "@/components/button/button-text.vue";
import type { AccountType } from "@mytiki/capture-receipt-capacitor";
import {
  type Account,
  accountTypes,
  GMAIL,
} from "@mytiki/capture-receipt-capacitor";
import type { TikiService } from "@/service";
import { ref, inject, computed } from "vue";
import { ButtonTextState } from "@/components/button/button-text-state";

const emit = defineEmits(["close", "back"]);
const tiki: TikiService = inject("Tiki")!;

const filtered = accountTypes.index;
tiki.capture.accounts.forEach((account) => filtered.delete(account.type.id));
filtered.delete(GMAIL.id);

const form = ref<Account>({
  username: "",
  password: "",
  type: filtered.values().next().value,
});
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
    tiki.capture.scan().catch((error) => console.error(error.toString()));
    error.value = "";
    form.value = {
      username: "",
      password: "",
      type: filtered.values().next().value,
    };
    emit("back");
  } catch (err: any) {
    error.value = err.toString();
  }
  isLoading.value = false
};

const updateAccount = (account: Account) => (form.value = account);
const updateType = (typ: AccountType) => (form.value.type = typ);
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
      :options="filtered"
      @update:account-type="updateType"
    />
    <account-form
      :account="form"
      :error="error"
      :account-type="form.type"
      @update:account="updateAccount"
    />
    <text-button
      text="Connect Retailer"
      :state="canSubmit && !isLoading ? ButtonTextState.STANDARD  : ButtonTextState.DISABLED"
      @click="submit"
      :isLoading="isLoading"
    />
  </div>
</template>
