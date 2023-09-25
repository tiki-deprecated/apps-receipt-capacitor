<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import AccountIcon from "@/assets/icons/account.svg?component";
import RedeemIcon from "@/assets/icons/redeem.svg?component";
import ScanIcon from "@/assets/icons/scan.svg?component";
import SquareButton from "@/components/buttons/square-button.vue";
import TextButton from "@/components/buttons/text-button.vue";
import { inject } from "vue";
import { TikiService } from "@/service/tiki-service";

const tiki: TikiService | undefined = inject("Tiki");
const emit = defineEmits(["account", "redeem"]);

const redeem = () => {
  tiki!.history.redeem();
  emit("redeem");
};
</script>

<template>
  <div class="button-row">
    <square-button
      :icon="AccountIcon"
      text="Link Accounts"
      class="account-icon"
      @click="$emit('account')"
    />
    <square-button :icon="RedeemIcon" text="Redeem Points" @click="redeem" />
  </div>
  <text-button text="Scan Receipt" @click="tiki?.receipt.scan('PHYSICAL')" />
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
