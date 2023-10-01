/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { getWeekNumberFromISOString } from "@/utils/getWeek";

export const useMilestoneStore = defineStore("milestone", () => {
  /**
   * @receipts - a Map with the receipt register id and the date that it was sync
   * @syncDates - A Set with all the sync dates
   */
  const receipts = ref<Map<string, Date>>(new Map());
  const syncDates = ref<Set<Date>>(new Set());

  /**
   * Adds a new date into the Set
   */
  function addSyncDate() {
    syncDates.value?.add(new Date());
  }
  /**
   * Adds a new receipt into the Map of receipts
   * @param receiptId - the registerId of the receipt interface
   */
  function addReceipt(receiptId: string) {
    receipts.value?.set(receiptId, new Date());
  }

  /**
   * Returns a Set of the ISO week number of the dates in the syncDates Set
   */
  const getSyncDateWeeks = computed(() => {
    const weeks = new Set();
    syncDates.value?.forEach((date) => {
      weeks.add(getWeekNumberFromISOString(date.toISOString()));
    });
    return weeks;
  });

  /**
   * returns a callback function that will get the receipts
   * @param initialDate - The init of the date range
   * @param finalDate - The end of the date range
   * if the range it was not passed, the action will return all receipts stored
   *
   */
  const getReceipts = computed(() => {
    return (initialDate?: Date, finalDate?: Date) => {
      if (initialDate && finalDate) {
        const totalReceipts: Date[] = [];
        receipts.value?.forEach((receipt) => {
          if (
            receipt.getDate() <= finalDate.getDate() &&
            receipt.getDate() >= initialDate.getDate()
          ) {
            totalReceipts.push(receipt);
          }
        });
        return totalReceipts;
      } else return receipts.value?.values();
    };
  });

  return {
    receipts,
    syncDates,
    addReceipt,
    addSyncDate,
    getSyncDateWeeks,
    getReceipts,
  };
});
