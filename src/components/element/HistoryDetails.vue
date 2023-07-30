<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import ReceiptIcon from "@/components/icon/ReceiptIcon.vue";

export interface HistoryEvent {
  name: String;
  amount: Number;
  icon: Object;
  date: Date;
}

const events: Array<HistoryEvent> = [
  {
    name: "Amazon receipt detected",
    amount: 25,
    icon: ReceiptIcon,
    date: new Date(),
  },
  {
    name: "Amazon receipt detected",
    amount: 25,
    icon: ReceiptIcon,
    date: new Date(new Date().setMonth(3)),
  },
  {
    name: "Amazon receipt detected",
    amount: 25,
    icon: ReceiptIcon,
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
      <div class="description">
        <component :is="event.icon" class="icon" />
        <div>
          <p class="name">{{ event.name }}</p>
          <p class="date">
            {{
              event.date.toLocaleDateString("en-US", {
                hour12: true,
                minute: "numeric",
                hour: "numeric",
                day: "numeric",
                month: "numeric",
                year: "2-digit",
              })
            }}
          </p>
        </div>
      </div>
      <div class="amount">
        <span v-if="event.amount > 0">+</span>
        <span v-if="event.amount < 0">-</span>
        {{ event.amount }} pts
      </div>
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

.description {
  display: flex;
  align-items: center;
}

.icon {
  height: 2.4em;
  margin-right: 1.143em;
  color: var(--tiki-secondary-text-color);
}

.name {
  font-size: var(--tiki-font-size);
  line-height: 1em;
  color: var(--tiki-primary-text-color);
  font-weight: bold;
  margin: 0;
}

.date {
  font-size: var(--tiki-font-size-xs);
  line-height: var(--tiki-line-height-sm);
  color: var(--tiki-secondary-text-color);
  font-weight: 500;
  margin: 0;
}

.amount {
  font-size: var(--tiki-font-size-xl);
  line-height: 1em;
  color: var(--tiki-primary-text-color);
  font-weight: bold;
}
</style>
