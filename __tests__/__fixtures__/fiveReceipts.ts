import { StateReceipt } from "../../src/service/store/state";
export default function fiveReceipts (receiptState: StateReceipt): number {
     // add 5 receipts
     receiptState.add('receipt1', new Date('09/05/2023'))
     receiptState.add('receipt2', new Date('09/12/2023'))
     receiptState.add('receipt3', new Date('09/12/2023'))
     receiptState.add('receipt4', new Date('09/19/2023'))
     receiptState.add('receipt5', new Date('09/19/2023'))
 
     //check the receipt state
    const receiptCount = receiptState.count()
    return receiptCount

}