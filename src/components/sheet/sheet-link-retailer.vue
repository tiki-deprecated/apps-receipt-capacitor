<script setup lang="ts">
import AccountSelect from '../account/account-select.vue';
import AccountForm from '../account/account-form.vue';
import HeaderBack from "@/components/header/header-back.vue";
import TextButton from "@/components/button/button-text.vue";
import { AccountCreds } from "@/components/account/account-creds";
import * as Type from "@/components/account/account-type";
import { ref } from 'vue';


defineEmits(["close", "back", "unlink"]);

const selectedAccount = ref<Type.AccountType>()
const form = ref<AccountCreds>(new AccountCreds("", Type.AMAZON, ""))
const error = ref<string>();

const updateAccount = (account: HTMLSelectElement) =>{
  selectedAccount.value  = Type.index.get(account.value)
  form.value.type = selectedAccount.value!
}

const submit = async () => {
  if (
    form.value.username != undefined &&
    form.value.password != undefined &&
    form.value.username?.length > 0 &&
    form.value.password?.length > 0
  ) {
    try {
      error.value = "";
      form.value = new AccountCreds("", Type.AMAZON, "", undefined);
    } catch (err: any) {
      error.value = err.toString();
    }
  }
};
</script>

<template>
    <header-back text="Add Retailer" @back="$emit('back')" @close="$emit('close')">
    </header-back>
    <account-select @update="updateAccount" :account="form.type.key"/>
    <account-form v-model:account="form" :error="error" :accountSelected="form.type"/>
    <text-button text="Connect Retailer" @click="submit" />
</template>