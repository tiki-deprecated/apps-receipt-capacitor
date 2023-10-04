import { StateAccount } from "../src/service/store/state/state-account";
import { ServiceStore } from "../src/service/store";
import connectGmail from "./__fixtures__/connectGmail";
import fourWeeks from "./__fixtures__/fourWeeks";
import fiveReceipts from "./__fixtures__/fiveReceipts";
import mockCheckPayout from "./__mocks__/mockCheckPayout";
import connectRetailer from "./__fixtures__/connectRetailer";

describe("User Connects Only a Retailer Account", () => {
  test("test suite", async () => {
    const store = new ServiceStore();
    const gmail = store.gmail as StateAccount;
    await gmail.update([]);

    expect(gmail.get().value).toBe("NULL");

    const retailer = store.retailer as StateAccount;
    expect(connectRetailer(retailer)).toBe("P100");

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
