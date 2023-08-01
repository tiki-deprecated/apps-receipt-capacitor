/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { defineConfig } from "vite";
import * as path from "path";
import typescript2 from "rollup-plugin-typescript2";
import dts from "vite-plugin-dts";
import vue from "@vitejs/plugin-vue";
import Markdown from "vite-plugin-vue-markdown";

export default defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    dts({
      insertTypesEntry: true,
    }),
    typescript2({
      check: false,
      include: ["src/components/**/*.vue"],
      tsconfigOverride: {
        compilerOptions: {
          outDir: "dist",
          sourceMap: true,
          declaration: true,
          declarationMap: true,
        },
      },
      exclude: ["vite.config.ts"],
    }),
    Markdown(),
  ],
  build: {
    cssCodeSplit: true,
    lib: {
      entry: "src/main.ts",
      name: "tiki-receipt-capacitor",
      formats: ["es", "cjs"],
      fileName: (format) => `tiki-receipt-capacitor.${format}.js`,
    },
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "src/main.ts"),
      },
      external: ["vue"],
      output: {
        assetFileNames: (assetInfo): string => {
          if (assetInfo.name === "main.css")
            return "tiki-receipt-capacitor.css";
          return assetInfo.name!;
        },
        exports: "named",
        globals: {
          vue: "Vue",
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
