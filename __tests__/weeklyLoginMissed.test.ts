import { StateAccount } from "../src/service/store/state/state-account"
import { Account, accountTypes } from "@mytiki/capture-receipt-capacitor";
import { ServiceStore } from "../src/service/store"
import connectGmail from "./__fixtures__/connectGmail";
import connectRetailer from "./__fixtures__/connectRetailer";

describe('User misses a weekly login', ()=>{
    test("test suite", ()=>{
    const store = new ServiceStore()
    const gmail = store.gmail as StateAccount

    expect(connectGmail(gmail)).toBe('P100')
    //add a retailer account
    const retailer = store.retailer as StateAccount
    expect(connectRetailer(retailer)).toBe('P100')

    store.sync.add(new Date('09/05/2023'))
    store.sync.add(new Date('09/12/2023'))
    store.sync.add(new Date('09/24/2023'))
    store.sync.add(new Date('10/01/2023'))
    const count = store.sync.countWeeks(new Date('10/02/2023'))


    expect(count).toBeLessThan(4)
    
})
})