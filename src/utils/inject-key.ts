/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import type { InjectionKey } from "vue";
import type { Navigate } from "@/nav";

export const navigate = Symbol() as InjectionKey<Navigate>;
export const tiki = "Tiki";
