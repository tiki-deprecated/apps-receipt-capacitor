<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import ConfettiExplosion from "vue-confetti-explosion";
import { ref, inject, nextTick } from "vue";
import { TikiService } from "@/tiki-service";

const tiki: TikiService | undefined = inject("Tiki");

const amount = ref(tiki?.total ?? 0);
const partyTime = ref(false);
tiki!.onTotalChanged = async (val: number): Promise<void> => {
  if (val > amount.value) {
    partyTime.value = false;
    await nextTick();
    partyTime.value = true;
  }
  amount.value = val;
};
</script>

<template>
  <p class="reward-counter">
    {{ amount.toLocaleString("en", { useGrouping: true }) }} pts
  </p>
  <ConfettiExplosion class="confetti" v-if="partyTime" />
</template>

<style scoped>
.confetti {
  margin: auto;
}

.reward-counter {
  font-family: var(--tiki-font-family);
  font-size: calc(var(--tiki-font-size) * 3.625);
  font-weight: bold;
  color: var(--tiki-accent-color);
  line-height: 1.5em;
  text-align: center;
  margin: 0;
  padding: 0;
}
</style>
