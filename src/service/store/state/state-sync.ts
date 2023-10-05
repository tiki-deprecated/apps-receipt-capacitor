/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import type { Repository } from "../repository";
import { getWeek } from "../../../utils/week";
import { BulletState } from "../../../components/bullet/bullet-state";

export class StateSync {
  private readonly repository: Repository;
  private readonly key: string = "sync";
  private state: Set<Date> = new Set<Date>();

  constructor(repository: Repository) {
    this.repository = repository;
  }

  get = (): Set<Date> => this.state;

  async add(date: Date = new Date()): Promise<void> {
    this.state.add(date);
    return this.repository.write(this.key, this.toString());
  }

  async load(): Promise<void> {
    const saved: string | undefined = await this.repository.read(this.key);
    if (!saved) return this.reset();
    const list: number[] = JSON.parse(saved);
    list.forEach((time) => {
      this.state.add(new Date(time));
    });
  }

  getWeeks(): Set<number> {
    const weeks: Set<number> = new Set<number>();
    this.state.forEach((date: Date): void => {
      weeks.add(getWeek(date));
    });
    return weeks;
  }

  countWeeks(end: Date = new Date()): number {
    let cur: number = getWeek(end);
    const all: Set<number> = this.getWeeks();
    let count = 0;
    if (all.has(cur)) {
      count += 1;
      cur -= 1;
      while (cur > 0 && all.has(cur)) {
        count += 1;
        cur -= 1;
      }
    }
    return count;
  }

  async reset(): Promise<void> {
    this.state = new Set();
    return this.repository.write(this.key, this.toString());
  }

  toString = (): string =>
    JSON.stringify(
      Array.from(this.state.keys()).map((date: Date) => date.getTime()),
    );

  status(end?: Date): BulletState {
    const count: number = this.countWeeks(end);
    switch (count) {
      case 0:
        return BulletState.P0;
      case 1:
        return BulletState.P25;
      case 2:
        return BulletState.P50;
      case 3:
        return BulletState.P75;
      default:
        return BulletState.P100;
    }
  }
}
