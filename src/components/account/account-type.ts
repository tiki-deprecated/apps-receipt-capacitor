/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import AcmeIcon from "../../src/assets/images/acme.png";
import AlbertsonsIcon from "../../src/assets/images/albertsons.png";
import AmazonIcon from "../../src/assets/images/amazon.png";
//import AolIcon from "@/assets/images/aol.png";
import BedBathAndBeyondIcon from "../../src/assets/images/bed-bath-beyond.png";
import BestBuyIcon from "../../src/assets/images/best-buy.png";
import BJsIcon from "../../src/assets/images/bjs.png";
import ChewyIcon from "../../src/assets/images/chewy.png";
import CostcoIcon from "../../src/assets/images/costco.png";
import CVSIcon from "../../src/assets/images/cvs.png";
import DicksIcon from "../../src/assets/images/dicks.png";
import DollarGeneralIcon from "../../src/assets/images/dollar-general.png";
import DollarTreeIcon from "../../src/assets/images/dollar-tree.png";
import DominosIcon from "../../src/assets/images/dominos.png";
import DoorDashIcon from "../../src/assets/images/door-dash.png";
import DrizlyIcon from "../../src/assets/images/drizly.png";
import FamilyDollarIcon from "../../src/assets/images/family-dollar.png";
import Food4LessIcon from "../../src/assets/images/food-4-less.png";
import FoodLionIcon from "../../src/assets/images/food-lion.png";
import FredMeyerIcon from "../../src/assets/images/fred-meyer.png";
import GapIcon from "../../src/assets/images/gap.png";
import GiantEagleIcon from "../../src/assets/images/giant-eagle.png";
import GmailIcon from "../../src/assets/images/gmail.png";
import GrubHubIcon from "../../src/assets/images/grubhub.png";
import HarrisTeeterIcon from "../../src/assets/images/harris-teeter.png";
import HEBIcon from "../../src/assets/images/heb.png";
import HomeDepotIcon from "../../src/assets/images/home-depot.png";
import HyVeeIcon from "../../src/assets/images/hy-vee.png";
import InstacartIcon from "../../src/assets/images/instacart.png";
import JewelOscoIcon from "../../src/assets/images/jewel-osco.png";
import KohlsIcon from "../../src/assets/images/kohls.png";
import KrogerIcon from "../../src/assets/images/kroger.png";
import LowesIcon from "../../src/assets/images/lowes.png";
import MacysIcon from "../../src/assets/images/macys.png";
import MarshallsIcon from "../../src/assets/images/marshalls.png";
import MeijerIcon from "../../src/assets/images/meijer.png";
import NikeIcon from "../../src/assets/images/nike.png";
//import OutlookIcon from "@/assets/images/outlook.png";
import PublixIcon from "../../src/assets/images/publix.png";
import RalphsIcon from "../../src/assets/images/ralphs.png";
import RiteAidIcon from "../../src/assets/images/rite-aid.png";
import SafewayIcon from "../../src/assets/images/safeway.png";
import SamsClubIcon from "../../src/assets/images/sams-club.png";
import SeamlessIcon from "../../src/assets/images/seamless.png";
import SephoraIcon from "../../src/assets/images/sephora.png";
import ShiptIcon from "../../src/assets/images/shipt.png";
import ShopRiteIcon from "../../src/assets/images/shop-rite.png";
import SproutsIcon from "../../src/assets/images/sprouts.png";
import StaplesIcon from "../../src/assets/images/staples.png";
import StaplesCanadaIcon from "../../src/assets/images/staples-canada.png";
import StarbucksIcon from "../../src/assets/images/starbucks.png";
import TacoBellIcon from "../../src/assets/images/tacobell.png";
import TargetIcon from "../../src/assets/images/target.png";
import TJMaxxIcon from "../../src/assets/images/tj-maxx.png";
import UberEatsIcon from "../../src/assets/images/uber-eats.png";
import UltaIcon from "../../src/assets/images/ulta.png";
import VonsIcon from "../../src/assets/images/vons.png";
import WalgreensIcon from "../../src/assets/images/walgreens.png";
import WalmartIcon from "../../src/assets/images/walmart.png";
import WalmartCanadaIcon from "../../src/assets/images/walmart-canada.png";
import WegmansIcon from "../../src/assets/images/wegmans.png";
//import YahooIcon from "@/assets/images/yahoo.png";

