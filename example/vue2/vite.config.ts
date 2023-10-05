/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue2";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    dedupe: ["vue"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
