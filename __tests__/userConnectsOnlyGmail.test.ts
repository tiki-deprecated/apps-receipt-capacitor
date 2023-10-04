import { StateAccount } from "../src/service/store/state/state-account";
import { ServiceStore } from "../src/service/store";
import connectGmail from "./__fixtures__/connectGmail";
import fourWeeks from "./__fixtures__/fourWeeks";
import fiveReceipts from "./__fixtures__/fiveReceipts";
import mockCheckPayout from "./__mocks__/mockCheckPayout";

describe("User connects Gmail but not Retailer Account", () => {
  test("test suite", async () => {
    const store = new ServiceStore();
    const gmail = store.gmail as StateAccount;
    expect(connectGmail(gmail)).toBe("P100");

    const retailer = store.retailer as StateAccount;
    await retailer.update([])

    expect(fourWeeks(store.sync)).toBe(4);

    expect(fiveReceipts(store.receipt)).toBe(5);

    //mock checkPayout
    expect(
      mockCheckPayout(
        store.sync.countWeeks(new Date("09/27/2023")),
        store.receipt.count(),
        gmail.get().value,
        retailer.get().value
      )
    ).toBeFalsy();
  });
});
