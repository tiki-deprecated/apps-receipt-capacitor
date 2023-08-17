/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import AcmeIcon from "@/assets/images/acme.png";
import AlbertsonsIcon from "@/assets/images/albertsons.png";
import AmazonIcon from "@/assets/images/amazon.png";
import AolIcon from "@/assets/images/aol.png";
import BedBathAndBeyondIcon from "@/assets/images/bed-bath-beyond.png";
import BestBuyIcon from "@/assets/images/best-buy.png";
import BJsIcon from "@/assets/images/bjs.png";
import ChewyIcon from "@/assets/images/chewy.png";
import CostcoIcon from "@/assets/images/costco.png";
import CVSIcon from "@/assets/images/cvs.png";
import DicksIcon from "@/assets/images/dicks.png";
import DollarGeneralIcon from "@/assets/images/dollar-general.png";
import DollarTreeIcon from "@/assets/images/dollar-tree.png";
import DominosIcon from "@/assets/images/dominos.png";
import DoorDashIcon from "@/assets/images/door-dash.png";
import DrizlyIcon from "@/assets/images/drizly.png";
import FamilyDollarIcon from "@/assets/images/family-dollar.png";
import Food4LessIcon from "@/assets/images/food-4-less.png";
import FoodLionIcon from "@/assets/images/food-lion.png";
import FredMeyerIcon from "@/assets/images/fred-meyer.png";
import GapIcon from "@/assets/images/gap.png";
import GiantEagleIcon from "@/assets/images/giant-eagle.png";
import GmailIcon from "@/assets/images/gmail.png";
import GrubHubIcon from "@/assets/images/grubhub.png";
import HarrisTeeterIcon from "@/assets/images/harris-teeter.png";
import HEBIcon from "@/assets/images/heb.png";
import HomeDepotIcon from "@/assets/images/home-depot.png";
import HyVeeIcon from "@/assets/images/hy-vee.png";
import InstacartIcon from "@/assets/images/instacart.png";
import JewelOscoIcon from "@/assets/images/jewel-osco.png";
import KohlsIcon from "@/assets/images/kohls.png";
import KrogerIcon from "@/assets/images/kroger.png";
import LowesIcon from "@/assets/images/lowes.png";
import MacysIcon from "@/assets/images/macys.png";
import MarshallsIcon from "@/assets/images/marshalls.png";
import MeijerIcon from "@/assets/images/meijer.png";
import NikeIcon from "@/assets/images/nike.png";
import OutlookIcon from "@/assets/images/outlook.png";
import PublixIcon from "@/assets/images/publix.png";
import RalphsIcon from "@/assets/images/ralphs.png";
import RiteAidIcon from "@/assets/images/rite-aid.png";
import SafewayIcon from "@/assets/images/safeway.png";
import SamsClubIcon from "@/assets/images/sams-club.png";
import SeamlessIcon from "@/assets/images/seamless.png";
import SephoraIcon from "@/assets/images/sephora.png";
import ShiptIcon from "@/assets/images/shipt.png";
import ShopRiteIcon from "@/assets/images/shop-rite.png";
import SproutsIcon from "@/assets/images/sprouts.png";
import StaplesIcon from "@/assets/images/staples.png";
import StaplesCanadaIcon from "@/assets/images/staples-canada.png";
import StarbucksIcon from "@/assets/images/starbucks.png";
import TacoBellIcon from "@/assets/images/tacobell.png";
import TargetIcon from "@/assets/images/target.png";
import TJMaxxIcon from "@/assets/images/tj-maxx.png";
import UberEatsIcon from "@/assets/images/uber-eats.png";
import UltaIcon from "@/assets/images/ulta.png";
import VonsIcon from "@/assets/images/vons.png";
import WalgreensIcon from "@/assets/images/walgreens.png";
import WalmartIcon from "@/assets/images/walmart.png";
import WalmartCanadaIcon from "@/assets/images/walmart-canada.png";
import WegmansIcon from "@/assets/images/wegmans.png";
import YahooIcon from "@/assets/images/yahoo.png";

