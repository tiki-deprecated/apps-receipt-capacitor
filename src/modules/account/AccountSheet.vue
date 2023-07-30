<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import AccountForm from "@/modules/account/AccountForm.vue";
import TextButton from "@/components/buttons/TextButton.vue";
import AccountIcon from "@/components/icons/outline/AccountIcon.vue";
import AccountCarousel from "@/modules/account/AccountCarousel.vue";
import { Account } from "@/modules/account/Account";
import { AccountType } from "@/modules/account/AccountType";
import HeaderBack from "@/components/HeaderBack.vue";
import CloseIcon from "@/components/icons/outline/CloseIcon.vue";
import CircleButton from "@/components/buttons/CircleButton.vue";

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
    <circle-button @click="$emit('close')" :icon="CloseIcon" />
  </header-back>
  <account-form />
  <p class="linked-accounts">Linked Accounts</p>
  <account-carousel :accounts="accounts" class="account-carousel" />
  <text-button text="Link Account" :icon="AccountIcon" />
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
