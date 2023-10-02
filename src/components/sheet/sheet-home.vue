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
import { getWeek } from "@/utils/week";

defineEmits(["close", "learn", "retailer", "gmail", "withdraw"]);
const tiki: TikiService | undefined = inject("Tiki");
const syncState = (): BulletState => {
  if (
    (tiki!.store.retailer.get().value === BulletState.P100 ||
      tiki!.store.retailer.get().value === BulletState.SYNC) &&
    (tiki!.store.gmail.get().value === BulletState.P100 ||
      tiki!.store.gmail.get().value === BulletState.SYNC)
  ) {
    const count: number = tiki!.store.sync.countWeeks();
    switch (count) {
      case 0:
        return BulletState.P0;
      case 1:
        return BulletState.P25;
      case 2:
        return BulletState.P50;
      case 3:
        return BulletState.P75;
      default:
        return BulletState.P100;
    }
  } else return BulletState.P0;
};

const receiptState = (): BulletState => {
  const cur = getWeek();
  const count = tiki!.store.receipt.count({
    startWeek: cur - 4,
    endWeek: cur + 1,
  });
  switch (count) {
    case 0:
      return BulletState.P0;
    case 1:
      return BulletState.P20;
    case 2:
      return BulletState.P40;
    case 3:
      return BulletState.P60;
    case 4:
      return BulletState.P80;
    default:
      return BulletState.P100;
  }
};
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
        :state="tiki!.store.gmail.get().value"
        @click="$emit('gmail')"
      />
      <button-square
        text="Retailer"
        class="button"
        :state="tiki!.store.retailer.get().value"
        @click="$emit('retailer')"
      />
    </div>
    <bullet-list
      :bullets="[
        {
          text: 'Connect Gmail Account',
          state:
            tiki!.store.gmail.get().value === BulletState.NULL
              ? BulletState.P0
              : tiki!.store.gmail.get().value,
        },
        {
          text: 'Connect Retailer Account',
          state:
            tiki!.store.retailer.get().value === BulletState.NULL
              ? BulletState.P0
              : tiki!.store.retailer.get().value,
        },
        {
          text: 'Use app weekly',
          state: syncState(),
        },
        {
          text: 'Share 5 New Receipts',
          state: receiptState(),
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
