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

defineEmits(["back", "close", "link"]);
const props = defineProps({
  accounts: {
    type: Array<AccountCreds>,
    required: false,
    default: [
      {
        username: "mike@mytiki.com",
        type: AccountTypes.GMAIL,
        isVerified: true,
      },
      {
        username: "mike@mytiki.com",
        type: AccountTypes.GMAIL,
        isVerified: false,
      },
    ],
  },
});

const filtered = props.accounts?.filter(
  (account) => account.type.key === AccountTypes.GMAIL.key,
);
</script>

<template>
  <header-back
    text="Gmail Accounts"
    @back="$emit('back')"
    @close="$emit('close')"
  />
  <account-list :accounts="filtered" class="list" />
  <button-text text="Add Account" @click="$emit('link')" />
</template>

<style scoped>
.list {
  margin-bottom: 2em;
}
</style>
