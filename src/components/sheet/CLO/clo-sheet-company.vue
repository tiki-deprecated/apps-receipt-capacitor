<script setup lang="ts">
import {
    HeaderBack, 
    CloCardCompany,
    AccountList,
    AccountForm,
    ButtonText,
    ButtonTextState,
} from "../../../components";
import { defineProps, PropType, ref, computed } from "vue";
import { AccountType } from "@mytiki/capture-receipt-capacitor";
import { Account, accountTypes} from "@mytiki/capture-receipt-capacitor";

const props = defineProps({
    company: {
        type: Object as PropType<AccountType>,
        required: true
    }
})

const accounts: Account[] = [
    {
        username: 'howdymaudi@gmail.com',
        password: '',
        type: accountTypes.index.get('GMAIL')!,
        isVerified: true,
    },
    {
        username: 'howdymaudi@gmail.com',
        password: '',
        type: accountTypes.index.get('GMAIL')!,
        isVerified: true,
    },
    {
        username: 'howdymaudi@gmail.com',
        password: '',
        type: accountTypes.index.get('WALMART')!,
        isVerified: true,
    },
    {
        username: 'miro@mytiki.com',
        password: '',
        type: accountTypes.index.get('WALMART')!,
        isVerified: false,
    }
]
const filtered = accounts.filter((account)=> account.type.id === props.company.id)
const form = ref<Account>({ username: "", password: "", type: props.company });

const canSubmit = computed(
  () =>
    form.value.username != undefined &&
    form.value.password != undefined &&
    form.value.username?.length > 0 &&
    form.value.password?.length > 0,
);

const isLoading = ref<boolean>(false);

const updateAccount = (account: Account) => (form.value = account);

</script>

<template>
    <div class="tiki-scroll">
        <header-back @close="$emit('close')" @back="$emit('back')" :text="company.name"/>
        <clo-card-company :company="company" subtitle="When you connect your Gmail account, we auto-identify receipts and process available cashback rewards"/>   
        <account-list :accounts="filtered"/>
        <account-form 
        :accountType="company" 
        :account="form"
        @update:account="updateAccount"
        />
        <button-text
            text="Sign in"
            :state="
                isLoading
                ? ButtonTextState.STANDARD_LOADING
                : canSubmit
                ? ButtonTextState.STANDARD
                : ButtonTextState.STANDARD_DISABLED
            "
            :is-loading="isLoading"
            @click=""
        />
    </div>
</template>

<style scoped>
.tiki-scroll {
  display: flex;
  flex-flow: column;
  height: 90vh;
  overflow-y: scroll;
  overflow-x: scroll;
  flex: 1 1 auto;
}

</style>