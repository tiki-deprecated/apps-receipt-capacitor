<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import type { Reward } from "@/service/config";
import IconCrossMark from "@/assets/icons/crossmark-outline.svg?component";
import IconButton from "@/components/buttons/icon-button.vue";
import HeaderTitle from "@/components/header/header-title.vue";
import { BulletState } from "@/components/bullet/bullet-state";
import BulletList from "@/components/bullet/bullet-list.vue";
import SquareButton from "@/components/buttons/square-button.vue";
import TextButton from "@/components/buttons/text-button.vue";

defineEmits(["close", "history", "account"]);
defineProps({
  rewards: {
    type: Array<Reward>,
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
    <icon-button @click="$emit('close')" :icon="IconCrossMark" />
  </header-title>
  <div class="body">
    <div class="accounts">
      <square-button
        text="Gmail"
        class="button"
        @click="$emit('accountGmail')"
        :state="BulletState.SYNC"
      />
      <square-button
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
  <text-button text="$1 Cash Out" class="cash" />
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
