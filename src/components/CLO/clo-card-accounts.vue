<script setup lang="ts">
import {IconAdd, IconAlert} from "@/assets/icons"
 import {
   accountTypes,
 } from "@mytiki/capture-receipt-capacitor";

const gmail = accountTypes.index.get("GMAIL")
const walmart = accountTypes.index.get("WALMART")
const amazon = accountTypes.index.get("AMAZON")
const dg = accountTypes.index.get("DOLLAR_GENERAL")

const accounts = [gmail, walmart, amazon, dg]
</script>

<template>
    <div class="tiki-card-accounts">
        <div class="image-container" v-for="account of accounts" @click="$emit('company', account)">
            <img :src="account.icon" alt=""  class="tiki-card-img">
            <icon-alert class="svg-icon"/>
        </div>
    </div>
</template>

<style scoped>
.image-container {
  position: relative;
}

.svg-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.tiki-card-accounts{
    background-color: var(--tiki-primary-background-color);
    box-sizing: border-box;
    border-radius: 0.625em;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 5%);
    border: 1px solid var(--tiki-secondary-text-color);
    align-items: center;
    font-weight: 500;
    margin-bottom: 1.2em;
    padding: 1.8em 0;
    display: flex;
    flex-wrap: wrap
}

.tiki-card-img{
    border-radius: 1.2em;
    padding: 0.5em 1em;
    width: 5.6em;
}
</style>