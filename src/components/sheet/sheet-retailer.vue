<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import HeaderBack from "@/components/header/header-back.vue";
import ButtonText from "@/components/button/button-text.vue";
import AccountList from "@/components/account/account-list.vue";
import type { TikiService } from "@/service";
import { inject, ref } from "vue";
import type { Account } from "@mytiki/capture-receipt-capacitor";

const emit = defineEmits(["back", "close", "add", "skip"]);
const tiki: TikiService | undefined = inject("Tiki");
const filter = (accounts: Account[]): Account[] =>
  accounts.filter((account) => account.type.type === "RETAILER");
const accounts = ref<Account[]>(filter(tiki?.capture.accounts ?? []));
if (accounts.value.length == 0) emit("skip");

tiki?.capture.onAccount("SheetRetailer", (_, __) => {
  accounts.value = filter(tiki?.capture.accounts ?? []);
});

const remove = async (account: Account) => {
  //show warn.
  await tiki?.capture.logout(account);
};
</script>

<template>
  <header-back
    text="Retailer Accounts"
    @back="$emit('back')"
    @close="$emit('close')"
  />
  <account-list :accounts="accounts" class="list" @delete="remove" />
  <button-text text="Add Account" @click="$emit('add')" />
</template>

<style scoped>
.list {
  margin-bottom: 2em;
}
</style>
