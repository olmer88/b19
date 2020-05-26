const o = { f1: 1 };

// o.f2 = 2;
// o.f3 = 2;
// o.f4 = 2;

// Object.assign(o, { f2: 2, f3: 2, f4: 2 }, { f5: 5, f2: 3 });
const o2 = {
  ...o,
  f2: 2,
  f3: 2,
  ...{ f2: 5 },
};

// console.log(o2);
console.log(Array.isArray([]));
