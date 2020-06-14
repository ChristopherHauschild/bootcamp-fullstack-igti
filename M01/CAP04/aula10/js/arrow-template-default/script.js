'use strict' // JS acusa mais erros

// ======== function x arrow function ========

function sum(a, b) {
  return a + b
}

// função anônima
const sum2 = function(a, b) {
  return a + b;
}

// arrow function
const sum3 = (a, b) => a + b

console.log(sum(2, 3))
console.log(sum2(2, 3))
console.log(sum3(2, 3))


// ======== template literals ========

const name = 'Christopher'
const surname = 'Hauschild'

const text1 = 'Meu nome é ' + name + ' ' + surname
const text2 = `Meu nome é ${name} ${surname}`

console.log(text1)
console.log(text2)


// ======== default parameters ========

// -> no último parâmetro

const sum4 = (a, b) => a + b
const sum5 = (a, b = 10) => a + b

console.log(sum4(2)) // NaN
console.log(sum5(2)) // === 12