<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import type { HistoryEvent } from "@/modules/history/history-event";
import HistoryItem from "@/modules/history/history-item.vue";
import { TikiService } from "@/tiki-service";
import { inject, ref } from "vue";
import { HistoryService } from "@/modules/history/history-service";

const service: HistoryService = new HistoryService(
  inject("Tiki") as TikiService,
);

const events = ref<HistoryEvent[]>([]);
const months = ref<Set<Number>>(new Set());
service.getAll().then((history) => {
  history
    .sort(function (a, b) {
      return b.date - a.date;
    })
    .forEach((event) => {
      const trunc = new Date(event.date.getFullYear(), event.date.getMonth());
      months.value.add(trunc.getTime());
    });
  events.value = history;
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
