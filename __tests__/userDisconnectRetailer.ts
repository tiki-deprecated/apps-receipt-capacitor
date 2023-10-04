
import { StateAccount } from "../src/service/store/state/state-account"
import { ServiceStore } from "../src/service/store"
import connectRetailer from "./__fixtures__/connectRetailer"

describe('User disconnect Gmail', ()=>{
   test("test suite", async ()=>{
    const store = new ServiceStore()
    const retailer = store.retailer as StateAccount
    expect(connectRetailer(retailer)).toBe('P100')
    await retailer.update([])
    const gmailStatus = retailer.get().value
    expect(gmailStatus).toBe('NULL')
   })
})