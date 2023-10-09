<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import {
  Icon5p,
  Icon10p,
  Icon15p,
  Icon20p,
  Icon25p,
  Icon30p,
  Icon35p,
  Icon40p,
  Icon45p,
  Icon50p,
  Icon55p,
  Icon60p,
  Icon65p,
  Icon70p,
  Icon75p,
  Icon80p,
  Icon85p,
  Icon90p,
  Icon95p,
  IconCheck,
  IconCrossMark,
  IconSync,
  IconCircle,
} from "@/assets";
import { BulletState } from "@/components";
import type { PropType } from "vue";

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
    <icon5p v-if="state === BulletState.P5" class="icon percent" />
    <icon10p v-if="state === BulletState.P10" class="icon percent" />
    <icon15p v-if="state === BulletState.P15" class="icon percent" />
    <icon20p v-if="state === BulletState.P20" class="icon percent" />
    <icon25p v-if="state === BulletState.P25" class="icon percent" />
    <icon30p v-if="state === BulletState.P30" class="icon percent" />
    <icon35p v-if="state === BulletState.P35" class="icon percent" />
    <icon40p v-if="state === BulletState.P40" class="icon percent" />
    <icon45p v-if="state === BulletState.P45" class="icon percent" />
    <icon50p v-if="state === BulletState.P50" class="icon percent" />
    <icon55p v-if="state === BulletState.P55" class="icon percent" />
    <icon60p v-if="state === BulletState.P60" class="icon percent" />
    <icon65p v-if="state === BulletState.P65" class="icon percent" />
    <icon70p v-if="state === BulletState.P70" class="icon percent" />
    <icon75p v-if="state === BulletState.P75" class="icon percent" />
    <icon80p v-if="state === BulletState.P80" class="icon percent" />
    <icon85p v-if="state === BulletState.P85" class="icon percent" />
    <icon90p v-if="state === BulletState.P90" class="icon percent" />
    <icon95p v-if="state === BulletState.P95" class="icon percent" />
    <icon-check v-if="state === BulletState.P100" class="icon p100" />
    <icon-cross-mark v-if="state === BulletState.NULL" class="icon null" />
    <icon-cross-mark v-if="state === BulletState.ERROR" class="icon error" />
    <icon-sync v-if="state === BulletState.SYNC" class="icon sync" />
  </div>
</template>

<style scoped>
.icon,
.p0 {
  color: var(--tiki-secondary-text-color);
  display: block;
}

.icon :deep(.background) {
  fill: var(--tiki-primary-background-color);
}

.percent {
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
  fill: var(--tiki-secondary-background-color);
}

.null {
  color: var(--tiki-secondary-text-color);
}
</style>
