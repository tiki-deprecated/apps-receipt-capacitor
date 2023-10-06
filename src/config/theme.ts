/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import type * as Options from "@/options/theme";

export class Theme {
  readonly fontFamily?: string;
  readonly primaryTextColor?: string;
  readonly secondaryTextColor?: string;
  readonly successColor?: string;
  readonly errorColor?: string;
  readonly primaryBackgroundColor?: string;
  readonly secondaryBackgroundColor?: string;

  constructor(theme?: Options.Theme) {
    if (theme?.fontFamily != undefined) this.fontFamily = theme.fontFamily;
    if (theme?.primaryTextColor != undefined)
      this.primaryTextColor = theme.primaryTextColor;
    if (theme?.secondaryTextColor != undefined)
      this.secondaryTextColor = theme.secondaryTextColor;
    if (theme?.successColor != undefined)
      this.successColor = theme.successColor;
    if (theme?.errorColor != undefined) this.errorColor = theme.errorColor;
    if (theme?.primaryBackgroundColor != undefined)
      this.primaryBackgroundColor = theme.primaryBackgroundColor;
    if (theme?.secondaryBackgroundColor != undefined)
      this.secondaryBackgroundColor = theme.secondaryBackgroundColor;
  }

  apply(document: Document): void {
    this.setProperty(document, "--tiki-font-family", this.fontFamily);
    this.setProperty(
      document,
      "--tiki-primary-text-color",
      this.primaryTextColor,
    );
    this.setProperty(
      document,
      "--tiki-secondary-text-color",
      this.secondaryTextColor,
    );
    this.setProperty(
      document,
      "--tiki-primary-background-color",
      this.primaryBackgroundColor,
    );
    this.setProperty(
      document,
      "--tiki-secondary-background-color",
      this.secondaryBackgroundColor,
    );
    this.setProperty(document, "--tiki-success-color", this.successColor);
    this.setProperty(document, "--tiki-success-color", this.errorColor);
  }

  private setProperty(
    document: Document,
    property: string,
    value?: string,
  ): void {
    if (value != undefined)
      document.documentElement.style.setProperty(property, value);
  }
}
