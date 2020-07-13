function getUser(sessionId, callback) {
  const user = { userId: 2323, name: 'max' };
  setTimeout(callback, 1000, user);
}

function getUserP(sessionId) {
  return new Promise((resolve) => {
    getUser(sessionId, (user) => resolve(user));
  });
}

function getUserOrders(userId, callback) {
  const orders = [
    { userId: 2323, orderId: 34, sum: 1000 },
    { userId: 2323, orderId: 40, sum: 2000 },
    { userId: 2323, orderId: 78, sum: 4000 },
  ];
  setTimeout(callback, 1000, orders);
}

function getUserOrdersP(userId) {
  return new Promise((resolve) => {
    getUserOrders(userId, (orders) => {
      resolve(orders);
    });
  });
}

function getOrderDetails(orderId, callback) {
  const orderDetails = {
    createdAt: '2020-02-23 15:03:45',
    items: ['Book "Code Complete"', 'notebook', 'coffee'],
    status: 'delivered',
  };
  setTimeout(callback, 1000, orderDetails);
}

function getOrderDetailsP(orderId) {
  return new Promise((resolve) => {
    getOrderDetails(orderId, (orderDetails) => {
      resolve(orderDetails);
    });
  });
}

module.exports = {
  getUser,
  getUserP,
  getUserOrders,
  getUserOrdersP,
  getOrderDetails,
  getOrderDetailsP,
};
