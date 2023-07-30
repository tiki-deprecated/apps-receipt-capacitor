<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import AccountIcon from "@/components/icons/solid/AccountIcon.vue";
import RedeemIcon from "@/components/icons/outline/RedeemIcon.vue";
import ScanIcon from "@/components/icons/outline/ScanIcon.vue";
import SquareButton from "@/components/buttons/SquareButton.vue";
import TextButton from "@/components/buttons/TextButton.vue";

defineEmits(["account"]);
</script>

<template>
  <div class="button-row">
    <square-button
      :icon="AccountIcon"
      text="Link Accounts"
      class="account-icon"
      @click="$emit('account')"
    />
    <square-button :icon="RedeemIcon" text="Redeem Points" />
  </div>
  <text-button text="Scan Receipt" :icon="ScanIcon" />
</template>

<style scoped>
.button-row {
  display: flex;
  align-items: start;
  margin: 2em auto;
  width: fit-content;
}

.account-icon {
  margin-right: 3.125em;
}
</style>
