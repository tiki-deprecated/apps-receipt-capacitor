<script setup lang="ts">
import { inject } from "vue";
import { InjectKey } from "../../../utils";
import { type Navigate } from "../../../nav";
import {CloSheetCompany} from '../../../components';
import { AccountType } from "@mytiki/capture-receipt-capacitor";
import { defineProps, PropType } from "vue";

const navigate: Navigate = inject(InjectKey.navigate)!;

const props = defineProps({
    company: {
        type: Object as PropType<AccountType>,
        required: true
    }
})

</script>

<template>
    <clo-sheet-company 
    @back="navigate.pop()"
    @close="navigate.clear()"
    :company="company"
    />
</template>