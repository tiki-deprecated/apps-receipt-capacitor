/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import AcmeIcon from "@/assets/images/acme.png";
import AlbertsonsIcon from "@/assets/images/albertsons.png";
import AmazonIcon from "@/assets/images/amazon.png";
//import AolIcon from "@/assets/images/aol.png";
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
//import OutlookIcon from "@/assets/images/outlook.png";
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
//import YahooIcon from "@/assets/images/yahoo.png";
import { AccountProvider } from "@mytiki/tiki-capture-receipt-capacitor";
/**
 * Enumeration of the supported account types.
 */

export interface AccountType {
  type: 'Email' | 'Retailer',
  name: string,
  icon?: string,
  key: string
}
export class AccountTypeCommom{
  /**
   * CME Markets account type 
   */
  static readonly CME_MARKETS:AccountType =  {
    type:'Retailer',
    name:'Acme',
    icon:AcmeIcon,
    key: 'CME_MARKETS'
  };
  
  /**
   * Albertsons account type.
   */
 static readonly ALBERTSONS: AccountType = {
  type: "Retailer",
  icon: AlbertsonsIcon,
  name: "Albertsons",
  key: 'ALBERTSONS'
}
  /**
   * Amazon account type.
   */
  static readonly AMAZON: AccountType = {
    type: "Retailer",
    icon: AmazonIcon,
    name: "Amazon",
    key: 'AMAZON'
}
  /**
   * Amazon Canada account type.
   */
  static readonly AMAZON_CA: AccountType = {
    type: "Retailer",
    icon: AmazonIcon,
    name: "Amazon Canada",
    key: 'AMAZON_CA'
}
  /**
   * Amazon United Kingdom account type.
   */
  static readonly AMAZON_UK: AccountType = {
    type: "Retailer",
    icon: AmazonIcon,
    name: "Amazon United Kingdom",
    key: 'AMAZON_UK'
}
  /**
   * AOL account type.
   */
  // AOL = "AOL",

  /**
   * Bed Bath & Beyond account type.
   */
  static readonly BED_BATH_AND_BEYOND: AccountType = {
    type: "Retailer",
    icon: BedBathAndBeyondIcon,
    name: "Bed Bath & Beyond",
    key: 'BED_BATH_AND_BEYOND'
}
  /**
   * Gmail account type.
   */
  static readonly GMAIL: AccountType = {
   name: "Gmail",
   type: "Email",
   icon: GmailIcon,
   key: 'GMAIL'
  }

