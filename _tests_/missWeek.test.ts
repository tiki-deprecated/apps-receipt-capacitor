
// //import {ServiceStore} from '../src/service/store/index'
// import { StateSync } from "../src/service/store/state";
// import { Repository } from "../src/service/store/repository";

// //const store = new ServiceStore()

// describe('test add week', ()=>{
//     const repository = new Repository()
//     const stateSync = new StateSync(repository)
//     test('add Week', ()=>{
//         const loginDate = stateSync.add()
//         const rps = stateSync.countWeeks()
//     })  
// })

import { mocked } from "jest-mock";
import { StateSync } from "../src/service/store/state";
import { Repository } from "../src/service/store/repository";
