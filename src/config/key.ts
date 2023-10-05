/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import type * as Options from "@/options/key";

export class Key {
  readonly publishingId: string;
  readonly ios: string = "";
  readonly android: string = "";
  readonly product: string;

  constructor(key?: Options.Key) {
    if (key?.publishingId != undefined) this.publishingId = key.publishingId;
    else throw new Error("Missing required key: Publishing ID");

    if (key?.ios != undefined) this.ios = key.ios;
    if (key?.android != undefined) this.android = key.android;
    if (key?.ios == undefined && key?.android == undefined)
      throw new Error("Missing required key: One of Android or iOS");

    if (key?.product != undefined) this.product = key.product;
    else throw new Error("Missing required key: Publishing ID");
  }
}
