/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.mytiki.receipt.capacitor",
  appName: "TIKI Receipt",
  webDir: "dist",
  server: {
    androidScheme: "https",
  },
};

export default config;