export interface AccountType {
  type: "EMAIL" | "RETAILER";
  name: string;
  icon?: string;
  key: string;
}

/**
 * CME Markets account type
 */
export const CME_MARKETS: AccountType = {
  type: "RETAILER",
  name: "Acme",
  icon: AcmeIcon,
  key: "CME_MARKETS",
};
/**
 * Albertsons account type.
 */
export const ALBERTSONS: AccountType = {
  type: "RETAILER",
  icon: AlbertsonsIcon,
  name: "Albertsons",
  key: "ALBERTSONS",
};
/**
 * Amazon account type.
 */
export const AMAZON: AccountType = {
  type: "RETAILER",
  icon: AmazonIcon,
  name: "Amazon",
  key: "AMAZON",
};
/**
 * Amazon Canada account type.
 */
export const AMAZON_CA: AccountType = {
  type: "RETAILER",
  icon: AmazonIcon,
  name: "Amazon Canada",
  key: "AMAZON_CA",
};
/**
 * Amazon United Kingdom account type.
 */
export const AMAZON_UK: AccountType = {
  type: "RETAILER",
  icon: AmazonIcon,
  name: "Amazon United Kingdom",
  key: "AMAZON_UK",
};
/**
 * AOL account type.
 */
// AOL = "AOL",
/**
 * Bed Bath & Beyond account type.
 */
export const BED_BATH_AND_BEYOND: AccountType = {
  type: "RETAILER",
  icon: BedBathAndBeyondIcon,
  name: "Bed Bath & Beyond",
  key: "BED_BATH_AND_BEYOND",
};
/**
 * Gmail account type.
 */
export const GMAIL: AccountType = {
  type: "EMAIL",
  icon: GmailIcon,
  name: "Gmail",
  key: "GMAIL",
};
/**
 * Best Buy account type.
 */
export const BESTBUY: AccountType = {
  type: "RETAILER",
  icon: BestBuyIcon,
  name: "Best Buy",
  key: "BESTBUY",
};
/**
 * BJ’s Wholesale Club account type.
 */
export const BJS_WHOLESALE: AccountType = {
  type: "RETAILER",
  icon: BJsIcon,
  name: "BJ’s Wholesale Club",
  key: "BJS_WHOLESALE",
};
/**
 * Chewy account type.
 */
export const CHEWY: AccountType = {
  type: "RETAILER",
  icon: ChewyIcon,
  name: "Chewy",
  key: "CHEWY",
};
/**
 * Costco account type.
 */
export const COSTCO: AccountType = {
  type: "RETAILER",
  icon: CostcoIcon,
  name: "Costco",
  key: "COSTCO",
};
/**
 * CVS account type.
 */
export const CVS: AccountType = {
  type: "RETAILER",
  icon: CVSIcon,
  name: "CVS",
  key: "CVS",
};
/**
 * Dick’s Sporting Goods account type.
 */
export const DICKS_SPORTING_GOODS: AccountType = {
  type: "RETAILER",
  icon: DicksIcon,
  name: "Dick’s Sporting Goods",
  key: "DICKS_SPORTING_GOODS",
};
/**
 * Dollar General account type.
 */
export const DOLLAR_GENERAL: AccountType = {
  type: "RETAILER",
  icon: DollarGeneralIcon,
  name: "Dollar General",
  key: "DOLLAR_GENERAL",
};
/**
 * DollarTree account type.
 */
export const DOLLAR_TREE: AccountType = {
  type: "RETAILER",
  icon: DollarTreeIcon,
  name: "DollarTree",
  key: "DOLLAR_TREE",
};
/**
 * Domino’s Pizza account type.
 */
export const DOMINOS_PIZZA: AccountType = {
  type: "RETAILER",
  icon: DominosIcon,
  name: "Domino’s Pizza",
  key: "DOMINOS_PIZZA",
};
/**
 * DoorDash account type.
 */
export const DOOR_DASH: AccountType = {
  type: "RETAILER",
  icon: DoorDashIcon,
  name: "DoorDash",
  key: "DOOR_DASH",
};
/**
 * Drizly account type.
 */
