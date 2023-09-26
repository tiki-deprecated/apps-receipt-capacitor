<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import SquareButton from "@/components/buttons/square-button.vue";
import TextButton from "@/components/buttons/text-button.vue";
import BulletList from "@/components/bullet/bullet-list.vue";
import { inject } from "vue";
import { TikiService } from "@/service/tiki-service";
import { BulletState } from "../bullet/bullet-state";

const tiki: TikiService | undefined = inject("Tiki");
const emit = defineEmits(["account", "redeem"]);

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
  <text-button text="$1 Cash Out" />
</template>

<style scoped></style>
