<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import type { PropType } from "vue";
import Icon25p from "@/assets/icons/25p.svg?component";
import Icon50p from "@/assets/icons/25p.svg?component";
import Icon75p from "@/assets/icons/25p.svg?component";
import IconCheck from "@/assets/icons/check.svg?component";
import IconCircle from "@/assets/icons/circle.svg?component";
import IconCrossmark from "@/assets/icons/crossmark.svg?component";
import IconSync from "@/assets/icons/sync.svg?component";

import { BulletState } from "@/components/bullet/bullet-state";

defineProps({
  state: {
    type: Number as PropType<BulletState>,
    required: true,
    default: BulletState.P0,
  },
});
</script>

<template>
  <div>
    <icon-circle v-if="state === BulletState.P0" class="icon p0" />
    <icon25p v-if="state === BulletState.P0" class="icon p25" />
    <icon50p v-if="state === BulletState.P0" class="icon p50" />
    <icon75p v-if="state === BulletState.P0" class="icon p75" />
    <icon-check v-if="state === BulletState.P0" class="icon p100" />
    <icon-crossmark v-if="state === BulletState.P0" class="icon null" />
    <icon-crossmark v-if="state === BulletState.P0" class="icon error" />
    <icon-sync v-if="state === BulletState.P0" class="icon sync" />
  </div>
</template>

<style scoped>
.icon {
  color: var(--tiki-secondary-text-color);
}

.icon :deep(.background) {
  fill: var(--tiki-primary-background-color);
}

.p25,
.p50,
.p75 {
  color: var(--tiki-ok-color);
}

.p100,
.error,
.sync {
  color: var(--tiki-primary-background-color);
}

.p100 :deep(.background) {
  fill: var(--tiki-ok-color);
}

.error :deep(.background) {
  fill: var(--tiki-error-color);
}

.sync :deep(.background) {
  fill: var(--tiki-secondary-text-color);
}

.null :deep(.background) {
  fill: transparent;
}

.null {
  color: var(--tiki-secondary-text-color);
}
</style>
