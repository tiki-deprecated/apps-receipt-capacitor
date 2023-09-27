<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import AccountForm from "../account/account-form.vue";
import HeaderBack from "@/components/header/header-back.vue";
import TextButton from "@/components/button/button-text.vue";
import { AccountCreds } from "@/components/account/account-creds";
import * as Type from "@/components/account/account-type";
import { ref } from "vue";

defineEmits(["close", "back"]);
const form = ref<AccountCreds>(new AccountCreds("", Type.GMAIL, ""));
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
      form.value = new AccountCreds("", Type.GMAIL, "", undefined);
    } catch (err: any) {
      error.value = err.toString();
    }
  }
};
</script>

<template>
  <header-back text="Add Gmail" @back="$emit('back')" @close="$emit('close')" />
  <account-form
    v-model:account="form"
    :error="error"
    :account-type="form.type"
  />
  <text-button text="Connect Gmail" @click="submit" />
</template>
