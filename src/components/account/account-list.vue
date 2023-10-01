<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
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
    <account-status
      :account="account"
      v-for="account in accounts"
      class="status"
      @delete="$emit('delete', account)"
    />
  </div>
</template>

<style scoped>
.list {
  overflow: scroll;
  font-size: var(--tiki-font-size);
}

.status {
  margin: 1em 0;
  padding: 0.5em;
}
</style>
