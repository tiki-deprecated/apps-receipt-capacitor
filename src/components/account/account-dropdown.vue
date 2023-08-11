<script setup lang="ts">
import GmailIcon from "@/assets/images/gmail.png";
import type{ PropType } from "vue";
const props = defineProps({
  accounts: {
    type: Array,
    required: true,
  },
  error: {
    type: String,
    required: false,
  },
});

</script>

<template>
     <v-select :options="accounts" class="account-select">
      <template #option="option">
        <div>
          <img :src="GmailIcon" style=" width: 40px;">
          <span>{{ option.label }}</span>
        </div>     
      </template>
    </v-select>

</template>

<style>

.account-select .vs__search::placeholder,
.account-select .vs__dropdown-toggle,
.account-select .vs__dropdown-menu {
  text-transform: capitalize;
  width: 100%;
  font-size: var(--tiki-font-size-xl);
  line-height: var(--tiki-line-height-xl);
  font-weight: bold;
  color: var(--tiki-primary-text-color);
  padding: 0.6em 0.8em;
  background-color: var(--tiki-primary-background-color);
  border-radius: 0.5em;
  margin-bottom: 1.2em;
}

.account-select .vs__open-indicator {
  padding: 10px 30px 10px 10px;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyNSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEuMTgxODIgMi4wMTMxOEwxMi4yMzY0IDEyLjAxMzJMMjMgMi4wMTMxOCIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLW9wYWNpdHk9IjAuNiIgc3Ryb2tlLXdpZHRoPSIzIi8+Cjwvc3ZnPgo=");
  background-repeat: no-repeat, repeat;
  background-position:
    right 0.7em top 50%,
    0 0;
  background-size:
    0.65em auto,
    100%;
  margin-right: -20px;
}

.account-select .vs__clear{
 display: none;
}

.account-select .vs__dropdown-option--highlight{
  background-color: white;
  font-size: var(--tiki-font-size-xl);
  line-height: var(--tiki-line-height-xl);
  font-weight: bold;
  color: var(--tiki-primary-text-color);
  border-radius: 0.5em;
}


</style>