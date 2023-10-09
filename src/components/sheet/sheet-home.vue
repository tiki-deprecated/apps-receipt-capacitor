<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import {
  HeaderTitle,
  ButtonText,
  ButtonSquare,
  BulletList,
  ButtonTextState,
  BulletState,
} from "@/components";
import { inject, ref } from "vue";
import { InjectKey } from "@/utils";
import type { Store, Publish } from "@/service";
import type { Config } from "@/config";

const emit = defineEmits(["close", "learn", "retailer", "gmail", "withdraw"]);
const publish: Publish = inject(InjectKey.publish)!;
const store: Store = inject(InjectKey.store)!;
const config: Config = inject(InjectKey.config)!;
const syncState = (): BulletState =>
  (store.retailer.get().value === BulletState.P100 ||
    store.retailer.get().value === BulletState.SYNC) &&
  (store.gmail.get().value === BulletState.P100 ||
    store.gmail.get().value === BulletState.SYNC)
    ? store.sync.status()
    : BulletState.P0;

const receiptState = (): BulletState => store.receipt.status();
const balance = ref<number>(0);
publish.balance().then((amount) => (balance.value = amount));

const withdraw = () => {
  emit("withdraw");
  const res: number | undefined = config.callback(balance.value);
  if (res != undefined) {
    publish
      .createReceipt(res)
      .catch((error) =>
        console.log(`Failed to create withdrawal receipt: ${error}`),
      );
  }
};
</script>

<template>
  <div>
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
          :state="store.gmail.get().value"
          @click="$emit('gmail')"
        />
        <button-square
          text="Retailer"
          class="button"
          :state="store.retailer.get().value"
          @click="$emit('retailer')"
        />
      </div>
      <bullet-list
        :bullets="[
          {
            text: 'Connect Gmail Account',
            state:
              store.gmail.get().value === BulletState.NULL
                ? BulletState.P0
                : store.gmail.get().value,
          },
          {
            text: 'Connect Retailer Account',
            state:
              store.retailer.get().value === BulletState.NULL
                ? BulletState.P0
                : store.retailer.get().value,
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
      :state="
        balance > 0
          ? ButtonTextState.STANDARD
          : ButtonTextState.STANDARD_DISABLED
      "
      @click="withdraw"
    />
  </div>
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
