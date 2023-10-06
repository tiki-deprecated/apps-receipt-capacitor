<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import Icon5p from "@/assets/icons/5p.svg?component";
import Icon10p from "@/assets/icons/10p.svg?component";
import Icon15p from "@/assets/icons/15p.svg?component";
import Icon20p from "@/assets/icons/20p.svg?component";
import Icon25p from "@/assets/icons/25p.svg?component";
import Icon30p from "@/assets/icons/30p.svg?component";
import Icon35p from "@/assets/icons/35p.svg?component";
import Icon40p from "@/assets/icons/40p.svg?component";
import Icon45p from "@/assets/icons/45p.svg?component";
import Icon50p from "@/assets/icons/50p.svg?component";
import Icon55p from "@/assets/icons/55p.svg?component";
import Icon60p from "@/assets/icons/60p.svg?component";
import Icon65p from "@/assets/icons/65p.svg?component";
import Icon70p from "@/assets/icons/70p.svg?component";
import Icon75p from "@/assets/icons/75p.svg?component";
import Icon80p from "@/assets/icons/80p.svg?component";
import Icon85p from "@/assets/icons/85p.svg?component";
import Icon90p from "@/assets/icons/90p.svg?component";
import Icon95p from "@/assets/icons/95p.svg?component";
import IconCheck from "@/assets/icons/check.svg?component";
import IconCrossMark from "@/assets/icons/crossmark.svg?component";
import IconSync from "@/assets/icons/sync.svg?component";
import IconCircle from "@/assets/icons/circle.svg?component";
import { BulletState } from "@/components/bullet/bullet-state";
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
