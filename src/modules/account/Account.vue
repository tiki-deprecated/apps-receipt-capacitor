<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import BottomSheet from "@/components/BottomSheet.vue";
import CloseIcon from "@/components/icons/outline/CloseIcon.vue";
import CircleButton from "@/components/buttons/CircleButton.vue";
import { ref } from "vue";
import BackButton from "@/components/buttons/BackButton.vue";
import AccountForm from "@/modules/account/AccountForm.vue";
import TextButton from "@/components/buttons/TextButton.vue";
import AccountIcon from "@/components/icons/outline/AccountIcon.vue";
import AccountCarousel from "@/modules/account/AccountCarousel.vue";

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
      <text-button text="Link Account" :icon="AccountIcon" />
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
