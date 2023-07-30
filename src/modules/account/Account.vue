<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import CloseIcon from "@/components/icons/outline/CloseIcon.vue";
import CircleButton from "@/components/buttons/CircleButton.vue";
import BackButton from "@/components/buttons/BackButton.vue";
import AccountForm from "@/modules/account/AccountForm.vue";
import TextButton from "@/components/buttons/TextButton.vue";
import AccountIcon from "@/components/icons/outline/AccountIcon.vue";
import AccountCarousel from "@/modules/account/AccountCarousel.vue";

defineEmits(["close", "back"]);
</script>

<template>
  <div class="heading">
    <back-button text="Rewards" @click="$emit('back')" />
    <circle-button @click="$emit('close')" :icon="CloseIcon" />
  </div>
  <account-form />
  <p class="linked-accounts">Linked Accounts</p>
  <account-carousel class="account-carousel" />
  <text-button text="Link Account" :icon="AccountIcon" />
</template>

<style scoped>
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
