/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

export interface Theme {
  fontFamily?: string;
  primaryTextColor?: string;
  secondaryTextColor?: string;
  accentColor?: string;
  primaryBackgroundColor?: string;
  secondaryBackgroundColor?: string;
}

export const apply = (document: Document, theme?: Theme) => {
  if (theme?.fontFamily != undefined)
    document.documentElement.style.setProperty(
      "--tiki-font-family",
      theme.fontFamily,
    );
  if (theme?.primaryTextColor != undefined)
    document.documentElement.style.setProperty(
      "--tiki-primary-text-color",
      theme.primaryTextColor,
    );
  if (theme?.secondaryTextColor != undefined)
    document.documentElement.style.setProperty(
      "--tiki-secondary-text-color",
      theme.secondaryTextColor,
    );
  if (theme?.primaryBackgroundColor != undefined)
    document.documentElement.style.setProperty(
      "--tiki-primary-background-color",
      theme.primaryBackgroundColor,
    );
  if (theme?.secondaryBackgroundColor != undefined)
    document.documentElement.style.setProperty(
      "--tiki-secondary-background-color",
      theme.secondaryBackgroundColor,
    );
  if (theme?.accentColor != undefined)
    document.documentElement.style.setProperty(
      "--tiki-accent-color",
      theme.accentColor,
    );
};
