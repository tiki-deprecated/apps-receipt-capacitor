<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import {
  ReceiptAccount,
} from "@/service/receipt/receipt-account";
import { ReceiptAccountType } from "@/service/receipt/receipt-account-type";
import { inject, ref, watch } from "vue";
import type { PropType } from "vue";
import { TikiService } from "@/service/tiki-service";
import AccountDropdown from "./account-dropdown.vue";

const emit = defineEmits(["update:account"]);
const props = defineProps({
  account: {
    type: Object as PropType<ReceiptAccount>,
    required: true,
  },
  error: {
    type: String,
    required: false,
  },
});
const tiki: TikiService | undefined = inject("Tiki");
const username = ref<HTMLInputElement>();
const password = ref<HTMLInputElement>();
const account = ref<string>();

const update = () => {
  emit(
    "update:account",
    ReceiptAccount.fromValue(
      username.value?.value ?? "",
      account.value ?? ReceiptAccountType.GMAIL,
      password.value?.value
    )
  );
};

watch(
  () => props.account,
  async (newValue) => {
    username.value!.value = newValue?.username ?? "";
    password.value!.value = newValue?.password ?? "";
    account.value = newValue?.type ?? ReceiptAccountType.GMAIL;
  }
);

const errorMessage = ref(props.error);
watch(
  () => props.error,
  (newValue) => (errorMessage.value = newValue)
);

const handleAccountValue = (accountSelected: string) => {
  account.value = accountSelected;
};
</script>

<template>
  <form>
    <label for="accounts">Choose Account</label>
    <account-dropdown
      id="accounts"
      :account="account"
      required
      v-model="account"
      @selectAccount="handleAccountValue"
    />
    <label id="username">Username</label>
    <input
      type="text"
      autocomplete="false"
      id="username"
      ref="username"
      required
      @change="update"
    />
    <label id="password">Password</label>
    <input
      type="password"
      autocomplete="false"
      id="password"
      ref="password"
      required
      @change="update"
    />
    <div class="error">
      <p class="error-message" v-if="error">{{ error }}</p>
    </div>
  </form>
</template>

<style scoped>
form {
  font-family: var(--tiki-font-family);
  box-sizing: border-box;
}

label {
  display: block;
}

span {
  display: flex;
  align-items: center;
}

#accounts {
  text-transform: capitalize;
  width: 100%;
  font-size: var(--tiki-font-size-xl);
  line-height: var(--tiki-line-height-xl);
  font-weight: bold;
  color: var(--tiki-primary-text-color);
  padding: 0.6em 0.8em;
  background-color: var(--tiki-primary-background-color);
  border: solid black 1px;
  border-radius: 0.5em;
  margin-bottom: 1.2em;
}
input {
  width: 100%;
  font-size: var(--tiki-font-size-xl);
  line-height: var(--tiki-line-height-xl);
  font-weight: bold;
  color: var(--tiki-primary-text-color);
  padding: 0.6em 0.8em;
  background-color: var(--tiki-primary-background-color);
  border: none;
  border-radius: 0.5em;
  box-sizing: border-box;
  margin-bottom: 1.2em;
}

.error {
  font-family: var(--tiki-font-family);
  font-size: var(--tiki-font-size);
  margin: 0 0 2em 0;
  color: #c73000;
  text-align: center;
  font-weight: 500;
}

.error-message {
  margin: 0;
  line-height: 0;
}

input:focus,
select:focus {
  outline: none;
}

label {
  font-size: var(--tiki-font-size);
  line-height: var(--tiki-line-height);
  font-weight: bold;
  color: var(--tiki-secondary-text-color);
  margin-bottom: 0.5em;
}
</style>
