<script setup lang="ts">
import { AccountType } from '@mytiki/capture-receipt-capacitor';
import { PropType, defineProps } from 'vue';

defineProps({
    company: {
        type: Object as PropType<AccountType>,
        required: true,
    },
    subtitle: {
        type: String,
        required: true
    }
})
</script>

<template>
    <div class="tiki-company-card">
        <img :src="company.icon" alt="">
        <h1>{{ company.name }}</h1>
        <p>{{ subtitle }}</p>
    </div>
</template>

<style scoped>
.tiki-company-card {
    background-color: var(--tiki-primary-background-color);
    box-sizing: border-box;
    border-radius: 0.625em;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 5%);
    border: 1px solid var(--tiki-secondary-text-color);
    display: flex;
    align-items: center;
    font-weight: 500;
    flex-direction: column;
    margin-top: 1em;
    padding: 1.8em 0;
}

.tiki-company-card img {
    border-radius: 1em;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 8%);
}

.tiki-company-card h1 {
    margin: 1em 0 0 0;
}

.tiki-company-card p {
    color: var(--tiki-secondary-text-color);
    font-weight: 500;
    margin-bottom: 0.8em;
    text-align: center;
    padding: 0 1.2em;
}
</style>