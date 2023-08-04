<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import AccountIcon from "@/components/icons/account-icon.vue";
import RedeemIcon from "@/components/icons/redeem-icon.vue";
import ScanIcon from "@/components/icons/scan-icon.vue";
import SquareButton from "@/components/buttons/square-button.vue";
import TextButton from "@/components/buttons/text-button.vue";
import { inject } from "vue";
import { TikiService } from "@/service/tiki-service";

const tiki: TikiService | undefined = inject("Tiki");
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
  <text-button
    text="Scan Receipt"
    :icon="ScanIcon"
    @click="tiki?.reward.scan()"
  />
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
