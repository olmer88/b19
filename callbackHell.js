/**
 * - user auth
 * - get user statistic
 */

function getStatistic() {
  return new Promise((resolve) => {
    setTimeout((statisticData) => {
      resolve(statisticData);
    }, 1000, { calls: 5 });
  });
}

function authoriseUser() {
  return new Promise((resolve, reject) => {
    setTimeout((data) => {
      if (Math.round(Math.random())) {
        reject(new Error('Auth Service invaluable'));
      }
      resolve(data);
    }, 1000, { name: 'John', auth: true });
  });
}

function printStatistic(statisticData) {
  console.log(statisticData);
}

const processUser = (userAthData) => {
  if (userAthData.auth) {
    return getStatistic();
  }
  return Promise.resolve(console.log(userAthData.name, ' not authorised'));
};

authoriseUser()
  .then(processUser)
  .catch((error) => {
    console.error(error);
    return Promise.resolve({ calls: 67 });
  })
  .then(printStatistic)
;

Promise.all({ new Promise(), new Promise() });
