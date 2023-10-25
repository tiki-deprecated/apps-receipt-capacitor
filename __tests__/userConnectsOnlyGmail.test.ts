import { StateAccount } from "../src/service/store/state/state-account";
import { Store } from "../src/service/store";
import connectGmail from "./__fixtures__/connectGmail";
import fourWeeks from "./__fixtures__/fourWeeks";
import fiveReceipts from "./__fixtures__/fiveReceipts";
import mockCheckPayout from "./__mocks__/mockCheckPayout";
import {test, expect} from "vitest";


test("User connects Gmail but not Retailer Account", async () => {
  const store = new Store();
  const gmail = store.gmail as StateAccount;
  expect(connectGmail(gmail)).toBe("P100");

  const retailer = store.retailer as StateAccount;
  await retailer.update([])

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
});
