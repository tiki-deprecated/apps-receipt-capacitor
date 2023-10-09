/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { NavDef } from "@/nav/defs";
import { type Ref, ref } from "vue";
import NavView from "./nav-view.vue";

export class Navigate {
  private _params: Map<string, any> = new Map();
  private stack: NavDef[] = [];
  readonly ref: Ref<NavDef>;

  constructor(init: Ref<NavDef> | undefined = undefined) {
    this.ref = init ?? ref(NavDef.None);
  }

  to(to: NavDef, params: Map<string, any> | undefined = undefined): void {
    if (to === NavDef.None) this.clear();
    else {
      this.stack.push(to);
      if (!params) this._params.clear();
      else this._params = params;
      this.ref.value = to;
    }
  }

  pop(): void {
    if (this.stack.length > 1) {
      this.stack.pop();
      this._params.clear();
      this.ref.value = this.stack.slice(-1)[0];
    } else this.clear();
  }

  clear(): void {
    this.stack = [];
    this.ref.value = NavDef.None;
    this._params.clear();
  }

  get params(): Map<string, any> {
    return this._params;
  }
}

export { NavView, NavDef };
