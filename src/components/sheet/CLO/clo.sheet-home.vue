<script setup lang="ts">
import { AccountType } from "@mytiki/capture-receipt-capacitor";
import { defineEmits, ref } from "vue";
import {
  HeaderTitle,
  CloCardHome,
  CloCarousel, 
  CloAccountGrid
} from "../../../components";

const emits = defineEmits(['close', 'details', 'company'])

const companyNavigation = (company: AccountType) =>{
  emits('company', company)
}

const showAccountGrid = ref<boolean>(false)
</script>

<template>
    <div>
        <div v-if="!showAccountGrid">
          <header-title 
          title="Cashback Connections"
          subtitle="Share data. Earn cash."
          @close="$emit('close')"    
          /> 
          <clo-card-home @details="$emit('details')"/>
          <clo-carousel @company="companyNavigation" @swipeUp="showAccountGrid = true"/>
        </div>
        <clo-account-grid @closeGrid="showAccountGrid = false" v-else/>
    </div>
</template>

<style scoped>

</style>