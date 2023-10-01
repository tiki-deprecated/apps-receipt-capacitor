<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import HeaderTitle from "@/components/header/header-title.vue";
import ButtonText from "@/components/button/button-text.vue";
import ButtonSquare from "@/components/button/button-square.vue";
import BulletList from "@/components/bullet/bullet-list.vue";
import { ButtonTextState } from "@/components/button/button-text-state";
import { BulletState } from "@/components/bullet/bullet-state";
import type { TikiService } from "@/service";
import { inject } from "vue";

defineEmits(["close", "learn", "retailer", "gmail", "withdraw"]);
const tiki: TikiService | undefined = inject("Tiki");
</script>

<template>
  <header-title
    title="Rewards"
    subtitle="Share data. Earn rewards."
    @close="$emit('close')"
  />
  <div class="body">
    <div class="accounts">
      <button-square
        text="Gmail"
        class="button"
        :state="tiki!.store.gmail.value"
        @click="$emit('gmail')"
      />
      <button-square
        text="Retailer"
        class="button"
        :state="BulletState.NULL"
        @click="$emit('retailer')"
      />
    </div>
    <bullet-list
      :bullets="[
        {
          text: 'Connect Gmail Account',
          state: tiki!.store.gmail.value,
        },
        {
          text: 'Connect Retailer Account',
          state: BulletState.P25,
        },
        {
          text: 'Use app weekly',
          state: BulletState.P75,
        },
        {
          text: 'Share 5 New Receipts',
          state: BulletState.P100,
        },
      ]"
      class="bullets"
      @learn="$emit('learn')"
    />
  </div>
  <button-text
    text="$1 Cash Out"
    class="cash"
    :state="ButtonTextState.DISABLED"
    @click="$emit('withdraw')"
  />
</template>

<style scoped>
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
