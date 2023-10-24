<script setup lang="ts">
import {
    HeaderBack, 
    CloCardCompany
} from "../../../components";
import { defineProps, PropType } from "vue";
import { AccountType } from "@mytiki/capture-receipt-capacitor";

const props = defineProps({
    company: {
        type: Object as PropType<AccountType>,
        required: true
    }
})

</script>

<template>
    <div>
        <header-back @close="$emit('close')" @back="$emit('back')" :text="company.name"/>
        <clo-card-company :company="company" subtitle="3% cashback on all purchases"/>
    </div>
</template>

<style scoped>
</style>