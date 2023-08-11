<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import UnlinkIcon from "@/components/icons/unlink-icon.vue";
import ErrorIcon from "@/components/icons/error-icon.vue";
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
      <img :alt="account.type" :src="icon(account.type)" class="icon" />
      <div class="unlink" :class="account.verified ? '' : 'unsync-text'">
        <unlink-icon class="account-item-icon" v-if="account.verified" />
        <error-icon class="account-item-icon" v-else />
        {{ account.verified ? "Unlink" : "Error" }}
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
  color: var(--tiki-secondary-text-color);
  display: flex;
  align-items: center;
  padding: 0 0.571em 0.571em 0.571em;
}

.account-item-icon {
  margin-right: 0.571em;
  height: 1.714em;
}
.unsync-text {
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
