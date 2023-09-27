/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import type { RendererElement } from "vue";

export const close = (direction: string, element: RendererElement): boolean =>
  (direction === "bottom" &&
    (isHeadingElement(element.target.className) ||
      (element.target.className === "body" &&
        (isHeadingElement(element.target.firstElementChild.className) ||
          isFullScreenElement(element.target.firstElementChild.className))))) ||
  (element.target.className === "overlay" &&
    element.target.firstElementChild.className === "bottom-sheet");

const isHeadingElement = (className: string): boolean =>
  ["heading", "title"].includes(className);
const isFullScreenElement = (className: string): boolean =>
  className === "full-screen";
