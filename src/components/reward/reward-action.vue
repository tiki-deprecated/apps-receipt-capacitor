<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import CrossMark from "@/assets/icons/cross-mark-outline.svg?component"
import SquareButton from "@/components/buttons/square-button.vue";
import TextButton from "@/components/buttons/text-button.vue";
import { inject } from "vue";
import { TikiService } from "@/service/tiki-service";

const tiki: TikiService | undefined = inject("Tiki");
const emit = defineEmits(["account", "redeem"]);

const redeem = () => {
  tiki!.history.redeem();
  emit("redeem");
};
</script>

<template>
  <div class="button-row">
    <square-button
      :icon="CrossMark"
      text="Gmail"
      class="account-icon"
      @click="$emit('accountGmail')"
    />
    <square-button :icon="CrossMark" text="Retailer" @click="$emit('accountRetailer')" />
  </div>
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
</style>
