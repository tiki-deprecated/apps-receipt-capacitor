<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import type { Account, AccountType } from "@mytiki/capture-receipt-capacitor";
import { ref, watch } from "vue";
import type { PropType } from "vue";

const emit = defineEmits(["update:account"]);
const props = defineProps({
  account: {
    type: Object as PropType<Account>,
    required: true,
  },
  error: {
    type: String,
    required: false,
    default: undefined,
  },
  accountType: {
    type: Object as PropType<AccountType>,
    required: true,
  },
});

const username = ref<HTMLInputElement>();
const password = ref<HTMLInputElement>();
const update = () => {
  const account: Account = {
    username: username.value?.value ?? "",
    type: props.accountType!,
    password: password.value?.value,
    isVerified: true,
  };
  emit("update:account", account);
};

watch(
  () => props.account,
  async (newValue) => {
    username.value!.value = newValue?.username ?? "";
    password.value!.value = newValue?.password ?? "";
  }
);

const errorMessage = ref(props.error);

watch(
  () => props.error,
  (newValue) => (errorMessage.value = newValue)
);
</script>

<template>
  <div>
    <h1>Add Account</h1>
    <form>
      <label id="username">Email</label>
      <input
        id="username"
        ref="username"
        type="text"
        autocomplete="false"
        required
        @input="update"
      />
      <label id="password">Password</label>
      <input
        id="password"
        ref="password"
        type="password"
        autocomplete="false"
        required
        @input="update"
      />
      <div class="error" >
        <p class="error-message" v-if="errorMessage">{{ errorMessage }}</p>
      </div>
    </form>
  </div>
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
  border: 1px solid var(--tiki-primary-text-color);
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
  margin-bottom: 0.3em;
}

h1 {
  margin: 1em 0;
}
</style>
