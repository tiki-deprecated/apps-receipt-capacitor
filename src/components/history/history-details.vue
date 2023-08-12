<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import type { HistoryEvent } from "@/service/history/history-event";
import HistoryItem from "@/components/history/history-item.vue";
import { TikiService } from "@/service/tiki-service";
import { inject } from "vue";

const tiki: TikiService | undefined = inject("Tiki");
const months: Set<number> = new Set<number>();
const events: HistoryEvent[] = tiki?.history.all ?? [];
events
  .sort(function (a: HistoryEvent, b: HistoryEvent) {
    return b.date.getDate() - a.date.getDate();
  })
  .forEach((event) => {
    const trunc = new Date(event.date.getFullYear(), event.date.getMonth());
    months.add(trunc.getTime());
  });
</script>

<template>
  <div v-for="month in months" class="month-header">
    {{
      new Date(month).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    }}
    <div
      v-for="event in events.filter(
        (e) =>
          e.date.getMonth() === new Date(month).getMonth() &&
          e.date.getFullYear() === new Date(month).getFullYear(),
      )"
      class="event"
    >
      <history-item :event="event" />
    </div>
  </div>
</template>

<style scoped>
.month-header {
  font-size: var(--tiki-font-size-sm);
  line-height: var(--tiki-line-height-sm);
  color: var(--tiki-primary-text-color);
  font-weight: 500;
  font-family: var(--tiki-font-family);
  margin-bottom: 1em;
}

.event {
  display: flex;
  align-items: start;
  justify-content: space-between;
  margin: 1.5em auto;
}
</style>