export const DRIZLY: AccountType = {
  type: "RETAILER",
  icon: DrizlyIcon,
  name: "Drizly",
  key: "DRIZLY",
};
/**
 * Family Dollar account type.
 */
export const FAMILY_DOLLAR: AccountType = {
  type: "RETAILER",
  icon: FamilyDollarIcon,
  name: "Family Dollar",
  key: "FAMILY_DOLLAR",
};
/**
 * Food 4 Less account type.
 */
export const FOOD_4_LESS: AccountType = {
  type: "RETAILER",
  icon: Food4LessIcon,
  name: "Food 4 Less",
  key: "FOOD_4_LESS",
};
/**
 * Food Lion account type.
 */
export const FOOD_LION: AccountType = {
  type: "RETAILER",
  icon: FoodLionIcon,
  name: "Food Lion",
  key: "FOOD_LION",
};
/**
 * Fred Meyer account type.
 */
export const FRED_MEYER: AccountType = {
  type: "RETAILER",
  icon: FredMeyerIcon,
  name: "Fred Meyer",
  key: "FRED_MEYER",
};
/**
 * GAP account type.
 */
export const GAP: AccountType = {
  type: "RETAILER",
  icon: GapIcon,
  name: "GAP",
  key: "GAP",
};
/**
 * Giant Eagle account type.
 */
export const GIANT_EAGLE: AccountType = {
  type: "RETAILER",
  icon: GiantEagleIcon,
  name: "Giant Eagle",
  key: "GIANT_EAGLE",
};
/**
 * Grubhub account type.
 */
export const GRUBHUB: AccountType = {
  type: "RETAILER",
  icon: GrubHubIcon,
  name: "Grubhub",
  key: "GRUBHUB",
};
/**
 * Harris Teeter account type.
 */
export const HARRIS_TEETER: AccountType = {
  type: "RETAILER",
  icon: HarrisTeeterIcon,
  name: "Harris Teeter",
  key: "HARRIS_TEETER",
};
/**
 * H.E.B account type.
 */
export const HEB: AccountType = {
  type: "RETAILER",
  icon: HEBIcon,
  name: "H.E.B",
  key: "HEB",
};
/**
 * Home Depot account type.
 */
export const HOME_DEPOT: AccountType = {
  type: "RETAILER",
  icon: HomeDepotIcon,
  name: "Home Depot",
  key: "HOME_DEPOT",
};
/**
 * HyVee account type.
 */
export const HYVEE: AccountType = {
  type: "RETAILER",
  icon: HyVeeIcon,
  key: "HYVEE",
  name: "HyVee",
};
/**
 * Instacart account type.
 */
export const INSTACART: AccountType = {
  type: "RETAILER",
  icon: InstacartIcon,
  name: "Instacart",
  key: "INSTACART",
};
/**
 * Jewel Osco account type.
 */
export const JEWEL_OSCO: AccountType = {
  type: "RETAILER",
  icon: JewelOscoIcon,
  name: "Jewel Osco",
  key: "JEWEL_OSCO",
};
/**
 * Kohl’s account type.
 */
export const KOHLS: AccountType = {
  type: "RETAILER",
  icon: KohlsIcon,
  name: "Kohl’s",
  key: "KOHLS",
};
/**
 * Kroger account type.
 */
export const KROGER: AccountType = {
  type: "RETAILER",
  icon: KrogerIcon,
  name: "Kroger",
  key: "KROGER",
};
/**
 * Lowe’s account type.
 */
export const LOWES: AccountType = {
  type: "RETAILER",
  icon: LowesIcon,
  name: "Lowe’s",
  key: "LOWES",
};
/**
 * Macy’s account type.
 */
export const MACYS: AccountType = {
  type: "RETAILER",
  icon: MacysIcon,
  name: "Macy’s",
  key: "MACYS",
};
/**
 * Marshalls account type.
 */
export const MARSHALLS: AccountType = {
  type: "RETAILER",
  icon: MarshallsIcon,
  name: "Marshalls",
  key: "MARSHALLS",
};
/**
 * Meijer account type.
 */
export const MEIJER: AccountType = {
  type: "RETAILER",
  icon: MeijerIcon,
  name: "Meijer",
  key: "MEIJER",
};
/**
 * Nike account type.
 */
