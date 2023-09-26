<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import { ReceiptAccount } from "../receipt/receipt-account";
import AccountStatus from "./account-status.vue";

defineEmits(["delete"]);
const props = defineProps({
  accounts: {
    type: Array<ReceiptAccount>,
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
}
</style>