import { AccountProvider } from "@mytiki/tiki-capture-receipt-capacitor";

/**
 * Enumeration of the supported account types.
 */
export enum ReceiptAccountType {
  /**
   * ACME Markets account type.
   */
  ACME_MARKETS = "ACME",

  /**
   * Albertsons account type.
   */
  ALBERTSONS = "Albertsons",

  /**
   * Amazon account type.
   */
  AMAZON = "Amazon",

  /**
   * Amazon Canada account type.
   */
  AMAZON_CA = "Amazon Canada",

  /**
   * Amazon United Kingdom account type.
   */
  AMAZON_UK = "Amazon United Kingdom",

  /**
   * AOL account type.
   */
  AOL = "AOL",

  /**
   * Bed Bath & Beyond account type.
   */
  BED_BATH_AND_BEYOND = "Bed Bath & Beyond",

  /**
   * Gmail account type.
   */
  GMAIL = "Gmail",

  /**
   * Best Buy account type.
   */
  BESTBUY = "Best Buy",

  /**
   * BJ’s Wholesale Club account type.
   */
  BJS_WHOLESALE = "BJ’s Wholesale Club",

  /**
   * Chewy account type.
   */
  CHEWY = "Chewy",

  /**
   * Costco account type.
   */
  COSTCO = "Costco",

  /**
   * CVS account type.
   */
  CVS = "CVS",

  /**
   * Dick’s Sporting Goods account type.
   */
  DICKS_SPORTING_GOODS = "Dick’s Sporting Goods",

  /**
   * Dollar General account type.
   */
  DOLLAR_GENERAL = "Dollar General",

  /**
   * DollarTree account type.
   */
  DOLLAR_TREE = "DollarTree",

  /**
   * Domino’s Pizza account type.
   */
  DOMINOS_PIZZA = "Domino’s Pizza",

  /**
   * DoorDash account type.
   */
  DOOR_DASH = "DoorDash",

  /**
   * Drizly account type.
   */
  DRIZLY = "Drizly",

  /**
   * Family Dollar account type.
   */
  FAMILY_DOLLAR = "Family Dollar",
  /**
   * Food 4 Less account type.
   */
  FOOD_4_LESS = "Food 4 Less",

  /**
   * Food Lion account type.
   */
  FOOD_LION = "Food Lion",

  /**
   * Fred Meyer account type.
   */
  FRED_MEYER = "Fred Meyer",

  /**
   * GAP account type.
   */
  GAP = "GAP",

  /**
   * Giant Eagle account type.
   */
  GIANT_EAGLE = "Giant Eagle",

  /**
   * Grubhub account type.
   */
  GRUBHUB = "Grubhub",

  /**
   * Harris Teeter account type.
   */
  HARRIS_TEETER = "Harris Teeter",

  /**
   * H.E.B account type.
   */
  HEB = "H.E.B",

  /**
   * Home Depot account type.
   */
  HOME_DEPOT = "Home Depot",

  /**
   * HyVee account type.
   */
  HYVEE = "HyVee",

  /**
   * Instacart account type.
   */
  INSTACART = "Instacart",

  /**
   * Jewel Osco account type.
   */
  JEWEL_OSCO = "Jewel Osco",

  /**
   * Kohl’s account type.
   */
  KOHLS = "Kohl’s",

  /**
   * Kroger account type.
   */
  KROGER = "Kroger",

  /**
   * Lowe’s account type.
   */
  LOWES = "Lowe’s",

  /**
   * Macy’s account type.
   */
  MACYS = "Macy’s",

  /**
   * Marshalls account type.
   */
  MARSHALLS = "Marshalls",

  /**
   * Meijer account type.
   */
  MEIJER = "Meijer",

  /**
   * Nike account type.
   */
  NIKE = "Nike",
  /**
   * Microsoft Outlook account type.
   */
  OUTLOOK = "Outlook",

  /**
   * Publix account type.
   */
  PUBLIX = "Publix",

  /**
   * Ralphs account type.
   */
  RALPHS = "Ralphs",