export const NIKE: AccountType = {
  type: "RETAILER",
  icon: NikeIcon,
  name: "Nike",
  key: "NIKE",
};
/**
 * Microsoft Outlook account type.
 */
// export const OUTLOOK: AccountType =  {
//   name:"Outlook",
//   type: "Email",
//   icon: "",
// }
/**
 * Publix account type.
 */
export const PUBLIX: AccountType = {
  type: "RETAILER",
  icon: PublixIcon,
  name: "Publix",
  key: "PUBLIX",
};
/**
 * Ralphs account type.
 */
export const RALPHS: AccountType = {
  type: "RETAILER",
  icon: RalphsIcon,
  name: "Ralphs",
  key: "RALPHS",
};
/**
 * RiteAid account type.
 */
export const RITE_AID: AccountType = {
  type: "RETAILER",
  icon: RiteAidIcon,
  name: "RiteAid",
  key: "RITE_AID",
};
/**
 * Safeway account type.
 */
export const SAFEWAY: AccountType = {
  type: "RETAILER",
  icon: "",
  name: "Safeway",
  key: "SAFEWAY",
};
/**
 * Sam’s Club account type.
 */
export const SAMS_CLUB: AccountType = {
  type: "RETAILER",
  icon: SamsClubIcon,
  name: "Sam’s Club",
  key: "SAMS_CLUB",
};
/**
 * Seamless account type.
 */
export const SEAMLESS: AccountType = {
  type: "RETAILER",
  icon: SeamlessIcon,
  name: "Seamless",
  key: "SEAMLESS",
};
/**
 * Sephora account type.
 */
export const SEPHORA: AccountType = {
  type: "RETAILER",
  icon: SephoraIcon,
  name: "Sephora",
  key: "SEPHORA",
};
/**
 * Shipt account type.
 */
export const SHIPT: AccountType = {
  type: "RETAILER",
  icon: ShiptIcon,
  name: "Shipt",
  key: "SHIPT",
};
/**
 * ShopRite account type.
 */
export const SHOPRITE: AccountType = {
  type: "RETAILER",
  icon: ShopRiteIcon,
  name: "Shoprite",
  key: "SHOPRITE",
};
/**
 * Sprouts account type.
 */
export const SPROUTS: AccountType = {
  type: "RETAILER",
  icon: SproutsIcon,
  name: "Sprouts",
  key: "SPROUTS",
};
/**
 * Staples account type.
 */
export const STAPLES: AccountType = {
  type: "RETAILER",
  icon: StaplesIcon,
  name: "Staples",
  key: "STAPLES",
};
/**
 * Staples Canada account type.
 */
export const STAPLES_CA: AccountType = {
  type: "RETAILER",
  icon: StaplesCanadaIcon,
  name: "Staples Canada",
  key: "STAPLES_CA",
};
/**
 * Starbucks account type.
 */
export const STARBUCKS: AccountType = {
  type: "RETAILER",
  icon: StarbucksIcon,
  name: "Starbucks",
  key: "STARBUCKS",
};
/**
 * Taco Bell account type.
 */
export const TACO_BELL: AccountType = {
  type: "RETAILER",
  icon: TacoBellIcon,
  name: "Taco Bell",
  key: "TACO_BELL",
};
/**
 * Target account type.
 */
export const TARGET: AccountType = {
  type: "RETAILER",
  icon: TargetIcon,
  name: "Target",
  key: "TARGET",
};
/**
 * T.J.Maxx account type.
 */
export const TJ_MAXX: AccountType = {
  type: "RETAILER",
  icon: TJMaxxIcon,
  name: "T.J.Maxx",
  key: "TJ_MAXX",
};
/**
 * UberEats account type.
 */
export const UBER_EATS: AccountType = {
  type: "RETAILER",
  icon: UberEatsIcon,
  name: "UberEats",
  key: "UBER_EATS",
};
/**
 * Ulta account type.
 */
export const ULTA: AccountType = {
  type: "RETAILER",
  icon: UltaIcon,
  name: "Ulta",
  key: "ULTA",
};
/**
 * Vons account type.
 */
export const VONS: AccountType = {
  type: "RETAILER",
  icon: VonsIcon,
  name: "Vons",
  key: "VONS",
};
/**}
 * Walgreens account type.
 */
