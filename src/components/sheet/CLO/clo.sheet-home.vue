<script setup lang="ts">
import {
  ButtonText,
  HeaderTitle,
  CloCardHome
} from "../../../components";
</script>

<template>
    <div>
        <header-title 
        title="Cashback Connections"
        subtitle="Share data. Earn rewards."
        @close="$emit('close')"    
        /> 
        <clo-card-home />
        
    </div>
</template>

<style scoped>

</style>