<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
</script>

<template>
    <div>
        <div class="tiki-offer-card">
            <span>Earn monthly</span>
            <span class="tiki-accent-text">$5 - $15</span>
            <span>for your shopping habits</span>
        </div>
        <p class="tiki-card-offer-description">
            Estimate based on similar users spending habits and market price for shopping data.
        </p>
    </div>
</template>

<style scoped>
.tiki-offer-card {
    width: 100%;
    background-color: var(--tiki-primary-background-color);
    box-sizing: border-box;
    border-radius: 0.625em;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 5%);
    border: 1px solid var(--tiki-secondary-text-color);
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1.2em;
    font-weight: 500;
    margin-top: 3em;
    margin-bottom: 2.3em;
    padding: 2.3em 0;
}

.tiki-accent-text {
    font-size: 2.5em;
    color: var(--tiki-success-color);
    font-weight: bold;
    margin: 0.5em 0 0.5em 0
}

.tiki-card-offer-description {
  font-family: var(--tiki-font-family);
  font-size: var(--tiki-font-size-sm);
  line-height: var(--tiki-line-height-sm);
  color: var(--tiki-secondary-text-color);
  font-weight: 500;
  margin: 2em 0.5em 2.5em 1.5em;
}
</style>