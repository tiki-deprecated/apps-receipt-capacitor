<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import CrossMarkIconOutline from "@/components/icons/cross-mark-icon-outline.vue";
import CircleButton from "@/components/buttons/circle-button.vue";
import HeaderBack from "@/components/header/header-back.vue";
import AccountForm from "@/components/account/account-form.vue";
import AccountIconOutline from "@/components/icons/account-icon-outline.vue";
import TextButton from "@/components/buttons/text-button.vue";
import { inject, ref } from "vue";
import { Account } from "@/service/account";
import { AccountType } from "@/service/account-type";
import { TikiService } from "@/service/tiki-service";

const tiki: TikiService | undefined = inject("Tiki");
const emits = defineEmits(["back", "close"]);
const form = ref<Account>({
  username: "",
  password: "",
  type: AccountType.GMAIL,
});
const submit = async () => {
  await tiki?.account.logout(form.value);
  emits("back");
};
</script>

<template>
  <header-back text="Accounts" @back="$emit('back')">
    <circle-button @click="$emit('close')" :icon="CrossMarkIconOutline" />
  </header-back>
  <account-form v-model:account="form" />
  <text-button
    text="Unlink Account"
    :icon="AccountIconOutline"
    @click="submit"
  />
</template>
