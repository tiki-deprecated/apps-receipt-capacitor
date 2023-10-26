import { accountTypes } from '@mytiki/capture-receipt-capacitor';
import { Store } from '../src/service/store'
import { vi, test, describe, expect, beforeEach, afterEach } from 'vitest'
import { StateAccount } from '../src/service/store/state/state-account';
import { Publish } from '../src/service/publish';
import { mock } from 'vitest-mock-extended';
import { BulletState } from '../src/components/bullet/bullet-state';

describe('Reward payment tests', () => {

  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  test("End of the month and reset", async () => {
    const store = new Store();
    await store.initialize();
    store.gmail.update([{
      username: "test@gmail.com",
      type: accountTypes.index.get("GMAIL")!,
      isVerified: true
    }])
    store.retailer.update([{
      username: "test@gmail.com",
      type: accountTypes.index.get("AMAZON")!,
      isVerified: true
    }])
    store.sync.add();
    plus1week();
    await store.receipt.add("test1");
    store.sync.add();
    plus1week();
    await store.receipt.add("test2");
    store.sync.add();
    plus1week();
    await store.receipt.add("test3");
    await store.receipt.add("test4");
    await store.receipt.add("test5");
    store.sync.add();
    expect(store.sync.status()).toBe(BulletState.P100)
    expect(store.receipt.status.bulletState).toBe(BulletState.P100)
    expect((store.gmail as StateAccount).get().value).toBe(BulletState.P100)
    expect((store.retailer as StateAccount).get().value).toBe(BulletState.P100)
    plus1week()
    expect(store.sync.status()).toBe(BulletState.P0)
  })
  
});

const plus1week = () => {
  const date = new Date();
  date.setDate(date.getDate() + 7);
  vi.setSystemTime(date);
}