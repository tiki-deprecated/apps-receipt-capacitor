<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import AccountIconOutline from "@/components/icons/account-icon-outline.vue";
import CrossMarkIconOutline from "@/components/icons/cross-mark-icon-outline.vue";
import AccountForm from "@/components/account/account-form.vue";
import HeaderBack from "@/components/header/header-back.vue";
import CircleButton from "@/components/buttons/circle-button.vue";
import AccountCarousel from "@/components/account/account-carousel.vue";
import TextButton from "@/components/buttons/text-button.vue";
import type { Account } from "@/service/account";
import { inject, ref } from "vue";
import { TikiService } from "@/service/tiki-service";
import { AccountType } from "@/service/account-type";

const tiki: TikiService | undefined = inject("Tiki");
defineEmits(["close", "back", "unlink"]);
const accounts = ref<Account[]>(tiki!.account.accounts);
tiki!.account.onChange = (acc) => {
  accounts.value = acc;
};

const form = ref<Account>({
  username: "",
  password: "",
  type: AccountType.GMAIL,
});
const submit = async () => {
  await tiki?.account.login(form.value);
  form.value = {
    username: "",
    password: "",
    type: AccountType.GMAIL,
  };
};
</script>

<template>
  <header-back text="Rewards" @back="$emit('back')">
    <circle-button @click="$emit('close')" :icon="CrossMarkIconOutline" />
  </header-back>
  <account-form v-model:account="form" />
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
