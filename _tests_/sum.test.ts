import type * as Sum from './sum'
const { sum } = jest.requireActual("./sum")

describe("test", ()=>{
test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });
})

export {}
  