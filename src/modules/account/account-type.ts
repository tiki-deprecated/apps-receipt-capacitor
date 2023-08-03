/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import GmailIcon from "@/assets/images/gmail.png";
import { AccountProvider } from "@mytiki/tiki-capture-receipt-capacitor";

export enum AccountType {
  // ACME = "ACME",
  // ALBERTSONS = "Albertsons",
  // AMAZON = "Amazon",
  // AOL = "AOL",
  // BBB = "Bed Bath & Beyond",
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

export const icon = (type: AccountType): Object => {
  switch (type) {
    // case AccountType.ACME:
    //   return AcmeIcon;
    // case AccountType.ALBERTSONS:
    //   return AlbertsonsIcon;
    // case AccountType.AMAZON:
    //   return AmazonIcon;
    // case AccountType.AOL:
    //   return AolIcon;
    // case AccountType.BBB:
    //   return BedBathBeyondIcon;
    // case AccountType.BEST_BUY:
    //   return BestBuyIcon;
    // case AccountType.BJS:
    //   return BJSIcon;
    // case AccountType.CHEWY:
    //   return ChewyIcon;
    // case AccountType.COSTCO:
    //   return CostcoIcon;
    // case AccountType.CVS:
    //   return CVSIcon;
    // case AccountType.DICKS:
    //   return DicksIcon;
    // case AccountType.DOLLAR_GENERAL:
    //   return DollarGeneralIcon;
    // case AccountType.DOLLAR_TREE:
    //   return DollarTreeIcon;
    // case AccountType.DOMINOS:
    //   return DominosIcon;
    // case AccountType.DOOR_DASH:
    //   return DoorDashIcon;
    // case AccountType.DRIZLY:
    //   return DrizlyIcon;
    // case AccountType.FAMILY_DOLLAR:
    //   return FamilyDollarIcon;
    // case AccountType.FOOD_4_LESS:
    //   return Food4LessIcon;
    // case AccountType.FOOD_LION:
    //   return FoodLionIcon;
    // case AccountType.FRED_MEYER:
    //   return FredMeyerIcon;
    // case AccountType.GAP:
    //   return GapIcon;
    // case AccountType.GIANT_EAGLE:
    //   return GiantEagleIcon;
    case AccountType.GMAIL:
      return GmailIcon;
    // case AccountType.GRUBHUB:
    //   return GrubHubIcon;
    // case AccountType.HARRIS_TEETER:
    //   return HarrisTeeterIcon;
    // case AccountType.HEB:
    //   return HEBIcon;
    // case AccountType.HOME_DEPOT:
    //   return HomeDepotIcon;
    // case AccountType.HY_VEE:
    //   return HyVeeIcon;
    // case AccountType.INSTACART:
    //   return InstacartIcon;
    // case AccountType.JEWEL_OSCO:
    //   return JewelOscoIcon;
    // case AccountType.KOHLS:
    //   return KohlsIcon;
    // case AccountType.KROGER:
    //   return KrogerIcon;
    // case AccountType.LOWES:
    //   return LowesIcon;
    // case AccountType.MACYS:
    //   return MacysIcon;
    // case AccountType.MARSHALLS:
    //   return MarshallsIcon;
    // case AccountType.MEIJER:
    //   return MeijerIcon;
    // case AccountType.NIKE:
    //   return NikeIcon;
    // case AccountType.PUBLIX:
    //   return PublixIcon;
    // case AccountType.RALPHS:
    //   return RalphsIcon;
    // case AccountType.RITE_AID:
    //   return RiteAidIcon;
    // case AccountType.SAFEWAY:
    //   return SafewayIcon;
    // case AccountType.SAMS_CLUB:
    //   return SamsClubIcon;
    // case AccountType.SEAMLESS:
    //   return SeamlessIcon;
    // case AccountType.SEPHORA:
    //   return SephoraIcon;
    // case AccountType.SHIPT:
    //   return ShiptIcon;
    // case AccountType.SHOP_RITE:
    //   return ShopRiteIcon;
    // case AccountType.SPROUTS:
    //   return SproutsIcon;
    // case AccountType.STAPLES:
    //   return StaplesIcon;
    // case AccountType.STAPLES_CANADA:
    //   return StaplesCanadaIcon;
    // case AccountType.STARBUCKS:
    //   return StarbucksIcon;
    // case AccountType.TACO_BELL:
    //   return TacoBellIcon;
    // case AccountType.TARGET:
    //   return TargetIcon;
    // case AccountType.TJ_MAXX:
    //   return TJMaxxIcon;
    // case AccountType.UBER_EATS:
    //   return UberEatsIcon;
    // case AccountType.ULTA:
    //   return UltaIcon;
    // case AccountType.VONS:
    //   return VonsIcon;
    // case AccountType.WALGREENS:
    //   return WalgreensIcon;
    // case AccountType.WALMART:
    //   return WalmartIcon;
    // case AccountType.WALMART_CANADA:
    //   return WalmartCanadaIcon;
    // case AccountType.WEGMANS:
    //   return WegmansIcon;
    default:
      throw Error("Unsupported AccountType");
  }
};

export const fromEmailProvider = (
  provider?: AccountProvider,
): AccountType | undefined => {
  if (provider === undefined) return undefined;
  switch (provider) {
    case AccountProvider.GMAIL:
      return AccountType.GMAIL;
    default:
      return undefined;
  }
};

export const toEmailProvider = (
  type: AccountType,
): AccountProvider | undefined => {
  switch (type) {
    case AccountType.GMAIL:
      return AccountProvider.GMAIL;
    default:
      return undefined;
  }
};

export const types: Map<string, AccountType> = new Map(
  Object.values(AccountType).map((value) => [`${value}`, value] as const),
);
