
import { StateAccount } from "../src/service/store/state/state-account"
import { ServiceStore } from "../src/service/store"
import connectGmail from "./__fixtures__/connectGmail";
import connectRetailer from "./__fixtures__/connectRetailer";
import fiveReceipts from "./__fixtures__/fiveReceipts";
import fourWeeks from "./__fixtures__/fourWeeks";

describe('All Requirements Fullfilled', () => {
  test('Test suite', ()=>{
    //add a gmail account
    const store = new ServiceStore()
    const gmail = store.gmail as StateAccount
    expect(connectGmail(gmail)).toBe('P100')

    //add a retailer account
    const retailer = store.retailer as StateAccount

    expect(connectRetailer(retailer)).toBe('P100')

    expect(fourWeeks(store.sync)).toBe(4)

    expect(fiveReceipts(store.receipt)).toBe(5)

    //mock checkPayout
  })
})