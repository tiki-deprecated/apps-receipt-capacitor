
import { StateAccount } from "../src/service/store/state/state-account"
import { Store } from "../src/service/store"
import connectRetailer from "./__fixtures__/connectRetailer"
import connectGmail from "./__fixtures__/connectGmail";
import fiveReceipts from "./__fixtures__/fiveReceipts";
import fourWeeks from "./__fixtures__/fourWeeks";
import mockCheckPayout from "./__mocks__/mockCheckPayout";

test("User disconnect Gmail", async () => {
  const store = new Store()
  const retailer = store.retailer as StateAccount
  expect(connectRetailer(retailer)).toBe('P100')

  await retailer.update([])
  const retailerStatus = retailer.get().value
  expect(retailerStatus).toBe("NULL")

  const gmail = store.gmail as StateAccount
  expect(connectGmail(gmail)).toBe("P100")

  expect(fourWeeks(store.sync)).toBe(4);

  expect(fiveReceipts(store.receipt)).toBe(5);

  expect(
    mockCheckPayout(
      store.sync.countWeeks(new Date("09/27/2023")),
      store.receipt.count(),
      gmail.get().value,
      retailer.get().value
    )
  ).toBeFalsy();
})