<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import { inject, ref } from "vue";
import LearnMore from "./assets/learn-more.md";
import Terms from "./assets/terms.md";
import { TikiReceipt } from "@mytiki/tiki-receipt-capacitor";
import { TikiSdk } from "../../../tiki-sdk-capacitor";

const tiki: TikiSdk | undefined = inject("TikiSdk");
tiki
  ?.initialize(
    "59a1cfe4-67c3-42d2-b21c-3414fc4859cf",
    "be19730a-00d5-45f5-b18e-2e19eb25f311",
  )
  .then((rsp) => {
    console.log(`id: ${rsp.id} | address: ${rsp.address}`);
  });

const present = ref(false);
</script>

<template>
  <header>
    <img
      alt="TIKI Icon"
      class="logo"
      src="./assets/logo.svg"
      width="125"
      height="125"
    />
  </header>

  <main>
    <div class="greetings">
      <h1>Oh, Hi!</h1>
      <h3>Just click &ldquo;start&rdquo; to well...</h3>
    </div>
    <button class="start" @click="present = !present">start</button>
    <tiki-receipt
      :offer="{
        image: './src/assets/offer-card.png',
        description:
          'Share your receipts to earn rewards like gift cards or cash!',
        bullets: [
          { text: 'De-identified (for your privacy)', isUsed: true },
          { text: 'Develop market insights', isUsed: false },
          { text: 'Deliver a more personalized experience ', isUsed: true },
        ],
      }"
      :terms="Terms"
      :learnMore="LearnMore"
      :rewards="[
        {
          image: './src/assets/offer-card.png',
          description:
            'Share your receipts to earn rewards like gift cards or cash!',
        },
        {
          image: './src/assets/offer-card.png',
          description:
            'Share your receipts to earn rewards like gift cards or cash!',
        },
        {
          image: './src/assets/offer-card.png',
          description:
            'Share your receipts to earn rewards like gift cards or cash!',
        },
      ]"
      v-model:present="present"
    />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

.start {
  width: fit-content;
  margin: 2em auto;
  display: block;
  padding: 0.5em 2em;
  border: #00b272 solid 1px;
  border-radius: 0.5em;
  background: #00b272;
  color: #ffffff;
  font-size: var(--tiki-font-size);
  font-weight: 500;
}

.start:active {
  opacity: 66%;
}

.greetings h1 {
  font-weight: 500;
  font-size: 1.25em;
  line-height: 1.75em;
  color: #00b272;
}

.greetings h3 {
  font-size: 1.25em;
  line-height: 1.75em;
  font-weight: normal;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}
</style>
