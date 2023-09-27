<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import IconCrossMark from "@/assets/icons/crossmark-outline.svg?component";
import ButtonIcon from "@/components/button/button-icon.vue";
import HeaderTitle from "@/components/header/header-title.vue";
import { BulletState } from "@/components/bullet/bullet-state";
import BulletList from "@/components/bullet/bullet-list.vue";
import ButtonSquare from "@/components/button/button-square.vue";
import TextButton from "@/components/button/button-text.vue";

defineEmits(["close", "history", "account"]);
defineProps({
  rewards: {
    type: Array<Object>,
    required: true,
  },
});
const milestoneBullets = [
  {
    text: "Connect Gmail Account",
    state: BulletState.P0,
  },
  {
    text: "Connect Retailer Account",
    state: BulletState.P25,
  },
  {
    text: "Use app weekly",
    state: BulletState.P75,
  },
  {
    text: "Share 5 New Receipts",
    state: BulletState.P100,
  },
];
</script>

<template>
  <header-title
    title="Rewards"
    subtitle="Share data. Earn rewards."
    class="title"
  >
    <button-icon @click="$emit('close')" :icon="IconCrossMark" />
  </header-title>
  <div class="body">
    <div class="accounts">
      <button-square
        text="Gmail"
        class="button"
        @click="$emit('accountGmail')"
        :state="BulletState.SYNC"
      />
      <button-square
        text="Retailer"
        class="button"
        @click="$emit('accountRetailer')"
        :state="BulletState.NULL"
      />
    </div>
    <bullet-list
      :bullets="milestoneBullets"
      class="bullets"
      @learn="$emit('learn')"
    />
  </div>
  <button-text text="$1 Cash Out" class="cash" />
</template>

<style scoped>
.title {
  margin-bottom: 1.25em;
}
.body {
  padding: 1.25em 0;
  margin: auto;
}
.cash {
  margin-top: 1.25em;
}

.accounts {
  display: flex;
  align-items: start;
  margin: 0 auto 1em auto;
  width: fit-content;
}

.accounts .button {
  margin: 0 1em;
}

.bullets {
  margin: 2em auto 2em auto;
  width: fit-content;
}
</style>
