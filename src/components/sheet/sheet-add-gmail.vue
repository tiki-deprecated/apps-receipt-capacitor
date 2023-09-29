<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import AccountForm from "../account/account-form.vue";
import HeaderBack from "@/components/header/header-back.vue";
import TextButton from "@/components/button/button-text.vue";
import { type Account, GMAIL } from "@mytiki/capture-receipt-capacitor";
import { computed, ref, inject } from "vue";
import { TikiService } from "@/service/tiki-service";
import { ButtonTextState } from "@/components/button/button-text-state";

const emit = defineEmits(["close", "back"]);
const tiki: TikiService | undefined = inject("Tiki");

const form = ref<Account>({ username: "", password: "", type: GMAIL });
const error = ref<string>();

const canSubmit = computed(
  () =>
    form.value.username != undefined &&
    form.value.password != undefined &&
    form.value.username?.length > 0 &&
    form.value.password?.length > 0,
);

const submit = async () => {
  try {
    await tiki!.capture.login(form.value);
    error.value = "";
    form.value = { username: "", password: "", type: GMAIL };
    emit("back");
  } catch (err: any) {
    error.value = err.toString();
  }
};
</script>

<template>
  <header-back text="Add Gmail" @back="$emit('back')" @close="$emit('close')" />
  <account-form
    v-model:account="form"
    :error="error"
    :account-type="form.type"
  />
  <text-button
    text="Connect Gmail"
    @click="submit"
    :state="canSubmit ? ButtonTextState.STANDARD : ButtonTextState.DISABLED"
  />
</template>
