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
import { inject, ref } from "vue";

const emit = defineEmits(["close", "learn", "retailer", "gmail", "withdraw"]);
const tiki: TikiService | undefined = inject("Tiki");
const syncState = (): BulletState =>
  (tiki!.store.retailer.get().value === BulletState.P100 ||
    tiki!.store.retailer.get().value === BulletState.SYNC) &&
  (tiki!.store.gmail.get().value === BulletState.P100 ||
    tiki!.store.gmail.get().value === BulletState.SYNC)
    ? tiki!.store.sync.status()
    : BulletState.P0;

const receiptState = (): BulletState => tiki!.store.receipt.status();
const balance = ref<number>(0);
tiki?.publish.balance().then((amount) => (balance.value = amount));

const withdraw = () => {
  emit("withdraw");
  const res: number | undefined = tiki?.config.callback(balance.value);
  if (res != undefined) {
    tiki?.publish
      .createReceipt(res)
      .catch((error) =>
        console.log(`Failed to create withdrawl receipt: ${error}`),
      );
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
    :text="balance > 0 ? `$${balance} Cash Out` : 'No Balance, Yet'"
    class="cash"
    :state="balance > 0 ? ButtonTextState.STANDARD : ButtonTextState.DISABLED"
    @click="withdraw"
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
