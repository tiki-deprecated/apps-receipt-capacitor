import { StateAccount } from "../src/service/store/state/state-account"
import { ServiceStore } from "../src/service/store"
import connectGmail from "./__fixtures__/connectGmail";
import connectRetailer from "./__fixtures__/connectRetailer";
import countWeeksSuccessful from "./__fixtures__/countWeeksSuccessful";

describe("User connects Gmail but not Retailer Account", ()=>{
    test("test suite", ()=>{
        //add a gmail account
        const store = new ServiceStore()
        const gmail = store.gmail as StateAccount
        expect(connectGmail(gmail)).toBe('P100')

        //add a retailer account
        const retailer = store.retailer as StateAccount

        expect(connectRetailer(retailer)).toBe('P100')

        expect(countWeeksSuccessful(store.sync)).toBe(4)
    })
})