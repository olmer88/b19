// Not very best. Lodash. zipObjectDeep can not make needed structure.
// const _ = require('lodash');
// module.exports = function streetIdToLangIdToNameMap(streets) {
//   const keys = streets.map(({ lang_id, streetID }) => [streetID, lang_id);
//   const values = streets.map(({ name }) => name);
//   return _.mapValues(
//     _.zipObjectDeep(keys, values),
//     (a) => _.fromPairs(a.map((v, k) => [k, v]).filter(([v]) => v)),
//   );
// };

// Best! Native forEach. Simple logic.
module.exports = function makeStreetIdToLangIdToNameMap(streets) {
  const map = {};
  streets.forEach(({ lang_id, streetID, name }) => {
    if (!map[streetID]) map[streetID] = {};
    map[streetID][lang_id] = name;
  });
  return map;
};

// Original improved. Bad. Reduce. Simplified logic.
// module.exports = function streetIdToLangIdToNameMap(streets) {
//   return streets.reduce((acc, { lang_id, streetID, name }) => {
//     if (!acc[streetID]) acc[streetID] = {};
//     acc[streetID][lang_id] = name;
//     return acc;
//   }, {});
// };

// Original. Very bad. Reduce. Overcomplicated logic.
// module.exports = function streetIdToLangIdToNameMap(streets) {
//   return streets.reduce((acc, street) => {
//     const { lang_id, streetID, name } = street;
//     let tmpObj = {};
//
//     if (acc[streetID]) {
//       tmpObj = acc[streetID];
//       tmpObj[lang_id] = name;
//       acc[streetID] = { ...tmpObj };
//       return acc;
//     }
//     acc[streetID] = { [lang_id]: name };
//     return acc;
//   }, {});
// };
