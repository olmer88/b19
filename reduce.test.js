const streetIdToLangIdToNameMap = require('./reduce');

const streets = [
  { lang_id: 1, streetID: 4, name: 'келецька' },
  { lang_id: 2, streetID: 4, name: 'келецкая' },
  { lang_id: 1, streetID: 3, name: 'фрунзе' },
];

// const res = {
//   4: { 1: 'келецька', 2: 'келецкая' },
//   3: { 1: 'фрунзе' },
// };

describe('streetIdToLangIdToNameMap', () => {
  it('should return defined object', () => {
    const res = streetIdToLangIdToNameMap(streets);
    expect(res).toEqual({
      4: { 1: 'келецька', 2: 'келецкая' },
      3: { 1: 'фрунзе' },
    });
  });
});
