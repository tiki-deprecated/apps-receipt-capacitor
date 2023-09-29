<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import AccountSelect from "../account/account-select.vue";
import AccountForm from "../account/account-form.vue";
import HeaderBack from "@/components/header/header-back.vue";
import TextButton from "@/components/button/button-text.vue";
import { AccountCreds } from "@/components/account/account-creds";
import * as Type from "@/components/account/account-type";
import { ref } from "vue";

defineEmits(["close", "back"]);
const index = ref<Map<string, Type.AccountType>>(new Map(Type.index))
const error = ref<string>();
index.value.delete('GMAIL')

const accounts = {
    default: [
      {
        username: "mike@mytiki.com",
        type: Type.ALBERTSONS,
        isVerified: true,
      },
      {
        username: "mike@mytiki.com",
        type: Type.CVS,
        isVerified: false,
      },
      {
        username: "mike@mytiki.com",
        type: Type.AMAZON,
        isVerified: false,
      },
    ],
  }

accounts.default.forEach(account => {
  index.value.delete(account.type.key)
});
const options = index.value.values()

const form = ref<AccountCreds>(new AccountCreds("", options.next().value, ""));

const submit = async () => {
  if (
    form.value.username != undefined &&
    form.value.password != undefined &&
    form.value.username?.length > 0 &&
    form.value.password?.length > 0
  ) {
    try {
      error.value = "";
      form.value = new AccountCreds("", options.next().value, "", undefined);
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
  <account-select v-model:account-type="form.type" :options="index"/>
  <account-form
    v-model:account="form"
    :error="error"
    :account-type="form.type"
  />
  <text-button text="Connect Retailer" @click="submit" />
</template>
