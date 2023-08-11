<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import type { PropType } from "vue";
import type { HistoryEvent } from "@/service/history/history-event";

defineProps({
  event: {
    type: Object as PropType<HistoryEvent>,
    required: true,
  },
});
</script>

<template>
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
</template>

<style scoped>
.description {
  display: flex;
  align-items: center;
}

.icon {
  height: 1.75em;
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