export const WALGREENS: AccountType = {
  type: "RETAILER",
  icon: WalgreensIcon,
  name: "Walgreens",
  key: "WALGREENS",
};
/**
 * Walmart account type.
 */
export const WALMART: AccountType = {
  type: "RETAILER",
  icon: WalmartIcon,
  name: "Walmart",
  key: "WALMART",
};
/**
 * Walmart Canada account type.
 */
export const WALMART_CA: AccountType = {
  type: "RETAILER",
  icon: WalmartCanadaIcon,
  name: "Walmart Canada",
  key: "WALMART_CA",
};
/**
 * Wegman’s account type.
 */
export const WEGMANS: AccountType = {
  type: "RETAILER",
  icon: WegmansIcon,
  name: "Wegman’s",
  key: "WEGMANS",
};

// export const YAHOO: AccountType = {
//   type: "Email",
//   icon: '',
//   name: "Yahoo",
//   key: "YAHOO"
// }

export const findByKey = (key: string): AccountType | undefined =>
  index.get(key);

const index: Map<string, AccountType> = new Map([
  [ALBERTSONS.key, ALBERTSONS],
  [AMAZON.key, AMAZON],
  [AMAZON_CA.key, AMAZON_CA],
  [AMAZON_UK.key, AMAZON_UK],
  //[AOL.key, AOL]
  [BED_BATH_AND_BEYOND.key, BED_BATH_AND_BEYOND],
  [GMAIL.key, GMAIL],
  [BESTBUY.key, BESTBUY],
  [BJS_WHOLESALE.key, BJS_WHOLESALE],
  [CHEWY.key, CHEWY],
  [COSTCO.key, COSTCO],
  [CVS.key, CVS],
  [DICKS_SPORTING_GOODS.key, DICKS_SPORTING_GOODS],
  [DOLLAR_GENERAL.key, DOLLAR_GENERAL],
  [DOLLAR_TREE.key, DOLLAR_TREE],
  [DOMINOS_PIZZA.key, DOMINOS_PIZZA],
  [DOOR_DASH.key, DOOR_DASH],
  [DRIZLY.key, DRIZLY],
  [FAMILY_DOLLAR.key, FAMILY_DOLLAR],
  [FOOD_4_LESS.key, FOOD_4_LESS],
  [FOOD_LION.key, FOOD_LION],
  [FRED_MEYER.key, FRED_MEYER],
  [GAP.key, GAP],
  [GIANT_EAGLE.key, GIANT_EAGLE],
  [GRUBHUB.key, GRUBHUB],
  [HARRIS_TEETER.key, HARRIS_TEETER],
  [HEB.key, HEB],
  [HOME_DEPOT.key, HOME_DEPOT],
  [HYVEE.key, HYVEE],
  [INSTACART.key, INSTACART],
  [JEWEL_OSCO.key, JEWEL_OSCO],
  [KOHLS.key, KOHLS],
  [KROGER.key, KROGER],
  [LOWES.key, LOWES],
  [MACYS.key, MACYS],
  [MARSHALLS.key, MARSHALLS],
  [MEIJER.key, MEIJER],
  [NIKE.key, NIKE],
  //[OUTLOOK.key, OUTLOOK],
  [RALPHS.key, RALPHS],
  [RITE_AID.key, RITE_AID],
  [SAFEWAY.key, SAFEWAY],
  [SAMS_CLUB.key, SAMS_CLUB],
  [SEAMLESS.key, SEAMLESS],
  [SEPHORA.key, SEPHORA],
  [SHIPT.key, SHIPT],
  [SHOPRITE.key, SHOPRITE],
  [SPROUTS.key, SPROUTS],
  [STAPLES.key, STAPLES],
  [STAPLES_CA.key, STAPLES_CA],
  [STARBUCKS.key, STARBUCKS],
  [TACO_BELL.key, TACO_BELL],
  [TARGET.key, TARGET],
  [TJ_MAXX.key, TJ_MAXX],
  [UBER_EATS.key, UBER_EATS],
  [ULTA.key, ULTA],
  [VONS.key, VONS],
  [WALGREENS.key, WALGREENS],
  [WALMART.key, WALMART],
  [WALMART_CA.key, WALMART_CA],
  [WEGMANS.key, WEGMANS],
  //[YAHOO.key, YAHOO],
]);
