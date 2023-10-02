/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import type { Repository } from "@/service/store/repository";

export class StateSync {
  private readonly repository: Repository;
  private readonly key: string = "sync";
  private state: Set<Date> = new Set<Date>();

  constructor(repository: Repository) {
    this.repository = repository;
  }

  get(): Date[] {
    return Array.from(this.state.keys());
  }

  async add(date: Date = new Date()): Promise<void> {
    this.state.add(date);
    return this.repository.write(this.key, this.toString());
  }

  async load(): Promise<void> {
    const saved: string | undefined = await this.repository.read(this.key);
    if (!saved) return;
    saved.split(",").forEach((time) => {
      this.state.add(new Date(time));
    });
  }

  getWeeks(): number[] {
    const weeks: Set<number> = new Set<number>();
    this.state.forEach((date: Date): void => {
      const jan1: Date = new Date(date.getFullYear(), 0, 1);
      const week: number = Math.floor(
        ((date - jan1) / 86400000 + jan1.getDay() + 1) / 7,
      );
      weeks.add(week);
    });
    return Array.from(weeks.keys());
  }

  async reset(): Promise<void> {
    this.state = new Set();
    return this.repository.write(this.key, this.toString());
  }

  toString(): string {
    const array = Array.from(this.state.keys());
    return array.map((date) => date.getTime()).join(",");
  }
}
