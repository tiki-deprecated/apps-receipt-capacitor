<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->
<script setup lang="ts">
import {
  AccountSelect,
  AccountForm,
  HeaderBack,
  ButtonText,
  ButtonTextState,
} from "@/components";
import {
  type Account,
  type AccountType,
  accountTypes,
  GMAIL,
  AOL,
  YAHOO,
  OUTLOOK
} from "@mytiki/capture-receipt-capacitor";
import { ref, inject, computed } from "vue";
import { type Capture } from "@/service";
import { InjectKey } from "@/utils";

const emit = defineEmits(["close", "back"]);
const capture: Capture = inject(InjectKey.capture)!;

const filtered = accountTypes.index;
capture.accounts.forEach((account) => filtered.delete(account.type.id));
filtered.delete(GMAIL.id);
filtered.delete(AOL.id);
filtered.delete(YAHOO.id);
filtered.delete(OUTLOOK.id);

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

const isLoading = ref<boolean>(false);

const submit = async () => {
  isLoading.value = true;
  error.value = "";
  try {
    await capture.login(form.value);
    capture.scan().catch((error) => console.error(error.toString()));
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
  isLoading.value = false;
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
    <button-text
      text="Connect Retailer"
      :state="
        isLoading
          ? ButtonTextState.STANDARD_LOADING
          : canSubmit
          ? ButtonTextState.STANDARD
          : ButtonTextState.STANDARD_DISABLED
      "
      @click="submit"
    />
  </div>
</template>
