<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import AccountForm from "@/modules/account/account-form.vue";
import TextButton from "@/components/buttons/text-button.vue";
import AccountIconOutline from "@/components/icons/account-icon-outline.vue";
import AccountCarousel from "@/modules/account/account-carousel.vue";
import { Account } from "@/modules/account/account";
import { AccountType } from "@/modules/account/account-type";
import HeaderBack from "@/components/header-back.vue";
import CircleButton from "@/components/buttons/circle-button.vue";
import CrossMarkIconOutline from "@/components/icons/cross-mark-icon-outline.vue";

defineEmits(["close", "back"]);

const accounts: Array<Account> = [
  {
    type: AccountType.GMAIL,
    username: "mike@mytiki.com",
  },
  {
    type: AccountType.GMAIL,
    username: "mike@mytiki.com",
  },
  {
    type: AccountType.GMAIL,
    username: "mike@mytiki.com",
  },
  {
    type: AccountType.GMAIL,
    username: "mike@mytiki.com",
  },
];
</script>

<template>
  <header-back text="Rewards" @back="$emit('back')">
    <circle-button @click="$emit('close')" :icon="CrossMarkIconOutline" />
  </header-back>
  <account-form />
  <p class="linked-accounts">Linked Accounts</p>
  <account-carousel :accounts="accounts" class="account-carousel" />
  <text-button text="Link Account" :icon="AccountIconOutline" />
</template>

<style scoped>
.linked-accounts {
  font-family: var(--tiki-font-family);
  font-size: var(--tiki-font-size);
  line-height: var(--tiki-line-height);
  font-weight: bold;
  color: var(--tiki-primary-text-color);
  text-transform: uppercase;
  margin: 0;
}

.account-carousel {
  margin-bottom: 1em;
}
</style>