  /**
   * RiteAid account type.
   */
  RITE_AID = "RiteAid",

  /**
   * Safeway account type.
   */
  SAFEWAY = "Safeway",

  /**
   * Sam’s Club account type.
   */
  SAMS_CLUB = "Sam’s Club",

  /**
   * Seamless account type.
   */
  SEAMLESS = "Seamless",

  /**
   * Sephora account type.
   */
  SEPHORA = "Sephora",

  /**
   * Shipt account type.
   */
  SHIPT = "Shipt",

  /**
   * ShopRite account type.
   */
  SHOPRITE = "ShopRite",

  /**
   * Sprouts account type.
   */
  SPROUTS = "Sprouts",

  /**
   * Staples account type.
   */
  STAPLES = "Staples",

  /**
   * Staples Canada account type.
   */
  STAPLES_CA = "Staples Canada",

  /**
   * Starbucks account type.
   */
  STARBUCKS = "Starbucks",

  /**
   * Taco Bell account type.
   */
  TACO_BELL = "Taco Bell",

  /**
   * Target account type.
   */
  TARGET = "Target",

  /**
   * T.J.Maxx account type.
   */
  TJ_MAXX = "T.J.Maxx",

  /**
   * UberEats account type.
   */
  UBER_EATS = "UberEats",

  /**
   * Ulta account type.
   */
  ULTA = "Ulta",

  /**
   * Vons account type.
   */
  VONS = "Vons",
  /**
   * Walgreens account type.
   */
  WALGREENS = "Walgreens",

  /**
   * Walmart account type.
   */
  WALMART = "Walmart",

  /**
   * Walmart Canada account type.
   */
  WALMART_CA = "Walmart Canada",

  /**
   * Wegman’s account type.
   */
  WEGMANS = "Wegman’s",

