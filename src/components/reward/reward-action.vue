<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import CrossMark from "@/assets/icons/cross-mark-outline.svg?component"
import SquareButton from "@/components/buttons/square-button.vue";
import TextButton from "@/components/buttons/text-button.vue";
import ProgramDataUse from "@/components/program/program-data-use.vue";
import { inject } from "vue";
import { TikiService } from "@/service/tiki-service";
import { BulletState } from "../bullet/bullet-state";

const tiki: TikiService | undefined = inject("Tiki");
const emit = defineEmits(["account", "redeem"]);


const milestoneBullets = [
  {
  text: 'Connect Gmail Account',
  state: BulletState.P0
  },
  {
  text: 'Connect Retailer Account',
  state: BulletState.SYNC
  },
  {
  text: 'Use app weekly',
  state: BulletState.ERROR
  },
  {
  text: 'Share 5 New Receipts',
  state: BulletState.NULL
  }
]

</script>

<template>
  <div class="button-row">
    <square-button
      :icon="CrossMark"
      text="Gmail"
      class="account-icon"
      @click="$emit('accountGmail')"
      :state="BulletState.SYNC"
    />
    <square-button :icon="CrossMark" text="Retailer" @click="$emit('accountRetailer')" :state="BulletState.NULL"
/>
  </div>
  <program-data-use :bullets="milestoneBullets" class="data-use" @learn="$emit('learn')"/>
  <text-button
    text="$1 Cash Out"
  />
</template>

<style scoped>
.button-row {
  display: flex;
  align-items: start;
  margin: 2em auto;
  width: fit-content;
}

.account-icon {
  margin-right: 3.125em;
}

.data-use {
  margin-top: 1.5em;
  margin-bottom: 2em;
  padding: 0 2em 0 2em;
}
</style>
