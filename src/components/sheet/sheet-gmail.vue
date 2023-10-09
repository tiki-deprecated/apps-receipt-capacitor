<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import { HeaderBack, ButtonText, AccountList } from "@/components";
import { type Account, GMAIL } from "@mytiki/capture-receipt-capacitor";
import { inject, ref } from "vue";
import type { Capture } from "@/service";
import { Keys } from "@/utils";

const emit = defineEmits(["back", "close", "add", "skip", "warn"]);
const capture: Capture = inject(Keys.capture)!;

const filter = (accounts: Account[]): Account[] =>
  accounts.filter((account) => account.type.id === GMAIL.id);
const accounts = ref<Account[]>(filter(capture.accounts ?? []));
if (accounts.value.length == 0) emit("skip");

capture.onAccount("SheetGmail", (_, __) => {
  accounts.value = filter(capture.accounts ?? []);
});

const remove = async (account: Account) => {
  if (accounts.value.length > 1) await capture.logout(account);
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
