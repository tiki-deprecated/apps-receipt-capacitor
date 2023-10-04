
import { StateAccount } from "../src/service/store/state/state-account"
import { ServiceStore } from "../src/service/store"
import connectGmail from "./__fixtures__/connectGmail";

describe('User disconnect Gmail', ()=>{
   test("test suite", async ()=>{
    const store = new ServiceStore()
    const gmail = store.gmail as StateAccount
    expect(connectGmail(gmail)).toBe('P100')
    await gmail.update([])
    const gmailStatus = gmail.get().value
    expect(gmailStatus).toBe('NULL')
   })
})