// ESTRUTURAS DE REPETIÇÃO

//WHILE

var numAtual = 1
var soma = 0

while (numAtual <= 10) {
  // soma = soma + numAtual
  soma += numAtual
  numAtual++
}

console.log('Soma igual a: ' + soma)

// DO WHILE

var numAtual = 1
var soma = 0

do {
  // soma = soma + numAtual
  soma += numAtual
  numAtual++
} while (numAtual <= 10)

console.log('Soma igual a: ' + soma)

// FOR

var soma = 0

for(numAtual = 1; numAtual <= 10; numAtual++) {
  soma += numAtual
}

console.log('Soma igual a: ' + soma)