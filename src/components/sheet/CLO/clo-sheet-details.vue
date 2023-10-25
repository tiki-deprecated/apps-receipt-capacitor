<script setup lang="ts">
import {
    HeaderBack, 
    CloCardDetails,
    CloCardAccounts,
    CloProgramDetails
} from "../../../components";
</script>

<template>
    <div class="tiki-scroll">
    <header-back text="Back" @back="$emit('back')" @close="$emit('close')"/>
    <h1>
        Monthly Estimate
    </h1>
    <clo-card-details />
    <p class="tiki-details-subtitle">Estimate calculated based on your spending
    history and available offers from eligible retailers.</p>
    <h1>Accounts</h1>
    <clo-card-accounts />
    <h1>Program Details</h1>
    <clo-program-details/>
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

.tiki-details-subtitle{
    font-size: 0.85em;
    color: var(--tiki-secondary-text-color);
    font-weight: 500;
    margin: 1em;
}
</style>