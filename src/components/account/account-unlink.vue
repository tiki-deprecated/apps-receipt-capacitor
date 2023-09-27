<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import CrossMarkIconOutline from "@/assets/icons/cross-mark-outline.svg?component";
import IconButton from "@/components/buttons/icon-button.vue";
import HeaderBack from "@/components/header/header-back.vue";
import AccountForm from "@/components/account/account-form.vue";
import TextButton from "@/components/buttons/text-button.vue";
import { inject, ref } from "vue";
import { ReceiptAccount } from "@/service/receipt/receipt-account";
import { AccountTypeCommom } from "@/service/receipt/receipt-account-type";
import { TikiService } from "@/service/tiki-service";

const tiki: TikiService | undefined = inject("Tiki");
const emits = defineEmits(["back", "close"]);
const props = defineProps({
  accountType:{
    type: String,
    required: true
  }
})
const error = ref<string>();

  const form = ref<ReceiptAccount>( props.accountType === 'Gmail' ?
  new ReceiptAccount("", AccountTypeCommom.GMAIL, "") :
  new ReceiptAccount("", AccountTypeCommom.AMAZON, "")
  )
const submit = async () => {
  if (
    form.value.username != undefined &&
    form.value.password != undefined &&
    form.value.username?.length > 0 &&
    form.value.password?.length > 0
  ) {
    try {
      await tiki?.receipt.logout(form.value);
      emits("back");
    } catch (err: any) {
      error.value = err.toString();
    }
  }
};
</script>

<template>
  <header-back :text="`Remove ${accountType}`" @back="$emit('back')">
    <icon-button @click="$emit('close')" :icon="CrossMarkIconOutline" />
  </header-back>
  <account-form v-model:account="form" :accountType="accountType"/>
  <text-button :text="`Remove ${accountType}`" @click="submit" />
</template>
