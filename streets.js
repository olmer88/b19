const makeStreetIdToLangIdToNameMap = require('./reduce');

const streets = [
  { lang_id: 1, streetID: 4, name: 'келецька' },
  { lang_id: 1, streetID: 3, name: 'фрунзе' },
  { lang_id: 2, streetID: 4, name: 'келецкая' },
  { lang_id: 1, streetID: 4, name: 'келецька' },
  { lang_id: 1, streetID: 3, name: 'фрунзе' },
  { lang_id: 2, streetID: 4, name: 'келецкая' },
  { lang_id: 1, streetID: 4, name: 'келецька' },
  { lang_id: 1, streetID: 3, name: 'фрунзе' },
  { lang_id: 2, streetID: 4, name: 'келецкая' },
  { lang_id: 1, streetID: 4, name: 'келецька' },
  { lang_id: 1, streetID: 3, name: 'фрунзе' },
  { lang_id: 2, streetID: 4, name: 'келецкая' },
  { lang_id: 1, streetID: 4, name: 'келецька' },
  { lang_id: 1, streetID: 3, name: 'фрунзе' },
  { lang_id: 2, streetID: 4, name: 'келецкая' },
  { lang_id: 1, streetID: 4, name: 'келецька' },
  { lang_id: 1, streetID: 3, name: 'фрунзе' },
  { lang_id: 2, streetID: 4, name: 'келецкая' },
  { lang_id: 1, streetID: 4, name: 'келецька' },
  { lang_id: 1, streetID: 3, name: 'фрунзе' },
  { lang_id: 2, streetID: 4, name: 'келецкая' },
  { lang_id: 1, streetID: 4, name: 'келецька' },
  { lang_id: 1, streetID: 3, name: 'фрунзе' },
  { lang_id: 2, streetID: 4, name: 'келецкая' },
  { lang_id: 1, streetID: 4, name: 'келецька' },
  { lang_id: 1, streetID: 3, name: 'фрунзе' },
  { lang_id: 2, streetID: 4, name: 'келецкая' },
  { lang_id: 1, streetID: 4, name: 'келецька' },
  { lang_id: 1, streetID: 3, name: 'фрунзе' },
  { lang_id: 2, streetID: 4, name: 'келецкая' },
  { lang_id: 1, streetID: 4, name: 'келецька' },
  { lang_id: 1, streetID: 3, name: 'фрунзе' },
  { lang_id: 2, streetID: 4, name: 'келецкая' },
  { lang_id: 1, streetID: 4, name: 'келецька' },
  { lang_id: 1, streetID: 3, name: 'фрунзе' },
  { lang_id: 2, streetID: 5, name: 'келецкая' },
];

// O(n)
// n => array length
// function getStreetName(streetId, langId) {
//   const street = streets
//     .find(({ lang_id, streetID }) => lang_id === langId && streetID === streetId);
//   return street.name;
// }

const streetIdToLangIdToNameMap = makeStreetIdToLangIdToNameMap(streets);

// O(1)
function getStreetName(streetId, langId) {
  return streetIdToLangIdToNameMap[streetId][langId];
}

module.exports = {
  getStreetName,
};
