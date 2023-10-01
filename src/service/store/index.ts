/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { Repository } from "@/service/store/repository";
import { StateGmail, StateRetailer } from "@/service/store/state/";

export class ServiceStore {
  private readonly repository: Repository;
  readonly gmail: StateGmail;
  readonly retailer: StateRetailer;

  constructor() {
    this.repository = new Repository("tiki_receipt");
    this.gmail = new StateGmail(this.repository);
    this.retailer = new StateRetailer(this.repository);
  }

  async initialize(): Promise<void> {
    await this.gmail.load();
    await this.retailer.load();
  }

  clear = async (): Promise<void> => this.repository.clear();

  async reset(): Promise<void> {
    await this.gmail.reset();
    await this.retailer.reset();
  }
}
