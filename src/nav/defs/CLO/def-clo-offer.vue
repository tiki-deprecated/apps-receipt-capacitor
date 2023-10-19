<script setup lang="ts">
import { inject } from "vue";
import { InjectKey } from "../../../utils";
import { type Navigate, NavDef } from "../../../nav";
import {CloSheetOffer} from '../../../components';
const navigate: Navigate = inject(InjectKey.navigate)!;
</script>

<template>
    <clo-sheet-offer @close="navigate.clear()" @accept=""/>
</template>