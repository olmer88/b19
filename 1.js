function reduce(arr, fn, initial) {
  const [firstElement, ...restElements] = arr;
  return arr.length ? reduce(restElements, fn, fn(initial, firstElement)) : initial;
}

module.exports = reduce;
