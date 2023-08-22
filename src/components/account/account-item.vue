<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import UnlinkIcon from "@/assets/icons/unlink.svg?component";
import type { PropType } from "vue";
import type { ReceiptAccount } from "@/service/receipt/receipt-account";

defineEmits(["click"]);
defineProps({
  account: {
    type: Object as PropType<ReceiptAccount>,
    required: true,
  },
});
</script>

<template>
  <div>
    <div class="account-button" role="button" @click="$emit('click', account)">
      <img :alt="account.accountType.name" :src="account.accountType.icon?" class="icon" />
      <div
        class="unlink"
        :class="account.isVerified ? 'verified' : 'notVerified'"
      >
        <unlink-icon class="account-item-icon" />
        {{ account.isVerified ? "Unlink" : "Error" }}
      </div>
    </div>
    <p class="username">{{ account.username }}</p>
  </div>
</template>

<style scoped>
.account-button {
  background-color: var(--tiki-primary-background-color);
  font-size: var(--tiki-font-size);
  border-radius: 0.625em;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 5%);
  display: block;
}

.icon {
  height: 2.75em;
  width: auto;
  margin: 1em 0 0.571em 0;
  border-radius: 0.625em;
}

.unlink {
  font-family: var(--tiki-font-family);
  font-size: var(--tiki-font-size-sm);
  line-height: var(--tiki-line-height-sm);
  font-weight: bold;
  display: flex;
  align-items: center;
  padding: 0 0.571em 0.571em 0.571em;
}

.account-item-icon {
  margin-right: 0.571em;
  height: 1.714em;
}

.verified {
  color: var(--tiki-secondary-text-color);
}

.notVerified {
  color: #c73000;
}

.username {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: var(--tiki-font-family);
  font-size: var(--tiki-font-size-xs);
  line-height: var(--tiki-line-height-xs);
  font-weight: 500;
  color: var(--tiki-secondary-text-color);
  width: 7.5em;
  display: block;
  margin: 0.5em 0;
}
</style>
