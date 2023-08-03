<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import ArrowIcon from "@/components/icons/arrow-icon.vue";
import { TikiService } from "@/tiki-service";
import { inject } from "vue";
import type { HistoryEvent } from "@/modules/history/history-event";
import { HistoryEventType, icon } from "@/modules/history/history-event-type";

defineEmits(["click"]);
const tiki: TikiService | undefined = inject("Tiki");
const event: HistoryEvent = tiki!.history.at(tiki?.history.length - 1);
</script>

<template>
  <div class="reward-summary">
    <div class="amount">
      <component :is="icon(event.type)" class="icon" />
      {{ event.type === HistoryEventType.REDEEM ? "-" : "+"
      }}{{ event.amount }} pts on
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
