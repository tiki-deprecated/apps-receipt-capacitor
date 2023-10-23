import { StateAccount } from "../src/service/store/state/state-account";
import { Store } from "../src/service/store";
import connectGmail from "./__fixtures__/connectGmail";
import connectRetailer from "./__fixtures__/connectRetailer";
import fourWeeks from "./__fixtures__/fourWeeks";
import mockCheckPayout from "./__mocks__/mockCheckPayout";

describe("User does not share 5 receipts", () => {
  test("Test Suite", () => {
    const store = new Store();

    const gmail = store.gmail as StateAccount;
    expect(connectGmail(gmail)).toBe("P100");

    const retailer = store.retailer as StateAccount;
    expect(connectRetailer(retailer)).toBe("P100");

    expect(fourWeeks(store.sync)).toBe(4);

    store.receipt.add("receipt1", new Date("09/05/2023"));
    store.receipt.add("receipt2", new Date("09/12/2023"));
    store.receipt.add("receipt3", new Date("09/12/2023"));
    store.receipt.add("receipt4", new Date("09/19/2023"));

    const receiptCount = store.receipt.count();

    expect(receiptCount).toBe(4);

    expect(
      mockCheckPayout(
        store.sync.countWeeks(new Date("09/27/2023")),
        receiptCount,
        gmail.get().value,
        retailer.get().value
      )
    ).toBeFalsy();
  });
});
