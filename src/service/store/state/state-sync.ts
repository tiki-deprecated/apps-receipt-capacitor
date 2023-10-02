/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import type { Repository } from "@/service/store/repository";
import { getWeek } from "@/utils/week";

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
    if (!saved) return;
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
}
