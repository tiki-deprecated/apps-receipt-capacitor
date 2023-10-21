<script setup lang="ts">
import { Carousel, Slide } from 'vue-carousel';
 import {
   accountTypes,
 } from "@mytiki/capture-receipt-capacitor";

const accounts = accountTypes.index.values()
</script>

<template>
    <div>
        <h6 class="tiki-carousel-title">Increase Earning</h6>
        <carousel :paginationEnabled="false" class="tiki-carousel"> 
             <slide v-for="account of accounts" :key="account.id" class="tiki-carousel-slide">
                <img :src="account.icon" alt="company icon" class="tiki-carousel-img">
                <figcaption class="tiki-carousel-caption">Add <br>{{ account.name }}</figcaption>
            </slide>  
        </carousel>
    </div>
</template>

<style scoped>
.tiki-carousel-title{
    font-family: var(--tiki-font-family);
    font-weight: 700;
    font-size: 1.2em;
    margin: 0.6em
}

.tiki-carousel-slide{
    text-align: center;
}
.tiki-carousel-img{
    border-radius: 1em;
    width: 5em;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 5%);
}
.tiki-carousel-caption{
    font-family: var(--tiki-font-family);
    color: var(--tiki-secondary-text-color);
    font-weight: 600;
    font-size: 0.75em;
    line-height: normal;
}
.VueCarousel-slide{
    flex-basis: max-content;
    padding: 0.4em
}
</style>