  /**
   * Yahoo account type.
   */
  YAHOO = "Yahoo",
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

export const toString = (type: string): string => {
  return Object.keys(ReceiptAccountType)
    .find((val) => type.toLowerCase() === val.toLowerCase())!
    .toLowerCase();
};
/**
 * Gets the icon (image src) associated with a {@link ReceiptAccountType}.
 * @param type - The receipt account type.
 * @returns The icon string associated with the receipt account type.
 * @throws Error if the receipt account type is not supported.
 */
export const icon = (type: ReceiptAccountType): string => {
  const retailer = Object.values(ReceiptAccountType).find(
    (retailer) => type.toLowerCase() === retailer.toLowerCase(),
  );
  switch (retailer) {
    case ReceiptAccountType.ACME_MARKETS:
      return AcmeIcon;
    case ReceiptAccountType.ALBERTSONS:
      return AlbertsonsIcon;
    case ReceiptAccountType.AMAZON:
      return AmazonIcon;
    case ReceiptAccountType.AMAZON_CA:
      return AmazonIcon;
    case ReceiptAccountType.AMAZON_UK:
      return AmazonIcon;
    case ReceiptAccountType.AOL:
      return AolIcon;
    case ReceiptAccountType.BED_BATH_AND_BEYOND:
      return BedBathAndBeyondIcon;
    case ReceiptAccountType.BESTBUY:
      return BestBuyIcon;
    case ReceiptAccountType.BJS_WHOLESALE:
      return BJsIcon;
    case ReceiptAccountType.CHEWY:
      return ChewyIcon;
    case ReceiptAccountType.COSTCO:
      return CostcoIcon;
    case ReceiptAccountType.CVS:
      return CVSIcon;
    case ReceiptAccountType.DICKS_SPORTING_GOODS:
      return DicksIcon;
    case ReceiptAccountType.DOLLAR_GENERAL:
      return DollarGeneralIcon;
    case ReceiptAccountType.DOLLAR_TREE:
      return DollarTreeIcon;
    case ReceiptAccountType.DOMINOS_PIZZA:
      return DominosIcon;
    case ReceiptAccountType.DOOR_DASH:
      return DoorDashIcon;
    case ReceiptAccountType.DRIZLY:
      return DrizlyIcon;
    case ReceiptAccountType.FAMILY_DOLLAR:
      return FamilyDollarIcon;
    case ReceiptAccountType.FOOD_4_LESS:
      return Food4LessIcon;
    case ReceiptAccountType.FOOD_LION:
      return FoodLionIcon;
    case ReceiptAccountType.FRED_MEYER:
      return FredMeyerIcon;
    case ReceiptAccountType.GAP:
      return GapIcon;
    case ReceiptAccountType.GIANT_EAGLE:
      return GiantEagleIcon;
    case ReceiptAccountType.GMAIL:
      return GmailIcon;
    case ReceiptAccountType.GRUBHUB:
      return GrubHubIcon;
    case ReceiptAccountType.HARRIS_TEETER:
      return HarrisTeeterIcon;
    case ReceiptAccountType.HEB:
      return HEBIcon;
    case ReceiptAccountType.HOME_DEPOT:
      return HomeDepotIcon;
    case ReceiptAccountType.HYVEE:
      return HyVeeIcon;
    case ReceiptAccountType.INSTACART:
      return InstacartIcon;
    case ReceiptAccountType.JEWEL_OSCO:
      return JewelOscoIcon;
    case ReceiptAccountType.KOHLS:
      return KohlsIcon;
    case ReceiptAccountType.KROGER:
      return KrogerIcon;
    case ReceiptAccountType.LOWES:
      return LowesIcon;
    case ReceiptAccountType.MACYS:
      return MacysIcon;
    case ReceiptAccountType.MARSHALLS:
      return MarshallsIcon;
    case ReceiptAccountType.MEIJER:
      return MeijerIcon;
    case ReceiptAccountType.NIKE:
      return NikeIcon;
    case ReceiptAccountType.OUTLOOK:
      return OutlookIcon;
    case ReceiptAccountType.PUBLIX:
      return PublixIcon;
    case ReceiptAccountType.RALPHS:
      return RalphsIcon;
    case ReceiptAccountType.RITE_AID:
      return RiteAidIcon;
    case ReceiptAccountType.SAFEWAY:
      return SafewayIcon;
    case ReceiptAccountType.SAMS_CLUB:
      return SamsClubIcon;
    case ReceiptAccountType.SEAMLESS:
      return SeamlessIcon;
    case ReceiptAccountType.SEPHORA:
      return SephoraIcon;
    case ReceiptAccountType.SHIPT:
      return ShiptIcon;
    case ReceiptAccountType.SHOPRITE:
      return ShopRiteIcon;
    case ReceiptAccountType.SPROUTS:
      return SproutsIcon;
    case ReceiptAccountType.STAPLES:
      return StaplesIcon;
    case ReceiptAccountType.STAPLES_CA:
      return StaplesCanadaIcon;
    case ReceiptAccountType.STARBUCKS:
      return StarbucksIcon;
    case ReceiptAccountType.TACO_BELL:
      return TacoBellIcon;
    case ReceiptAccountType.TARGET:
      return TargetIcon;
    case ReceiptAccountType.TJ_MAXX:
      return TJMaxxIcon;
    case ReceiptAccountType.UBER_EATS:
      return UberEatsIcon;
    case ReceiptAccountType.ULTA:
      return UltaIcon;
    case ReceiptAccountType.VONS:
      return VonsIcon;
    case ReceiptAccountType.WALGREENS:
      return WalgreensIcon;
    case ReceiptAccountType.WALMART:
      return WalmartIcon;
    case ReceiptAccountType.WALMART_CA:
      return WalmartCanadaIcon;
    case ReceiptAccountType.WEGMANS:
      return WegmansIcon;
    case ReceiptAccountType.YAHOO:
      return YahooIcon;
    default:
      return "";
    //throw Error("Unsupported ReceiptAccountType");
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
    // case AccountProvider.AOL:
    //   return ReceiptAccountType.AOL;
    // case AccountProvider.YAHOO:
    //   return ReceiptAccountType.YAHOO;
    // case AccountProvider.OUTLOOK:
    //   return ReceiptAccountType.YAHOO;
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
