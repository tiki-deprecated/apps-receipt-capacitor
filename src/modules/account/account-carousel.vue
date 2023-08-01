<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide } from "vue3-carousel";
import type { Account } from "@/modules/account/account";
import AccountItem from "@/modules/account/account-item.vue";

defineProps({
  accounts: {
    type: Array<Account>,
    required: true,
  },
});
</script>

<template>
  <carousel :items-to-show="3.5" snapAlign="start">
    <slide v-for="account in accounts" :key="accounts">
      <account-item :account="account" />
    </slide>
  </carousel>
</template>
