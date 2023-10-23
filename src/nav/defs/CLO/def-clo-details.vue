<script setup lang="ts">
import { inject } from "vue";
import { InjectKey } from "../../../utils";
import { type Navigate, NavDef } from "../../../nav";
import {CloSheetDetails} from '../../../components';
const navigate: Navigate = inject(InjectKey.navigate)!;
</script>

<template>
    <clo-sheet-details 
    @back="navigate.pop()"
    @close="navigate.clear()"
    />
</template>