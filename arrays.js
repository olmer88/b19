const numbers = [1, 2, 3];


// 100
const a3 = numbers.forEach((value, index) => numbers[index] = value * index);
// 100


console.log(a3, numbers);

const a = ['hello', 'hello', 'max', 0, 1, 2, 3, 10];

const a2 = a.filter((value) => {
  const index = a.indexOf(value);
  return index % 2 === 0;
}).filter(Number);

// console.log(a);
// console.log(a2);
