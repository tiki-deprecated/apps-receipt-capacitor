

import {ServiceStore} from "../src/service/store"
import { ServiceCapture } from "../src/service";
import {StateSync} from "../src/service/store/state/state-sync"
import { Repository } from "../src/service/store/repository";
import { StateRetailer } from "../src/service/store/state";
import { StateGmail } from "../src/service/store/state";
import {StateAccount} from "../src/service/store/state/state-account"

describe('test add week', ()=>{
    test('asjdiasjdia', async ()=>{
        const repository = new Repository()
        const state = new StateSync(repository)
        //const stateAcc = new StateAccount(repository, 'bla')
        // const retailer = new StateRetailer(repository)
        // retailer.update([{
        //     username: "asdiasdiamdasimda",
        //     type: {
        //         id: "AMAZON",
        //         type: "RETAILER",
        //         icon: '',
        //         name: "Amazon"
        //     }
        // }])

        state.add(new Date('09/05/2023'))
        state.add(new Date('09/12/2023'))
        state.add(new Date('09/19/2023'))
        state.add(new Date('09/26/2023'))
        console.log('adsa',state.get)
        state.load()
        const weeks = state.getWeeks()
        const count = state.countWeeks(new Date('09/27/2023'))
        console.log('teste', weeks, count)
        
    })

    // const stateSync = new StateSync(repository)
    // test('add Week', ()=>{
    //     //const loginDate = stateSync.add()
    //     const rps = stateSync.countWeeks()
    // })
})

// import { mocked } from "jest-mock";
// import { StateSync } from "../src/service/store/state";
// import { Repository } from "../src/service/store/repository";



// const StateSyncMock = StateSync as jest.MockedClass<typeof StateSync>;

// const state = new StateSyncMock(new Repository());

// describe("teste", () => {
//   test("add week", () => {
//     state.add();
//   });
// });
