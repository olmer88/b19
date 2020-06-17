const { getStreetName } = require('./streets');

describe('streets', () => {
  it('should return келецкая', () => {
    expect(getStreetName(5, 2)).toBe('келецкая');
  });
});
