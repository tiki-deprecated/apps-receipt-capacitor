import { BulletState } from "../../src/components/bullet/bullet-state";

export default function mockCheckPayout(
  sync: number,
  receipts: number,
  gmailState: string,
  retailerState: string
): boolean {
  if (
    gmailState === BulletState.P100 &&
    retailerState === BulletState.P100 &&
    sync >= 4 &&
    receipts >= 5
  ) {
    return true
  } else return false
}
