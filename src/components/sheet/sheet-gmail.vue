<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import HeaderBack from "@/components/header/header-back.vue";
import ButtonText from "@/components/button/button-text.vue";
import AccountList from "@/components/account/account-list.vue";
import type { TikiService } from "@/service";
import { type Account, GMAIL } from "@mytiki/capture-receipt-capacitor";
import { inject, ref } from "vue";

const emit = defineEmits(["back", "close", "add", "skip", "warn"]);
const tiki: TikiService = inject("Tiki")!;

const filter = (accounts: Account[]): Account[] =>
  accounts.filter((account) => account.type.id === GMAIL.id);
const accounts = ref<Account[]>(filter(tiki.capture.accounts ?? []));
if (accounts.value.length == 0) emit("skip");

tiki.capture.onAccount("SheetGmail", (_, __) => {
  accounts.value = filter(tiki.capture.accounts ?? []);
});

const remove = async (account: Account) => {
  if (accounts.value.length > 1) await tiki.capture.logout(account);
  else emit("warn", account);
};
</script>

<template>
  <div>
    <header-back
      text="Gmail Accounts"
      @back="$emit('back')"
      @close="$emit('close')"
    />
    <account-list :accounts="accounts" class="list" @delete="remove" />
    <button-text text="Add Account" @click="$emit('add')" />
  </div>
</template>

<style scoped>
.list {
  margin-bottom: 2em;
}
</style>
