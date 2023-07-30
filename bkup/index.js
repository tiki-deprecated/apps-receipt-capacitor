/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import Tiki from "./Tiki.vue";

const plugin = {
  install(Vue) {
    Vue.component("TikiReceipt", Tiki);
  },
};

export default plugin;
