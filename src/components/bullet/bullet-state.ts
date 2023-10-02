/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

export enum BulletState {
  P0 = "P0",
  P5 = "P5",
  P10 = "P10",
  P15 = "P15",
  P20 = "P20",
  P25 = "P25",
  P30 = "P30",
  P35 = "P35",
  P40 = "P40",
  P45 = "P45",
  P50 = "P50",
  P55 = "P55",
  P60 = "P60",
  P65 = "P65",
  P70 = "P70",
  P75 = "P75",
  P80 = "P80",
  P85 = "P85",
  P90 = "P90",
  P95 = "P95",
  P100 = "P100",
  NULL = "NULL",
  SYNC = "SYNC",
  ERROR = "ERROR",
}

export const toBulletState = (value: string): BulletState | undefined => {
  const key = Object.keys(BulletState).find(
    (key) => BulletState[key as keyof typeof BulletState] === value,
  );
  return key !== undefined
    ? BulletState[key as keyof typeof BulletState]
    : undefined;
};
