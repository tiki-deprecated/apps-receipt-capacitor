<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import HeaderBack from "@/components/header/header-back.vue";
import ButtonText from "@/components/button/button-text.vue";
import AccountList from "@/components/account/account-list.vue";
import {
  type Account,
  ALBERTSONS,
  CVS,
} from "@mytiki/capture-receipt-capacitor";

defineEmits(["back", "close", "link"]);
const props = defineProps({
  accounts: {
    type: Array<Account>,
    required: false,
    default: [
      {
        username: "mike@mytiki.com",
        type: ALBERTSONS,
        isVerified: true,
      },
      {
        username: "mike@mytiki.com",
        type: CVS,
        isVerified: false,
      },
    ],
  },
});

const filtered = props.accounts?.filter(
  (account) => account.type.type === "RETAILER",
);
</script>

<template>
  <header-back
    text="Retailer Accounts"
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
