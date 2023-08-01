<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import type { HistoryEvent } from "@/modules/history/history-event";
import { HistoryEventType } from "@/modules/history/history-event-type";
import HistoryItem from "@/modules/history/history-item.vue";

const events: Array<HistoryEvent> = [
  {
    name: "Amazon receipt detected",
    amount: 25,
    type: HistoryEventType.LINK,
    date: new Date(),
  },
  {
    name: "Amazon receipt detected",
    amount: 25,
    type: HistoryEventType.REDEEM,
    date: new Date(new Date().setMonth(3)),
  },
  {
    name: "Amazon receipt detected",
    amount: 25,
    type: HistoryEventType.SCAN,
    date: new Date(new Date().setDate(7)),
  },
];

const months: Set<Number> = new Set();
events
  .sort(function (a, b) {
    return b.date - a.date;
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
