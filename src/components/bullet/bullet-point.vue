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
import IconCrossMark from "@/assets/icons/crossmark-outline.svg?component";
import IconSync from "@/assets/icons/sync.svg?component";
import IconCircle from "@/assets/icons/circle.svg?component";
import { BulletState } from "@/components/bullet/bullet-state";

defineProps({
  state: {
    type: String as PropType<BulletState>,
    required: true,
    default: "P0",
  },
});
</script>

<template>
  <div>
    <icon-circle v-if="state === BulletState.P0" class="icon p0" />
    <icon25p v-if="state === BulletState.P25" class="icon p25" />
    <icon50p v-if="state === BulletState.P50" class="icon p50" />
    <icon75p v-if="state === BulletState.P75" class="icon p75" />
    <icon-check v-if="state === BulletState.P100" class="icon p100" />
    <icon-cross-mark v-if="state === BulletState.NULL" class="icon null" />
    <icon-cross-mark v-if="state === BulletState.ERROR" class="icon error" />
    <icon-sync v-if="state === BulletState.SYNC" class="icon sync" />
  </div>
</template>

<style scoped>
.icon {
  color: var(--tiki-secondary-text-color);
  display: block;
}

.icon :deep(.background) {
  fill: var(--tiki-primary-background-color);
}

.p25,
.p50,
.p75 {
  color: var(--tiki-success-color);
}

.p100,
.error,
.sync {
  color: var(--tiki-primary-background-color);
}

.p100 :deep(.background) {
  fill: var(--tiki-success-color);
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
