<script setup lang="ts">
import  type {AccountType} from "@/service/receipt/receipt-account-type";
import { AccountTypeCommom } from "@/service/receipt/receipt-account-type";
import { onMounted, ref, watch } from "vue";
import type { PropType } from "vue";


defineEmits(['update'])
const props = defineProps({
    account:{
        type: Object as PropType<AccountType>,
        required: true
    }
})
const account = ref<HTMLSelectElement>()
onMounted(()=>{
    account.value!.value = props.account.name;
})

</script>

<template>
    <label for="accounts" >Choose Account</label>
    <select id="accounts" required @change="$emit('update', account)" ref="account">
      <option v-for="account of Object.values(AccountTypeCommom)" :value="account.name" :label="account.name" :selected="account.name">
      </option>
    </select>
</template>

<style>
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

select {
  padding: 10px 30px 10px 10px;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
  background-repeat: no-repeat, repeat;
  background-position:
    right 0.7em top 50%,
    0 0;
  background-size:
    0.65em auto,
    100%;
}

select:focus {
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