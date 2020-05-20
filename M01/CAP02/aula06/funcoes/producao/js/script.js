function sum(a, b) {
  return a + b
}

console.log(sum(1, 4))

function compareNumbers(a, b) {
  // return a > b ? 1 : a < b ? -1 : 0
  return a - b
}

console.log(compareNumbers(1, 1))
console.log(compareNumbers(1, 2))
console.log(compareNumbers(2, 1))

function superSum(from, upTo) {
  var sum = 0
  // i -> indice(numero) atual
  for (var i = from; i <= upTo; i++) {
    sum += i
  }

  return sum
}

console.log(superSum(1, 10))
console.log(superSum(2, 7))
console.log(superSum(27, 723))