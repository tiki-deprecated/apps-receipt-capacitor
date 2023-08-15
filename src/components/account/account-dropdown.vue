<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import { ref, watch } from "vue";
import { icon } from "@/service/receipt/receipt-account-type";
const emits = defineEmits(["input"]);
const props = defineProps({
  accounts: {
    type: Array,
    required: true,
  },
});

const selectedAccount = ref<HTMLSelectElement>();

watch(selectedAccount, () => {
  emits("input", selectedAccount.value);
});
</script>

<template>
  <v-select
    :options="accounts"
    class="account-select"
    v-model="selectedAccount"
  >
    <template #option="option" v-slot:item="option">
      <img :alt="option.label" :src="icon(option.label)" style="width: 40px" />
      <span class="option-label">{{ option.label }}</span>
    </template>
  </v-select>
</template>

<style>
.account-select .vs__dropdown-toggle {
  border: none;
}
.account-select .vs__dropdown-menu {
  border-radius: 0.5em;
  padding: 5px 8px;
}
.account-select .vs__open-indicator {
  padding: 10px 30px 10px 10px;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-image: url("../../assets/icons/dropdown-arrow.svg");
  background-repeat: no-repeat, repeat;
  background-position:
    right 0.7em top 50%,
    0 0;
  background-size:
    0.65em auto,
    100%;
  margin-right: -20px;
}

.account-select .vs__clear {
  display: none;
}
.account-select .vs__dropdown-option {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  margin-left: -20px;
}
.account-select .option-label {
  flex: 1;
}
.account-select .vs__dropdown-option--highlight {
  background-color: var(--tiki-primary-background-color);
  font-size: var(--tiki-font-size-xl);
  line-height: var(--tiki-line-height-xl);
  font-weight: bold;
  color: var(--tiki-primary-text-color);
  border-radius: 0.5em;
}
</style>
