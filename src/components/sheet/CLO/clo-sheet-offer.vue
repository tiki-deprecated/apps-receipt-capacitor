<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->


<script setup lang="ts">
import {
  ButtonText,
  HeaderTitle,
} from "../../../components";
import {OfferImage} from "../../../assets/images"
import { defineEmits } from "vue";

defineEmits(["close", "accept"]);

</script>

<template>
    <div>
        <header-title 
        title="Cashback Connections"
        subtitle="Share data. Earn rewards."
        @close="$emit('close')"    
        />
        <img :src="OfferImage" alt="Offer Image" class="tiki-offer-image"/>
        <p>Estimate based on similar users spending habits and market price for shopping data.</p>
        <button-text text="Get estimate" @click="$emit('accept')" />
    </div>
</template>

<style scoped>
.tiki-offer-image {
    padding: 1em
}
</style>
