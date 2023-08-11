<script setup lang="ts">
import { AccountType, types } from "@/service/account-type";


</script>

<template>
<v-select :options="Object.values(AccountType)" id="accounts"></v-select>
</template>

<style scoped>
#accounts {
  text-transform: capitalize;
  width: 100%;
  font-size: var(--tiki-font-size-xl);
  line-height: var(--tiki-line-height-xl);
  font-weight: bold;
  color: var(--tiki-primary-text-color);
  padding: 0.6em 0.8em;
  background-color: var(--tiki-primary-background-color);
  border: none;
  border-radius: 0.5em;
  margin-bottom: 1.2em;
}


</style>