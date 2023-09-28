<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import { AccountCreds } from "@/components/account/account-creds";
import * as AccountTypes from "@/components/account/account-type";
import { ref, watch } from "vue";
import type { PropType } from "vue";

const emit = defineEmits(["update:account"]);
const props = defineProps({
  account: {
    type: Object as PropType<AccountCreds>,
    required: true,
  },
  error: {
    type: String,
    required: false,
  },
  accountType: {
    type: Object as PropType<AccountTypes.AccountType>,
    required: true,
  },
});

const username = ref<HTMLInputElement>();
const password = ref<HTMLInputElement>();

const update = () => {
  emit(
    "update:account",
    new AccountCreds(
      username.value?.value ?? "",
      props.accountType!,
      password.value?.value,
      true,
    ),
  );
};

watch(
  () => props.account,
  async (newValue) => {
    username.value!.value = newValue?.username ?? "";
    password.value!.value = newValue?.password ?? "";
  },
);

const errorMessage = ref(props.error);
watch(
  () => props.error,
  (newValue) => (errorMessage.value = newValue),
);
</script>

<template>
  <form>
    <label id="username">Username</label>
    <input
      type="text"
      autocomplete="false"
      id="username"
      ref="username"
      required
      @input="update"
    />
    <label id="password">Password</label>
    <input
      type="password"
      autocomplete="false"
      id="password"
      ref="password"
      required
      @input="update"
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

input:focus {
  outline: none;
}

label {
  display: block;
  font-size: var(--tiki-font-size);
  line-height: var(--tiki-line-height);
  font-weight: bold;
  color: var(--tiki-secondary-text-color);
  margin-bottom: 0.5em;
}
</style>
