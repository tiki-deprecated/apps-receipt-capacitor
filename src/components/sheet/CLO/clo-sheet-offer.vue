<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->


<script setup lang="ts">
import {
  ButtonText,
  HeaderTitle,
  CloCardOffer
} from "../../../components";
import { defineEmits } from "vue";

defineEmits(["close", "accept"]);

</script>

<template>
    <div>
        <header-title 
        title="Cashback Connections"
        subtitle="Share data. Earn cash."
        @close="$emit('close')"    
        /> 
        <clo-card-offer />
        <button-text text="Get estimate" @click="$emit('accept')" />
    </div>
</template>

<style scoped>
</style>
