<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import HeaderBack from "@/components/header/header-back.vue";
import ButtonText from "@/components/button/button-text.vue";
import AccountList from "@/components/account/account-list.vue";
import { AccountCreds } from "@/components/account/account-creds";
import * as AccountTypes from "@/components/account/account-type";
import type { TikiService } from "@/service/tiki-service";
import { inject, ref } from "vue";

const emit = defineEmits(["back", "close", "add", "skip"]);
const tiki: TikiService | undefined = inject("Tiki");
const filter = (accounts: AccountCreds[]): AccountCreds[] =>
  accounts.filter((account) => account.type.key === AccountTypes.GMAIL.key);
const accounts = ref<AccountCreds[]>(filter(tiki?.capture.accounts ?? []));
if (accounts.value.length == 0) emit("skip");
tiki?.capture.onAccount("SheetGmail", (_, __) => {
  accounts.value = filter(tiki?.capture.accounts ?? []);
});
</script>

<template>
  <header-back
    text="Gmail Accounts"
    @back="$emit('back')"
    @close="$emit('close')"
  />
  <account-list :accounts="accounts" class="list" />
  <button-text text="Add Account" @click="$emit('add')" />
</template>

<style scoped>
.list {
  margin-bottom: 2em;
}
</style>
