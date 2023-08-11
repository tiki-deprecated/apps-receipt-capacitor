<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import ArrowIcon from "@/assets/icons/arrow.svg";
import { TikiService } from "@/service/tiki-service";
import { inject, ref } from "vue";
import type { HistoryEvent } from "@/service/history/history-event";

defineEmits(["click"]);
const tiki: TikiService | undefined = inject("Tiki");
const event = ref<HistoryEvent | undefined>(tiki!.history.latest);
tiki!.history.onEvent("reward-history", (evt) => (event.value = evt));
</script>

<template>
  <div v-if="event != undefined" class="reward-summary">
    <div class="amount">
      <component :is="event.icon" class="icon" />
      {{ event.amount > 0 ? "+" : "-" }}{{ event.amount }} pts on
      {{
        event.date.toLocaleDateString("en-US", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        })
      }}
    </div>
    <button @click="$emit('click')" class="view-button">
      view all <arrow-icon class="arrow" />
    </button>
  </div>
</template>

<style scoped>
.reward-summary {
  font-family: var(--tiki-font-family);
  line-height: var(--tiki-line-height);
  font-size: var(--tiki-font-size);
  font-weight: bold;
  color: var(--tiki-secondary-text-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.icon {
  height: 1.125em;
  margin-right: 0.5em;
}

.arrow {
  transform: rotate(180deg);
  height: 1em;
  margin-left: 0.5em;
}

.amount {
  display: flex;
  align-items: center;
}

.view-button {
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  font-family: var(--tiki-font-family);
  line-height: var(--tiki-line-height);
  font-size: var(--tiki-font-size);
  font-weight: bold;
  color: var(--tiki-secondary-text-color);
  white-space: nowrap;
}
</style>
