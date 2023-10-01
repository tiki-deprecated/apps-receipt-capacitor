/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { Preferences } from "@capacitor/preferences";

export class Repository {
  readonly prefix: string;

  constructor(prefix: string = "tiki") {
    this.prefix = prefix;
  }

  write = async (key: string, value: string): Promise<void> =>
    await Preferences.set({
      key: this.toKey(key),
      value: value,
    });

  async read(key: string): Promise<string | undefined> {
    const { value } = await Preferences.get({
      key: this.toKey(key),
    });
    return value === null ? undefined : value;
  }

  delete = async (key: string): Promise<void> =>
    await Preferences.remove({ key: this.toKey(key) });

  async clear(): Promise<void> {
    const { keys } = await Preferences.keys();
    const filtered = keys.filter((key) => key.startsWith(this.prefix));
    for (const key in filtered) {
      await Preferences.remove({ key: key });
    }
  }

  private toKey = (key: string): string => `${this.prefix}.${key}`;
}
