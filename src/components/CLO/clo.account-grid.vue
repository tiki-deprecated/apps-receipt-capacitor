<script setup lang="ts">
import {IconAdd, IconAlert} from "@/assets/icons"
import { defineEmits } from 'vue';
 import {
   accountTypes,
 } from "@mytiki/capture-receipt-capacitor";

const accounts = accountTypes.index.values()

const emits = defineEmits(['closeGrid', 'company'])

let yDown: number | null = null;

function handleTouchStart(event: TouchEvent) {
  const firstTouch = event.touches[0];
  yDown = firstTouch.clientY;
}

const handleTouchEnd = (event: TouchEvent) =>{
    const finalTouch = event.changedTouches[0]
    let finalY = finalTouch.clientY;
    const scrollPosition = document.getElementById('grid-accounts')?.scrollTop
    if(yDown! < finalY && scrollPosition === 0) emits('closeGrid') 
}
</script>

<template>
    <div class="tiki-grid-accounts" id="grid-accounts" @touchstart="handleTouchStart" @touchend="handleTouchEnd">
        <h6 class="tiki-grid-title">Increase Earning</h6>
        <div @click="$emit('company', account)" v-for="account of accounts">
            <div class="image-container">
                <img :src="account.icon" alt="company icon" class="tiki-grid-img">
                <icon-add class="svg-icon"/>
            </div>
            <figcaption class="tiki-grid-caption">Add <br>{{ account.name }}</figcaption>
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

.tiki-grid-accounts{
    box-sizing: border-box;
    align-items: center;
    font-weight: 500;
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    justify-content: space-around;
    height: 90vh;
    overflow-y: scroll;
    overflow-x: scroll;
    flex: 1 1 auto;
}

.tiki-grid-img{
    border-radius: 1.2em;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 8%);
    margin: 1em 0;
}

.tiki-grid-caption{
    font-family: var(--tiki-font-family);
    color: var(--tiki-secondary-text-color);
    font-weight: 600;
    font-size: 0.75em;
    line-height: normal;
}

.tiki-grid-title{
    font-family: var(--tiki-font-family);
    font-weight: 600;
    font-size: 1.2em;
    margin: 0.6em;
    color: var(--tiki-primary-text-color);
    width: 100%;
    text-align: left;
}
</style>