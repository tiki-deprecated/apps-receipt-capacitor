/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

export const close = (element: any): boolean =>
  isHeadingElement(element.target.className) ||
  (element.target.className === "body" &&
    (isHeadingElement(element.target.firstElementChild.className) ||
      isFullScreenElement(element.target.firstElementChild.className))) ||
  (element.target.className === "overlay" &&
    element.target.firstElementChild.className === "bottom-sheet") ||
  (element.target.className === "body" &&
    !element.target.firstElementChild.className);

const isHeadingElement = (className: string): boolean =>
  ["heading", "title"].includes(className);
const isFullScreenElement = (className: string): boolean =>
  className === "full-screen";
