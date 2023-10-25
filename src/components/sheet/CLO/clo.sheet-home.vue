<script setup lang="ts">
import { AccountType } from "@mytiki/capture-receipt-capacitor";
import { defineEmits } from "vue";
import {
  HeaderTitle,
  CloCardHome,
  CloCarousel
} from "../../../components";

const emits = defineEmits(['close', 'details', 'company'])

const companyNavigation = (company: AccountType) =>{
  emits('company', company)
}
</script>

<template>
    <div>
        <header-title 
        title="Cashback Connections"
        subtitle="Share data. Earn rewards."
        @close="$emit('close')"    
        /> 
        <clo-card-home @details="$emit('details')"/>
        <clo-carousel @company="companyNavigation"/>
    </div>
</template>

<style scoped>

</style>