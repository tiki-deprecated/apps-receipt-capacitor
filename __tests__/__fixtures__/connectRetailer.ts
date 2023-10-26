import { StateAccount } from "../../src/service/store/state/state-account"
import { Account, accountTypes } from "@mytiki/capture-receipt-capacitor";

export default function connectRetailer(retailerStore: StateAccount): string {
  const account: Account = {
    username: "test@gmail.com",
    type: accountTypes.index.get("AMAZON")!,
    isVerified: true
  }
  //checking the email state
  retailerStore.update([account])
  const gmailStatus: string = retailerStore.get().value
  return gmailStatus
}