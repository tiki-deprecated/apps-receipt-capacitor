<script setup lang="ts">
import {
    HeaderBack, 
    CloCardDetails,
    CloCardAccounts
} from "../../../components";
</script>

<template>
    <div>
    <header-back text="Back" @back="$emit('back')" @close="$emit('close')"/>
    <h1>
        Monthly Estimate
    </h1>
    <clo-card-details />
    <p class="tiki-details-subtitle">Estimate calculated based on your spending
    history and available offers from eligible retailers.</p>
    <h1>Accounts</h1>
    <clo-card-accounts />
    </div>
</template>

<style scoped>
.tiki-details-subtitle{
    font-size: 0.85em;
    color: var(--tiki-secondary-text-color);
    font-weight: 500;
    margin: 1em;
}
</style>