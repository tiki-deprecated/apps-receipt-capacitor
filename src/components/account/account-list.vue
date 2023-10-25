<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import { computed } from "vue";
import AccountStatus from "./account-status.vue";
import type { Account } from "@mytiki/capture-receipt-capacitor";

defineEmits(["delete"]);
defineProps({
  accounts: {
    type: Array<Account>,
    required: true,
  },
});
</script>

<template>
  <div class="list">
    <h1 v-if="accounts.length >= 1">{{ accounts.length > 1 ? 'Accounts' : 'Account'}}</h1>
    <account-status
      v-for="(account, index) in accounts"
      :key="index"
      :account="account"
      class="status"
      @delete="$emit('delete', account)"
    />
  </div>
</template>

<style scoped>
.list {
  font-size: var(--tiki-font-size);
}

.status {
  margin: 1em 0;
  padding: 0.5em;
}

h2 {
  margin: 1em 0;
}
</style>
