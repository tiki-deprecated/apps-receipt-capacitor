<script setup lang="ts">
import { Carousel, Slide } from 'vue-carousel';
import {IconAdd, IconAlert} from "@/assets/icons"
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
                <div class="image-container" @click="$emit('company', account)">
                    <img :src="account.icon" alt="company icon" class="tiki-carousel-img" 
                    >
                    <icon-add class="svg-icon"/>
                </div>
                <figcaption class="tiki-carousel-caption">Add <br>{{ account.name }}</figcaption>
            </slide>  
        </carousel>
    </div>
</template>

<style scoped>
.tiki-carousel-title{
    font-family: var(--tiki-font-family);
    font-weight: 600;
    font-size: 1.2em;
    margin: 0.6em
}
.image-container {
  position: relative;
}
.tiki-carousel-slide{
    text-align: center;
}
.tiki-carousel-img{
    border-radius: 1em;
    width: 5em;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 5%);
}
.svg-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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