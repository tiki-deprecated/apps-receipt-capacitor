import { StateAccount } from "../../src/service/store/state/state-account"
import { Account, accountTypes } from "@mytiki/capture-receipt-capacitor";
import { Store } from "../../src/service/store"

export default function connectGmail (storeGmail: StateAccount): string {
    const account: Account = {
      username: "test@gmail.com",
      type: accountTypes.index.get("GMAIL")!,
      isVerified: true
    }
    //checking the email state
    storeGmail.update([account])
    const gmailStatus: string = storeGmail.get().value
    return gmailStatus
}