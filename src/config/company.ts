/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { Agreement } from "@/assets/md";
import type * as Options from "@/options/company";

export class Company {
  readonly name: string;
  readonly jurisdiction: string;
  readonly terms: string;
  readonly privacy: string;
  readonly template: string;

  constructor(company: Options.Company) {
    this.name = company.name;
    this.jurisdiction = company.jurisdiction;
    this.terms = company.terms;
    this.privacy = company.privacy;
    this.template = Agreement;
  }

  get agreement(): string {
    return this.template
      .replace("{{{COMPANY}}}", this.name)
      .replace("{{{TOS}}}", this.terms)
      .replace("{{{POLICY}}}", this.privacy)
      .replace("{{{JURISDICTION}}}", this.jurisdiction);
  }
}
