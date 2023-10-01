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
import { ref } from "vue";

defineEmits(["close", "back"]);
const form = ref<Account>({ username: "", password: "", type: AMAZON });
const error = ref<string>();

const submit = async () => {
  if (
    form.value.username != undefined &&
    form.value.password != undefined &&
    form.value.username?.length > 0 &&
    form.value.password?.length > 0
  ) {
    try {
      error.value = "";
      form.value = { username: "", password: "", type: AMAZON };
    } catch (err: any) {
      error.value = err.toString();
    }
  }
};
</script>

<template>
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
  />
  <text-button text="Connect Retailer" @click="submit" />
</template>
