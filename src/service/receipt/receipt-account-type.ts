/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import GmailIcon from "@/assets/images/gmail.png";
import { AccountProvider } from "@mytiki/tiki-capture-receipt-capacitor";

/**
 * Enumeration of the supported account types.
 */
export enum ReceiptAccountType {
  // ACME = "ACME",
  // ALBERTSONS = "Albertsons",
  // AMAZON = "Amazon",
  // AOL = "AOL",
  // BBB = "Bed Bath & Beyond",
  /**
   * Gmail account type.
   */
  GMAIL = "Gmail",
  // BEST_BUY = "Best Buy",
  // BJS = "BJ’s Wholesale Club",
  // CHEWY = "Chewy",
  // COSTCO = "Costco",
  // CVS = "CVS",
  // DICKS = "Dick’s Sporting Goods",
  // DOLLAR_GENERAL = "Dollar General",
  // DOLLAR_TREE = "DollarTree",
  // DOMINOS = "Domino’s Pizza",
  // DOOR_DASH = "DoorDash",
  // DRIZLY = "Drizly",
  // FAMILY_DOLLAR = "Family Dollar",
  // FOOD_4_LESS = "Food 4 Less",
  // FOOD_LION = "Food Lion",
  // FRED_MEYER = "Fred Meyer",
  // GAP = "GAP",
  // GIANT_EAGLE = "Giant Eagle",
  // GRUBHUB = "Grubhub",
  // HARRIS_TEETER = "Harris Teeter",
  // HEB = "H.E.B",
  // HOME_DEPOT = "Home Depot",
  // HY_VEE = "HyVee",
  // INSTACART = "Instacart",
  // JEWEL_OSCO = "Jewel Osco",
  // KOHLS = "Kohl’s",
  // KROGER = "Kroger",
  // LOWES = "Lowe’s",
  // MACYS = "Macy’s",
  // MARSHALLS = "Marshalls",
  // MEIJER = "Meijer",
  // NIKE = "Nike",
  // PUBLIX = "Publix",
  // RALPHS = "Ralphs",
  // RITE_AID = "RiteAid",
  // SAFEWAY = "Safeway",
  // SAMS_CLUB = "Sam’s Club",
  // SEAMLESS = "Seamless",
  // SEPHORA = "Sephora",
  // SHIPT = "Shipt",
  // SHOP_RITE = "ShopRite",
  // SPROUTS = "Sprouts",
  // STAPLES = "Staples",
  // STAPLES_CANADA = "Staples Canada",
  // STARBUCKS = "Starbucks",
  // TACO_BELL = "Taco Bell",
  // TARGET = "Target",
  // TJ_MAXX = "T.J.Maxx",
  // UBER_EATS = "UberEats",
  // ULTA = "Ulta",
  // VONS = "Vons",
  // WALGREENS = "Walgreens",
  // WALMART = "Walmart",
  // WALMART_CANADA = "Walmart Canada",
  // WEGMANS = "Wegman’s",
}

/**
 * Reverse string-value mapping of the {@link ReceiptAccountType}. Use to
 * resolve an enum by its string value.
 */
export const all: Map<string, ReceiptAccountType> = new Map(
  Object.values(ReceiptAccountType).map(
    (value) => [`${value}`, value] as const,
  ),
);

/**
 * Gets the icon (image src) associated with a {@link ReceiptAccountType}.
 * @param type - The receipt account type.
 * @returns The icon string associated with the receipt account type.
 * @throws Error if the receipt account type is not supported.
 */
