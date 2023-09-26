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
/**
 * Enumeration of the supported account types.
 */

export interface AccountType {
  type: "EMAIL" | "RETAILER";
  name: string;
  icon?: string;
  key: string;
}

export type ScanType = "PHYSICAL" | "EMAIL" | "RETAILER" | "ONLINE";

export class AccountTypeCommom {
  /**
   * CME Markets account type
   */
  static readonly CME_MARKETS: AccountType = {
    type: "RETAILER",
    name: "Acme",
    icon: AcmeIcon,
    key: "CME_MARKETS",
  };

  /**
   * Albertsons account type.
   */
  static readonly ALBERTSONS: AccountType = {
    type: "RETAILER",
    icon: AlbertsonsIcon,
    name: "Albertsons",
    key: "ALBERTSONS",
  };
  /**
   * Amazon account type.
   */
  static readonly AMAZON: AccountType = {
    type: "RETAILER",
    icon: AmazonIcon,
    name: "Amazon",
    key: "AMAZON",
  };
  /**
   * Amazon Canada account type.
   */
  static readonly AMAZON_CA: AccountType = {
    type: "RETAILER",
    icon: AmazonIcon,
    name: "Amazon Canada",
    key: "AMAZON_CA",
  };
  /**
   * Amazon United Kingdom account type.
   */
  static readonly AMAZON_UK: AccountType = {
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
  static readonly BED_BATH_AND_BEYOND: AccountType = {
    type: "RETAILER",
    icon: BedBathAndBeyondIcon,
    name: "Bed Bath & Beyond",
    key: "BED_BATH_AND_BEYOND",
  };
  /**
   * Gmail account type.
   */
  // static readonly GMAIL: AccountType = {
  //  name: "Gmail",
  //  type: "EMAIL",
  //  icon: GmailIcon,
  //  key: 'GMAIL'
  // }

  /**
   * Best Buy account type.
   */
  static readonly BESTBUY: AccountType = {
    type: "RETAILER",
    icon: BestBuyIcon,
    name: "Best Buy",
    key: "BESTBUY",
  };
  /**
   * BJ’s Wholesale Club account type.
   */
  static readonly BJS_WHOLESALE: AccountType = {
    type: "RETAILER",
    icon: BJsIcon,
    name: "BJ’s Wholesale Club",
    key: "BJS_WHOLESALE",
  };
  /**
   * Chewy account type.
   */
  static readonly CHEWY: AccountType = {
    type: "RETAILER",
    icon: ChewyIcon,
    name: "Chewy",
    key: "CHEWY",
  };
  /**
   * Costco account type.
   */
  static readonly COSTCO: AccountType = {
    type: "RETAILER",
    icon: CostcoIcon,
    name: "Costco",
    key: "COSTCO",
  };
  /**
   * CVS account type.
   */
  static readonly CVS: AccountType = {
    type: "RETAILER",
    icon: CVSIcon,
    name: "CVS",
    key: "CVS",
  };
  /**
   * Dick’s Sporting Goods account type.
   */
  static readonly DICKS_SPORTING_GOODS: AccountType = {
    type: "RETAILER",
    icon: DicksIcon,
    name: "Dick’s Sporting Goods",
    key: "DICKS_SPORTING_GOODS",
  };
  /**
   * Dollar General account type.
   */
  static readonly DOLLAR_GENERAL: AccountType = {
    type: "RETAILER",
    icon: DollarGeneralIcon,
    name: "Dollar General",
    key: "DOLLAR_GENERAL",
  };
  /**
   * DollarTree account type.
   */
  static readonly DOLLAR_TREE: AccountType = {
    type: "RETAILER",
    icon: DollarTreeIcon,
    name: "DollarTree",
    key: "DOLLAR_TREE",
  };
  /**
   * Domino’s Pizza account type.
   */
  static readonly DOMINOS_PIZZA: AccountType = {
    type: "RETAILER",
    icon: DominosIcon,
    name: "Domino’s Pizza",
    key: "DOMINOS_PIZZA",
  };
  /**
   * DoorDash account type.
   */
  static readonly DOOR_DASH: AccountType = {
    type: "RETAILER",
    icon: DoorDashIcon,
    name: "DoorDash",
    key: "DOOR_DASH",
  };
  /**
   * Drizly account type.
   */
  static readonly DRIZLY: AccountType = {
    type: "RETAILER",
    icon: DrizlyIcon,
    name: "Drizly",
    key: "DRIZLY",
  };
  /**
   * Family Dollar account type.
   */
  static readonly FAMILY_DOLLAR: AccountType = {
    type: "RETAILER",
    icon: FamilyDollarIcon,
    name: "Family Dollar",
    key: "FAMILY_DOLLAR",
  };
  /**
   * Food 4 Less account type.
   */
  static readonly FOOD_4_LESS: AccountType = {
    type: "RETAILER",
    icon: Food4LessIcon,
    name: "Food 4 Less",
    key: "FOOD_4_LESS",
  };
  /**
   * Food Lion account type.
   */
  static readonly FOOD_LION: AccountType = {
    type: "RETAILER",
    icon: FoodLionIcon,
    name: "Food Lion",
    key: "FOOD_LION",
  };
  /**
   * Fred Meyer account type.
   */
  static readonly FRED_MEYER: AccountType = {
    type: "RETAILER",
    icon: FredMeyerIcon,
    name: "Fred Meyer",
    key: "FRED_MEYER",
  };
  /**
   * GAP account type.
   */
  static readonly GAP: AccountType = {
    type: "RETAILER",
    icon: GapIcon,
    name: "GAP",
    key: "GAP",
  };
  /**
   * Giant Eagle account type.
   */
  static readonly GIANT_EAGLE: AccountType = {
    type: "RETAILER",
    icon: GiantEagleIcon,
    name: "Giant Eagle",
    key: "GIANT_EAGLE",
  };
  /**
   * Grubhub account type.
   */
  static readonly GRUBHUB: AccountType = {
    type: "RETAILER",
    icon: GrubHubIcon,
    name: "Grubhub",
    key: "GRUBHUB",
  };
  /**
   * Harris Teeter account type.
   */
  static readonly HARRIS_TEETER: AccountType = {
    type: "RETAILER",
    icon: HarrisTeeterIcon,
    name: "Harris Teeter",
    key: "HARRIS_TEETER",
  };
  /**
   * H.E.B account type.
   */
  static readonly HEB: AccountType = {
    type: "RETAILER",
    icon: HEBIcon,
    name: "H.E.B",
    key: "HEB",
  };
  /**
   * Home Depot account type.
   */
  static readonly HOME_DEPOT: AccountType = {
    type: "RETAILER",
    icon: HomeDepotIcon,
    name: "Home Depot",
    key: "HOME_DEPOT",
  };
  /**
   * HyVee account type.
   */
  static readonly HYVEE: AccountType = {
    type: "RETAILER",
    icon: HyVeeIcon,
    key: "HYVEE",
    name: "HyVee",
  };
  /**
   * Instacart account type.
   */
  static readonly INSTACART: AccountType = {
    type: "RETAILER",
    icon: InstacartIcon,
    name: "Instacart",
    key: "INSTACART",
  };
  /**
   * Jewel Osco account type.
   */
  static readonly JEWEL_OSCO: AccountType = {
    type: "RETAILER",
    icon: JewelOscoIcon,
    name: "Jewel Osco",
    key: "JEWEL_OSCO",
  };
  /**
   * Kohl’s account type.
   */
  static readonly KOHLS: AccountType = {
    type: "RETAILER",
    icon: KohlsIcon,
    name: "Kohl’s",
    key: "KOHLS",
  };
  /**
   * Kroger account type.
   */
  static readonly KROGER: AccountType = {
    type: "RETAILER",
    icon: KrogerIcon,
    name: "Kroger",
    key: "KROGER",
  };
  /**
   * Lowe’s account type.
   */
  static readonly LOWES: AccountType = {
    type: "RETAILER",
    icon: LowesIcon,
    name: "Lowe’s",
    key: "LOWES",
  };
  /**
   * Macy’s account type.
   */
  static readonly MACYS: AccountType = {
    type: "RETAILER",
    icon: MacysIcon,
    name: "Macy’s",
    key: "MACYS",
  };
  /**
   * Marshalls account type.
   */
  static readonly MARSHALLS: AccountType = {
    type: "RETAILER",
    icon: MarshallsIcon,
    name: "Marshalls",
    key: "MARSHALLS",
  };
  /**
   * Meijer account type.
   */
  static readonly MEIJER: AccountType = {
    type: "RETAILER",
    icon: MeijerIcon,
    name: "Meijer",
    key: "MEIJER",
  };
  /**
   * Nike account type.
   */
  static readonly NIKE: AccountType = {
    type: "RETAILER",
    icon: NikeIcon,
    name: "Nike",
    key: "NIKE",
  };
  /**}
   * Microsoft Outlook account type.
   */
  // static readonly OUTLOOK: AccountType =  {
  //   name:"Outlook",
  //   type: "Email",
  //   icon: "",
  // }

  /**
   * Publix account type.
   */
  static readonly PUBLIX: AccountType = {
    type: "RETAILER",
    icon: PublixIcon,
    name: "Publix",
    key: "PUBLIX",
  };
  /**
   * Ralphs account type.
   */
  static readonly RALPHS: AccountType = {
    type: "RETAILER",
    icon: RalphsIcon,
    name: "Ralphs",
    key: "RALPHS",
  };
  /**
   * RiteAid account type.
   */
  static readonly RITE_AID: AccountType = {
    type: "RETAILER",
    icon: RiteAidIcon,
    name: "RiteAid",
    key: "RITE_AID",
  };
  /**
   * Safeway account type.
   */
  static readonly AFEWAY: AccountType = {
    type: "RETAILER",
    icon: "",
    name: "Safeway",
    key: "AFEWAY",
  };
  /**
   * Sam’s Club account type.
   */
  static readonly SAMS_CLUB: AccountType = {
    type: "RETAILER",
    icon: SamsClubIcon,
    name: "Sam’s Club",
    key: "SAMS_CLUB",
  };
  /**
   * Seamless account type.
   */
  static readonly SEAMLESS: AccountType = {
    type: "RETAILER",
    icon: SeamlessIcon,
    name: "Seamless",
    key: "SEAMLESS",
  };
  /**
   * Sephora account type.
   */
  static readonly SEPHORA: AccountType = {
    type: "RETAILER",
    icon: SephoraIcon,
    name: "Sephora",
    key: "SEPHORA",
  };
  /**
   * Shipt account type.
   */
  static readonly SHIPT: AccountType = {
    type: "RETAILER",
    icon: ShiptIcon,
    name: "Shipt",
    key: "SHIPT",
  };
  /**
   * ShopRite account type.
   */
  static readonly SHOPRITE: AccountType = {
    type: "RETAILER",
    icon: ShopRiteIcon,
    name: "Shoprite",
    key: "SHOPRITE",
  };

  /**
   * Sprouts account type.
   */
  static readonly SPROUTS: AccountType = {
    type: "RETAILER",
    icon: SproutsIcon,
    name: "Sprouts",
    key: "SPROUTS",
  };
  /**
   * Staples account type.
   */
  static readonly STAPLES: AccountType = {
    type: "RETAILER",
    icon: StaplesIcon,
    name: "Staples",
    key: "STAPLES",
  };
  /**
   * Staples Canada account type.
   */
  static readonly STAPLES_CA: AccountType = {
    type: "RETAILER",
    icon: StaplesCanadaIcon,
    name: "Staples Canada",
    key: "STAPLES_CA",
  };
  /**
   * Starbucks account type.
   */
  static readonly STARBUCKS: AccountType = {
    type: "RETAILER",
    icon: StarbucksIcon,
    name: "Starbucks",
    key: "STARBUCKS",
  };
  /**
   * Taco Bell account type.
   */
  static readonly TACO_BELL: AccountType = {
    type: "RETAILER",
    icon: TacoBellIcon,
    name: "Taco Bell",
    key: "TACO_BELL",
  };
  /**
   * Target account type.
   */
  static readonly TARGET: AccountType = {
    type: "RETAILER",
    icon: TargetIcon,
    name: "Target",
    key: "TARGET",
  };
  /**
   * T.J.Maxx account type.
   */
  static readonly TJ_MAXX: AccountType = {
    type: "RETAILER",
    icon: TJMaxxIcon,
    name: "T.J.Maxx",
    key: "TJ_MAXX",
  };
  /**
   * UberEats account type.
   */
  static readonly UBER_EATS: AccountType = {
    type: "RETAILER",
    icon: UberEatsIcon,
    name: "UberEats",
    key: "UBER_EATS",
  };
  /**
   * Ulta account type.
   */
  static readonly ULTA: AccountType = {
    type: "RETAILER",
    icon: UltaIcon,
    name: "Ulta",
    key: "ULTA",
  };
  /**
   * Vons account type.
   */
  static readonly VONS: AccountType = {
    type: "RETAILER",
    icon: VonsIcon,
    name: "Vons",
    key: "VONS",
  };
  /**}
   * Walgreens account type.
   */
  static readonly WALGREENS: AccountType = {
    type: "RETAILER",
    icon: WalgreensIcon,
    name: "Walgreens",
    key: "WALGREENS",
  };
  /**
   * Walmart account type.
   */
  static readonly WALMART: AccountType = {
    type: "RETAILER",
    icon: WalmartIcon,
    name: "Walmart",
    key: "WALMART",
  };
  /**
   * Walmart Canada account type.
   */
  static readonly WALMART_CA: AccountType = {
    type: "RETAILER",
    icon: WalmartCanadaIcon,
    name: "Walmart Canada",
    key: "WALMART_CA",
  };
  /**
   * Wegman’s account type.
   */
  static readonly WEGMANS: AccountType = {
    type: "RETAILER",
    icon: WegmansIcon,
    name: "Wegman’s",
    key: "WEGMANS",
  };
  // static readonly YAHOO: AccountType = {
  //   type: "Email",
  //   icon: '',
  //   name: "Yahoo",
  //   key: "YAHOO"
  // }
}
