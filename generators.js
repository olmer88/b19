const main = async function () {
  const user = await new Promise((resolve) => setTimeout(() => resolve({ name: 'max', registered: new Date() }), 2000));
  console.log('after timeout', user);
};

main();
