<script setup lang="ts">
import {
  HeaderTitle,
  CloCardHome,
  CloCarousel
} from "../../../components";

</script>

<template>
    <div>
        <header-title 
        title="Cashback Connections"
        subtitle="Share data. Earn rewards."
        @close="$emit('close')"    
        /> 
        <clo-card-home @details="$emit('details')"/>
        <clo-carousel />
    </div>
</template>

<style scoped>

</style>