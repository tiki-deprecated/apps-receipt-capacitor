<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->
<script setup lang="ts">
import CrossMarkIconOutline from "@/assets/icons/crossmark-outline.svg?component";
import HeaderBack from "@/components/header/header-back.vue";
import IconButton from "@/components/buttons/icon-button.vue";
import TextButton from "@/components/buttons/text-button.vue";

defineEmits(['remove', 'close', 'back'])
</script>

  <template>
    <header-back text="Remove Account" @back="$emit('back')">
      <icon-button @click="$emit('close')" :icon="CrossMarkIconOutline" />
    </header-back>
    <div class="alert-text">
        <p class="alert-text-bold">
            Warning! Removing this account may disqualify you from payout. 
        </p>
        <p>
            To swap accounts, first connect the other one. Then remove this one.
        </p>
        <p>
            Are you sure you want to proceed?
        </p>
    </div>
    <text-button text="Remove Account" @click="$emit('remove')" class="warning-button" :isWarning="true"/>
  </template>

<style>
.alert-text{
  text-align: center;
  font-family: var(--tiki-font-family);
  font-size: var(--tiki-font-size);
  line-height: var(--tiki-line-height);
  color: var(--tiki-secondary-text-color);
  margin: 0;
}

.alert-text-bold{
  font-weight: bold;
}
</style>