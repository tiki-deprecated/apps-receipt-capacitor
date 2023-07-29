<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import BottomSheet from "@/components/tiki/element/BottomSheet.vue";
import CloseIcon from "@/components/tiki/icon/CloseIcon.vue";
import CircleButton from "@/components/tiki/element/CircleButton.vue";
import { ref } from "vue";
import BackButton from "@/components/tiki/element/BackButton.vue";
import AccountForm from "@/components/tiki/element/AccountForm.vue";
import TextButton from "@/components/tiki/element/TextButton.vue";
import AccountIconOutline from "@/components/tiki/icon/AccountIconOutline.vue";
import AccountCarousel from "@/components/tiki/element/AccountCarousel.vue";

const show = ref(true);
</script>

<template>
  <bottom-sheet @dismiss="$emit('close')" :show="show">
    <div class="body">
      <div class="heading">
        <back-button text="Rewards" />
        <circle-button @click="show = false" :icon="CloseIcon" />
      </div>
      <account-form />
      <p class="linked-accounts">Linked Accounts</p>
      <account-carousel class="account-carousel" />
      <text-button text="Link Account" :icon="AccountIconOutline" />
    </div>
  </bottom-sheet>
</template>

<style scoped>
.body {
  padding: 1.5em 1em 2.5em 1em;
  box-sizing: border-box;
}

.heading {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin: 0 0.5em 2em 0.5em;
}

.linked-accounts {
  font-family: var(--tiki-font-family);
  font-size: var(--tiki-font-size);
  line-height: var(--tiki-line-height);
  font-weight: bold;
  color: var(--tiki-primary-text-color);
  text-transform: uppercase;
  margin: 0;
}

.account-carousel {
  margin-bottom: 1em;
}
</style>