export const icon = (type: ReceiptAccountType): string => {
  switch (type) {
    // case ReceiptAccountType.ACME:
    //   return AcmeIcon;
    // case ReceiptAccountType.ALBERTSONS:
    //   return AlbertsonsIcon;
    // case ReceiptAccountType.AMAZON:
    //   return AmazonIcon;
    // case ReceiptAccountType.AOL:
    //   return AolIcon;
    // case ReceiptAccountType.BBB:
    //   return BedBathBeyondIcon;
    // case ReceiptAccountType.BEST_BUY:
    //   return BestBuyIcon;
    // case ReceiptAccountType.BJS:
    //   return BJSIcon;
    // case ReceiptAccountType.CHEWY:
    //   return ChewyIcon;
    // case ReceiptAccountType.COSTCO:
    //   return CostcoIcon;
    // case ReceiptAccountType.CVS:
    //   return CVSIcon;
    // case ReceiptAccountType.DICKS:
    //   return DicksIcon;
    // case ReceiptAccountType.DOLLAR_GENERAL:
    //   return DollarGeneralIcon;
    // case ReceiptAccountType.DOLLAR_TREE:
    //   return DollarTreeIcon;
    // case ReceiptAccountType.DOMINOS:
    //   return DominosIcon;
    // case ReceiptAccountType.DOOR_DASH:
    //   return DoorDashIcon;
    // case ReceiptAccountType.DRIZLY:
    //   return DrizlyIcon;
    // case ReceiptAccountType.FAMILY_DOLLAR:
    //   return FamilyDollarIcon;
    // case ReceiptAccountType.FOOD_4_LESS:
    //   return Food4LessIcon;
    // case ReceiptAccountType.FOOD_LION:
    //   return FoodLionIcon;
    // case ReceiptAccountType.FRED_MEYER:
    //   return FredMeyerIcon;
    // case ReceiptAccountType.GAP:
    //   return GapIcon;
    // case ReceiptAccountType.GIANT_EAGLE:
    //   return GiantEagleIcon;
    case ReceiptAccountType.GMAIL:
      return GmailIcon;
    // case ReceiptAccountType.GRUBHUB:
    //   return GrubHubIcon;
    // case ReceiptAccountType.HARRIS_TEETER:
    //   return HarrisTeeterIcon;
    // case ReceiptAccountType.HEB:
    //   return HEBIcon;
    // case ReceiptAccountType.HOME_DEPOT:
    //   return HomeDepotIcon;
    // case ReceiptAccountType.HY_VEE:
    //   return HyVeeIcon;
    // case ReceiptAccountType.INSTACART:
    //   return InstacartIcon;
    // case ReceiptAccountType.JEWEL_OSCO:
    //   return JewelOscoIcon;
    // case ReceiptAccountType.KOHLS:
    //   return KohlsIcon;
    // case ReceiptAccountType.KROGER:
    //   return KrogerIcon;
    // case ReceiptAccountType.LOWES:
    //   return LowesIcon;
    // case ReceiptAccountType.MACYS:
    //   return MacysIcon;
    // case ReceiptAccountType.MARSHALLS:
    //   return MarshallsIcon;
    // case ReceiptAccountType.MEIJER:
    //   return MeijerIcon;
    // case ReceiptAccountType.NIKE:
    //   return NikeIcon;
    // case ReceiptAccountType.PUBLIX:
    //   return PublixIcon;
    // case ReceiptAccountType.RALPHS:
    //   return RalphsIcon;
    // case ReceiptAccountType.RITE_AID:
    //   return RiteAidIcon;
    // case ReceiptAccountType.SAFEWAY:
    //   return SafewayIcon;
    // case ReceiptAccountType.SAMS_CLUB:
    //   return SamsClubIcon;
    // case ReceiptAccountType.SEAMLESS:
    //   return SeamlessIcon;
    // case ReceiptAccountType.SEPHORA:
    //   return SephoraIcon;
    // case ReceiptAccountType.SHIPT:
    //   return ShiptIcon;
    // case ReceiptAccountType.SHOP_RITE:
    //   return ShopRiteIcon;
    // case ReceiptAccountType.SPROUTS:
    //   return SproutsIcon;
    // case ReceiptAccountType.STAPLES:
    //   return StaplesIcon;
    // case ReceiptAccountType.STAPLES_CANADA:
    //   return StaplesCanadaIcon;
    // case ReceiptAccountType.STARBUCKS:
    //   return StarbucksIcon;
    // case ReceiptAccountType.TACO_BELL:
    //   return TacoBellIcon;
    // case ReceiptAccountType.TARGET:
    //   return TargetIcon;
    // case ReceiptAccountType.TJ_MAXX:
    //   return TJMaxxIcon;
    // case ReceiptAccountType.UBER_EATS:
    //   return UberEatsIcon;
    // case ReceiptAccountType.ULTA:
    //   return UltaIcon;
    // case ReceiptAccountType.VONS:
    //   return VonsIcon;
    // case ReceiptAccountType.WALGREENS:
    //   return WalgreensIcon;
    // case ReceiptAccountType.WALMART:
    //   return WalmartIcon;
    // case ReceiptAccountType.WALMART_CANADA:
    //   return WalmartCanadaIcon;
    // case ReceiptAccountType.WEGMANS:
    //   return WegmansIcon;
    default:
      throw Error("Unsupported ReceiptAccountType");
  }
};

/**
 * Converts an email provider to a {@link ReceiptAccountType}.
 * @param provider - The account provider, such as AccountProvider.GMAIL.
 * @returns The corresponding receipt account type, or undefined if not supported.
 */
export const fromEmailProvider = (
  provider?: AccountProvider,
): ReceiptAccountType | undefined => {
  if (provider === undefined) return undefined;
  switch (provider) {
    case AccountProvider.GMAIL:
      return ReceiptAccountType.GMAIL;
    default:
      return undefined;
  }
};

/**
 * Converts a {@link ReceiptAccountType} to an email provider.
 * @param type - The receipt account type.
 * @returns The corresponding email provider, or undefined if not supported.
 */
export const toEmailProvider = (
  type: ReceiptAccountType,
): AccountProvider | undefined => {
  switch (type) {
    case ReceiptAccountType.GMAIL:
      return AccountProvider.GMAIL;
    default:
      return undefined;
  }
};
