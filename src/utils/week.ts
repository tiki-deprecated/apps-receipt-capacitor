/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

export function getWeek(date: Date = new Date()): number {
  const jan1: Date = new Date(date.getFullYear(), 0, 1);
  const day: number = (date.getTime() - jan1.getTime()) / 86400000;
  return Math.floor((day + jan1.getDay() + 1) / 7);
}
