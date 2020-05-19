const reduce = require('./1');

describe('Reduce', () => {
  it('should return 0', () => {
    const res = reduce([], (accumulator, currentValue) => accumulator + currentValue, 0);
    expect(res).toBe(0);
  });
  it('should return 2', () => {
    const res = reduce([], (accumulator, currentValue) => accumulator + currentValue, 2);
    expect(res).toBe(2);
  });
  it('should return 1', () => {
    const res = reduce([1], (accumulator, currentValue) => accumulator + currentValue, 0);
    expect(res).toBe(1);
  });
  it('should return 3', () => {
    const res = reduce([1, 2], (accumulator, currentValue) => accumulator + currentValue, 0);
    expect(res).toBe(3);
  });
  it('should return 3', () => {
    const res = reduce([1, 2], (accumulator, currentValue) => accumulator - currentValue, 10);
    expect(res).toBe(7);
  });
});
