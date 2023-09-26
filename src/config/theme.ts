/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

/**
 * UI style customization. Alternatively set the following CSS variables:
 * *  --tiki-font-family
 * *  --tiki-primary-text-color
 * *  --tiki-secondary-text-color
 * *  --tiki-primary-background-color
 * *  --tiki-secondary-background-color
 * *  --tiki-success-color
 * *  --tiki-error-color
 */
export interface Theme {
  /**
   * The font family to use. Defaults to `"Space Grotesk", sans-serif`
   */
  fontFamily?: string;

  /**
   * The primary text color to use. Defaults to `rgb(28 0 0)`.
   */
  primaryTextColor?: string;

  /**
   * The secondary text color to use. Defaults to `rgb(28 0 0 / 60%)`.
   */
  secondaryTextColor?: string;

  /**
   * The success color to use. Defaults to `rgb(0 178 114)`.
   */
  successColor?: string;

  /**
   * The accent color to use. Defaults to `rgb(199, 48, 0)`.
   */
  errorColor?: string;

  /**
   * The primary background color to use. Defaults to `rgb(255 255 255)`.
   */
  primaryBackgroundColor?: string;

  /**
   * The secondary background color to use. Defaults to `rgb(246 246 246)`.
   */
  secondaryBackgroundColor?: string;
}

export const apply = (document: Document, theme?: Theme) => {
  setProperty(document, "--tiki-font-family", theme?.fontFamily);
  setProperty(document, "--tiki-primary-text-color", theme?.primaryTextColor);
  setProperty(
    document,
    "--tiki-secondary-text-color",
    theme?.secondaryTextColor,
  );
  setProperty(
    document,
    "--tiki-primary-background-color",
    theme?.primaryBackgroundColor,
  );
  setProperty(
    document,
    "--tiki-secondary-background-color",
    theme?.secondaryBackgroundColor,
  );
  setProperty(document, "--tiki-success-color", theme?.successColor);
  setProperty(document, "--tiki-success-color", theme?.errorColor);
};

const setProperty = (document: Document, property: string, value?: string) => {
  if (value != undefined)
    document.documentElement.style.setProperty(property, value);
};
