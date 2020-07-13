const api = require('./api');

// TASK. Print user name, user orders, and details about last user order.
// FLOW. get user, then get user orders, then get order details.

/* PSEUDO CODE

user = getUser(sessionid)
orders = getUserOrders(user.userId)
lastOrder = getLastOrder(orders)
orderDetails = getOrderDetails(lastOrderId)

print(user)
print(orders)
print(orderDetails)

 */

function getLastOrder(orders) {
  return orders[0];
}

const sessionId = 'asdf123';

// ---------------------------- CALLBACKS ----------------------------
function indexCallback() {
  api.getUser(sessionId, (user) => {
    api.getUserOrders(user.userId, (orders) => {
      const lastOrder = getLastOrder(orders);
      api.getOrderDetails(lastOrder.orderId, (orderDetails) => {
        console.log(user); // eslint-disable-line no-console
        console.log(orders); // eslint-disable-line no-console
        console.log(orderDetails); // eslint-disable-line no-console
      });
    });
  });
}

// indexCallback();

// ---------------------------- PROMISES ----------------------------

function indexPromise() {
  api
    .getUserP(sessionId)
    .then((user) => {
      console.log(user); // eslint-disable-line no-console
      return user.userId;
    })
    .then(api.getUserOrdersP)
    .then((orders) => {
      console.log(orders); // eslint-disable-line no-console
      const lastOrder = getLastOrder(orders);
      return lastOrder.orderId;
    })
    .then(api.getOrderDetailsP)
    .then(console.log); // eslint-disable-line no-console
}

// indexPromise();

// ---------------------------- GENERATORS ----------------------------

function* indexGenerator() {
  const user = yield api.getUserP(sessionId);
  const orders = yield api.getUserOrdersP(user.userId);
  const lastOrder = getLastOrder(orders);
  const orderDetails = yield api.getOrderDetailsP(lastOrder.orderId);
  console.log(user); // eslint-disable-line no-console
  console.log(orders); // eslint-disable-line no-console
  console.log(orderDetails); // eslint-disable-line no-console
}

function generatorRanner(generator) {
  const iterator = generator();
  iterator
    .next()
    .value
    .then((user) => {
      const { value: promise } = iterator.next(user);
      return promise;
    })
    .then((orders) => {
      const { value: promise } = iterator.next(orders);
      return promise;
    })
    .then((orderDetails) => {
      const { value: promise } = iterator.next(orderDetails);
      return promise;
    });
}

// generatorRanner(indexGenerator);

function recursiveRanner(iterator, result) {
  const nextItem = iterator.next(result);
  if (nextItem.done) return;
  nextItem.value.then((nextResult) => {
    recursiveRanner(iterator, nextResult);
  });
}

function generatorRannerRecursive(generator) {
  const iterator = generator();
  recursiveRanner(iterator);
}

// generatorRannerRecursive(indexGenerator);

// ---------------------------- ASYNC AWAIT ----------------------------

async function indexAsync() {
  const user = await api.getUserP(sessionId);
  const orders = await api.getUserOrdersP(user.userId);
  const lastOrder = getLastOrder(orders);
  const orderDetails = await api.getOrderDetailsP(lastOrder.orderId);
  console.log(user); // eslint-disable-line no-console
  console.log(orders); // eslint-disable-line no-console
  console.log(orderDetails); // eslint-disable-line no-console
}

// indexAsync();

/**
 * Points:
 * - асинхронні функції не повертають результат, так як не блокують основний поток, а працюють
 * через колбеки
 * - основний поток не блокується для того щоб досягати кращої утилізації серверних ресурсів
 * - сучасний js дуже відрізняється від того що було 10 років назад
 * - проміси - це лише обгортка над колбеками
 * - проміси позбваляють від надмірної вкладеності колбеків
 * - управління основним потоком через генератори подудовано на промісах
 * - async await - це стандартизація підходу управління основним потоком, запропоноввана на
 * основі промісів, із зрозумілим синтаксисом і без магії сторонніх бібліотек
 * - async await так само як і генератори, основані на промісах
 */
