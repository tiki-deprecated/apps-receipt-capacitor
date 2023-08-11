<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import AccountIconOutline from "@/assets/icons/account-outline.svg";
import CrossMarkIconOutline from "@/assets/icons/cross-mark-outline.svg";
import AccountForm from "@/components/account/account-form.vue";
import HeaderBack from "@/components/header/header-back.vue";
import CircleButton from "@/components/buttons/circle-button.vue";
import AccountCarousel from "@/components/account/account-carousel.vue";
import TextButton from "@/components/buttons/text-button.vue";
import { ReceiptAccount } from "@/service/receipt/receipt-account";
import { ReceiptAccountType } from "@/service/receipt/receipt-account-type";
import { inject, ref } from "vue";
import { TikiService } from "@/service/tiki-service";

const tiki: TikiService | undefined = inject("Tiki");
defineEmits(["close", "back", "unlink"]);
const accounts = ref<ReceiptAccount[]>(tiki!.receipt.accounts);
tiki!.receipt.onAccount("account-link", (acc) => {
  accounts.value = tiki!.receipt.accounts;
});
const error = ref<string>();
const form = ref<ReceiptAccount>(
  new ReceiptAccount("", ReceiptAccountType.GMAIL, ""),
);
const submit = async () => {
  if (
    form.value.username != undefined &&
    form.value.password != undefined &&
    form.value.username?.length > 0 &&
    form.value.password?.length > 0
  ) {
    try {
      await tiki?.receipt.login(form.value);
      form.value = new ReceiptAccount("", ReceiptAccountType.GMAIL, "");
    } catch (err) {
      error.value = err;
    }
  }
};
</script>

<template>
  <header-back text="Rewards" @back="$emit('back')">
    <circle-button @click="$emit('close')" :icon="CrossMarkIconOutline" />
  </header-back>
  <account-form v-model:account="form" :error="error" />
  <p v-if="accounts.length > 0" class="linked-accounts">Linked Accounts</p>
  <account-carousel
    v-if="accounts.length > 0"
    :accounts="accounts"
    class="account-carousel"
    @click="$emit('unlink', $event)"
  />
  <text-button text="Link Account" :icon="AccountIconOutline" @click="submit" />
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
