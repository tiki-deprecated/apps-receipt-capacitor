
import { StateGmail, StateReceipt, StateRetailer, StateSync } from "../src/service/store/state"
import { StateAccount } from "../src/service/store/state/state-account"
import { Repository } from "../src/service/store/repository";
import { Account, accountTypes } from "@mytiki/capture-receipt-capacitor";
import { ServiceStore } from "../src/service/store"

describe('test add week', () => {
  test('asjdiasjdia', async () => {
    const repository = new Repository()
    const weekState = new StateSync(repository)
    weekState.add(new Date())
    weekState.add(new Date('09/05/2023'))
    weekState.add(new Date('09/12/2023'))
    weekState.add(new Date('09/19/2023'))
    weekState.add(new Date('09/26/2023'))
    weekState.load()
    const count = weekState.countWeeks(new Date('09/27/2023'))
    expect(count).toBe(4)

    const store = new ServiceStore()
    const gmail = store.gmail as StateAccount
    const account: Account = {
      username: "test@gmail.com",
      type: accountTypes.from("GMAIL")!
    }
    gmail.update([account])
    const gmailStatus = gmail.get()
    expect(1).toBe(1)
  })
})