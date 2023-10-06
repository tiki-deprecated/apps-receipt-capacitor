import { StateSync } from "../../src/service/store/state";
export default function fourWeeks (stateSync: StateSync): number{
    // add the 4 weeks logins
    stateSync.add(new Date('09/05/2023'))
    stateSync.add(new Date('09/12/2023'))
    stateSync.add(new Date('09/19/2023'))
    stateSync.add(new Date('09/26/2023'))
    const count = stateSync.countWeeks(new Date('09/27/2023'))
    return count
}