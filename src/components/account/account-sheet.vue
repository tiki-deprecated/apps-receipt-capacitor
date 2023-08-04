<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import AccountLink from "@/components/account/account-link.vue";
import AccountUnlink from "@/components/account/account-unlink.vue";
import { ref } from "vue";

defineEmits(["close", "back"]);
const unlink = ref<Boolean>(false);
</script>

<template>
  <account-link
    v-if="!unlink"
    @unlink="unlink = true"
    @close="$emit('close')"
    @back="$emit('back')"
  />
  <account-unlink
    v-if="unlink"
    @back="unlink = false"
    @close="$emit('close')"
  />
</template>
