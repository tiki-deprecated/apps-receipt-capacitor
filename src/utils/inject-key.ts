/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import type { InjectionKey } from "vue";
import type { Navigate } from "@/nav";
import type { Config } from "@/config";
import type { Capture } from "@/service/capture";
import type { Store } from "@/service/store";
import type { Publish } from "@/service/publish";

export const tiki = "Tiki";
export const navigate = Symbol() as InjectionKey<Navigate>;
export const capture = Symbol() as InjectionKey<Capture>;
export const store = Symbol() as InjectionKey<Store>;
export const publish = Symbol() as InjectionKey<Publish>;
export const config = Symbol() as InjectionKey<Config>;
