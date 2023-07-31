/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import { tiki } from "@mytiki/tiki-sdk-capacitor";

createApp(App).provide("TikiSdk", tiki).mount("#app");
