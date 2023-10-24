<script setup lang="ts">
import {
    HeaderBack, 
    CloCardCompany,
    AccountList
} from "../../../components";
import { defineProps, PropType } from "vue";
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
</script>

<template>
    <div>
        <header-back @close="$emit('close')" @back="$emit('back')" :text="company.name"/>
        <clo-card-company :company="company" subtitle="3% cashback on all purchases"/>   
        <account-list :accounts="filtered"/>
    </div>
</template>

<style scoped>
</style>