  /**
   * Best Buy account type.
   */
  static readonly BESTBUY: AccountType = {
    type: "Retailer",
    icon: BestBuyIcon,
    name: "Best Buy",
    key: 'BESTBUY'
}
  /**
   * BJ’s Wholesale Club account type.
   */
  static readonly BJS_WHOLESALE: AccountType = {
    type: "Retailer",
    icon: BJsIcon,
    name: "BJ’s Wholesale Club",
    key: 'BJS_WHOLESALE'
}
  /**
   * Chewy account type.
   */
  static readonly CHEWY: AccountType = {
    type: "Retailer",
    icon: ChewyIcon,
    name: "Chewy",
    key: 'CHEWY'
}
  /**
   * Costco account type.
   */
  static readonly COSTCO: AccountType = {
    type: "Retailer",
    icon: CostcoIcon,
    name: "Costco",
    key: 'COSTCO'
}
  /**
   * CVS account type.
   */
  static readonly CVS: AccountType = {
    type: "Retailer",
    icon: CVSIcon,
    name: "CVS",
    key: 'CVS'
}
  /**
   * Dick’s Sporting Goods account type.
   */
  static readonly DICKS_SPORTING_GOODS: AccountType = {
    type: "Retailer",
    icon: DicksIcon,
    name: "Dick’s Sporting Goods",
    key: 'DICKS_SPORTING_GOODS'
}
  /**
   * Dollar General account type.
   */
  static readonly DOLLAR_GENERAL: AccountType = {
    type: "Retailer",
    icon: DollarGeneralIcon,
    name: "Dollar General",
    key: 'DOLLAR_GENERAL'
}
  /**
   * DollarTree account type.
   */
  static readonly DOLLAR_TREE: AccountType = {
    type: "Retailer",
    icon: DollarTreeIcon,
    name: "DollarTree",
    key: 'DOLLAR_TREE'
}
  /**
   * Domino’s Pizza account type.
   */
  static readonly DOMINOS_PIZZA: AccountType = {
    type: "Retailer",
    icon: DominosIcon,
    name: "Domino’s Pizza",
    key: 'DOMINOS_PIZZA'
}
  /**
   * DoorDash account type.
   */
  static readonly DOOR_DASH: AccountType = {
    type: "Retailer",
    icon: DoorDashIcon,
    name: "DoorDash",
    key: 'DOOR_DASH'
}
  /**
   * Drizly account type.
   */
  static readonly DRIZLY: AccountType = {
    type: "Retailer",
    icon: DrizlyIcon,
    name: "Drizly",
    key: 'DRIZLY'
}
  /**
   * Family Dollar account type.
   */
  static readonly FAMILY_DOLLAR: AccountType = {
    type: "Retailer",
    icon: FamilyDollarIcon,
    name: "Family Dollar",
    key: 'FAMILY_DOLLAR'
  }
    /**
   * Food 4 Less account type.
   */
  static readonly FOOD_4_LESS: AccountType = {
    type: "Retailer",
    icon: Food4LessIcon,
    name: "Food 4 Less",
    key: 'FOOD_4_LESS'
}
  /**
   * Food Lion account type.
   */
  static readonly FOOD_LION: AccountType = {
    type: "Retailer",
    icon: FoodLionIcon,
    name: "Food Lion",
    key: 'FOOD_LION'
}
  /**
   * Fred Meyer account type.
   */
  static readonly FRED_MEYER: AccountType = {
    type: "Retailer",
    icon: FredMeyerIcon,
    name: "Fred Meyer",
    key: 'FRED_MEYER'
}
  /**
   * GAP account type.
   */
  static readonly GAP: AccountType = {
    type: "Retailer",
    icon: GapIcon,
    name: "GAP",
    key: 'GAP'
}
  /**
   * Giant Eagle account type.
   */
  static readonly GIANT_EAGLE: AccountType = {
    type: "Retailer",
    icon: GiantEagleIcon,
    name: "Giant Eagle",
    key: 'GIANT_EAGLE'
}
  /**
   * Grubhub account type.
   */
  static readonly GRUBHUB: AccountType = {
    type: "Retailer",
    icon: GrubHubIcon,
    name: "Grubhub",
    key: 'GRUBHUB'
}
  /**
   * Harris Teeter account type.
   */
  static readonly HARRIS_TEETER: AccountType = {
    type: "Retailer",
    icon: HarrisTeeterIcon,
    name: "Harris Teeter",
    key: 'HARRIS_TEETER'
}
  /**
   * H.E.B account type.
   */
  static readonly HEB: AccountType = {
    type: "Retailer",
    icon: HEBIcon,
    name: "H.E.B",
    key: 'HEB'
}
  /**
   * Home Depot account type.
   */
  static readonly HOME_DEPOT: AccountType = {
    type: "Retailer",
    icon: HomeDepotIcon,
    name: "Home Depot",
    key: 'HOME_DEPOT'
}
  /**
   * HyVee account type.
   */
  static readonly HYVEE: AccountType = {
    type: "Retailer",
    icon: HyVeeIcon,
    key: 'HYVEE',
    name: "HyVee",
}
  /**
   * Instacart account type.
   */
  static readonly INSTACART: AccountType = {
    type: "Retailer",
    icon: InstacartIcon,
    name: "Instacart",
    key: 'INSTACART',
}
  /**
   * Jewel Osco account type.
   */
  static readonly JEWEL_OSCO: AccountType = {
    type: "Retailer",
    icon: JewelOscoIcon,
    name: "Jewel Osco",
    key: 'JEWEL_OSCO',
}
  /**
   * Kohl’s account type.
   */
  static readonly KOHLS: AccountType = {
    type: "Retailer",
    icon: KohlsIcon,
    name: "Kohl’s",
    key: 'KOHLS',
}
  /**
   * Kroger account type.
   */
  static readonly KROGER: AccountType = {
    type: "Retailer",
    icon: KrogerIcon,
    name: "Kroger",
    key: 'KROGER',
}
  /**
   * Lowe’s account type.
   */
  static readonly LOWES: AccountType = {
    type: "Retailer",
    icon: LowesIcon,
    name: "Lowe’s",
    key: 'LOWES',
}
  /**
   * Macy’s account type.
   */
  static readonly MACYS: AccountType = {
    type: "Retailer",
    icon: MacysIcon,
    name: "Macy’s",
    key: 'MACYS',
}
  /**
   * Marshalls account type.
   */
  static readonly MARSHALLS: AccountType = {
    type: "Retailer",
    icon: MarshallsIcon,
    name: "Marshalls",
    key: 'MARSHALLS',
}
  /**
   * Meijer account type.
   */
  static readonly MEIJER: AccountType = {
    type: "Retailer",
    icon: MeijerIcon,
    name: "Meijer",
    key: 'MEIJER',
}
  /**
   * Nike account type.
   */
  static readonly NIKE: AccountType = {
    type: "Retailer",
    icon: NikeIcon,
    name: "Nike",
    key: 'NIKE',
  }
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
    type: "Retailer",
    icon: PublixIcon,
    name: "Publix",
    key: 'PUBLIX',
}
  /**
   * Ralphs account type.
   */
  static readonly RALPHS: AccountType = {
    type: "Retailer",
    icon: RalphsIcon,
    name: "Ralphs",
    key: 'RALPHS',
}
  /**
   * RiteAid account type.
   */
  static readonly RITE_AID: AccountType = {
    type: "Retailer",
    icon: RiteAidIcon,
    name: "RiteAid",
    key: 'RITE_AID',
}
  /**
   * Safeway account type.
   */
  static readonly AFEWAY: AccountType = {
    type: "Retailer",
    icon: "",
    name: "Safeway",
    key: 'AFEWAY',
}
  /**
   * Sam’s Club account type.
   */
  static readonly SAMS_CLUB: AccountType = {
    type: "Retailer",
    icon: SamsClubIcon,
    name: "Sam’s Club",
    key: 'SAMS_CLUB',
}
  /**
   * Seamless account type.
   */
  static readonly SEAMLESS: AccountType = {
    type: "Retailer",
    icon: SeamlessIcon,
    name: "Seamless",
    key: 'SEAMLESS',
}
  /**
   * Sephora account type.
   */
  static readonly SEPHORA: AccountType = {
    type: "Retailer",
    icon: SephoraIcon,
    name: "Sephora",
    key: 'SEPHORA',
}
  /**
   * Shipt account type.
   */
  static readonly SHIPT: AccountType = {
    type: "Retailer",
    icon: ShiptIcon,
    name: "Shipt",
    key: 'SHIPT',
}
  /**
   * ShopRite account type.
   */
  static readonly SHOPRITE: AccountType = {
    type: "Retailer",
    icon: ShopRiteIcon,
    name: "Shoprite",
    key: 'SHOPRITE',
  }

  /**
   * Sprouts account type.
   */
  static readonly SPROUTS: AccountType = {
    type: "Retailer",
    icon: SproutsIcon,
    name: "Sprouts",
    key: 'SPROUTS',
}
  /**
   * Staples account type.
   */
  static readonly STAPLES: AccountType = {
    type: "Retailer",
    icon: StaplesIcon,
    name: "Staples",
    key: 'STAPLES',
}
  /**
   * Staples Canada account type.
   */
  static readonly STAPLES_CA: AccountType = {
    type: "Retailer",
    icon: StaplesCanadaIcon,
    name: "Staples Canada",
    key: 'STAPLES_CA',
}
  /**
   * Starbucks account type.
   */
  static readonly STARBUCKS: AccountType = {
    type: "Retailer",
    icon: StarbucksIcon,
    name: "Starbucks",
    key: 'STARBUCKS',
}
  /**
   * Taco Bell account type.
   */
  static readonly TACO_BELL: AccountType = {
    type: "Retailer",
    icon: TacoBellIcon,
    name: "Taco Bell",
    key: 'TACO_BELL',
}
  /**
   * Target account type.
   */
  static readonly TARGET: AccountType = {
    type: "Retailer",
    icon: TargetIcon,
    name: "Target",
    key: 'TARGET',
}
  /**
   * T.J.Maxx account type.
   */
  static readonly TJ_MAXX: AccountType = {
    type: "Retailer",
    icon: TJMaxxIcon,
    name: "T.J.Maxx",
    key: 'TJ_MAXX',
}
  /**
   * UberEats account type.
   */
  static readonly UBER_EATS: AccountType = {
    type: "Retailer",
    icon: UberEatsIcon,
    name: "UberEats",
    key: 'UBER_EATS',
}
  /**
   * Ulta account type.
   */
  static readonly ULTA: AccountType = {
    type: "Retailer",
    icon: UltaIcon,
    name: "Ulta",
    key: 'ULTA',
}
  /**
   * Vons account type.
   */
  static readonly VONS: AccountType = {
    type: "Retailer",
    icon: VonsIcon,
    name: "Vons", 
    key: 'VONS',
}
  /**}
   * Walgreens account type.
   */
  static readonly WALGREENS: AccountType = {
    type: "Retailer",
    icon: WalgreensIcon,
    name: "Walgreens",
    key: 'WALGREENS',
}
  /**
   * Walmart account type.
   */
  static readonly WALMART: AccountType = {
    type: "Retailer",
    icon: WalmartIcon,
    name: "Walmart",
    key: 'WALMART',
}
  /**
   * Walmart Canada account type.
   */
  static readonly WALMART_CA: AccountType = {
    type: "Retailer",
    icon: WalmartCanadaIcon,
    name: "Walmart Canada",
    key: 'WALMART_CA',
}
  /**
   * Wegman’s account type.
   */
  static readonly WEGMANS: AccountType = {
    type: "Retailer",
    icon: WegmansIcon,
    name: "Wegman’s",
    key: 'WEGMANS',
} 
  // static readonly YAHOO: AccountType = {
  //   type: "Email",
  //   icon: '',
  //   name: "Yahoo",
  //   key: "YAHOO"
  // }
}

