// ESTRUTURAS DE DECISÃO

// IF/ELSE

var a = 5
var b = 5

if (a > b) {
  console.log(a + ' é maior que ' + b)
} else {
  if (a < b) {
    console.log(a + ' é menor que ' + b)
  } else {
    console.log(a + ' é igual ' + b)
  }
}

// SWITCH

var dia = 1
var resp = ''

switch (dia) {
  case 1: resp = 'Domingo'; break;
  case 2: resp = 'Segunda'; break;
  case 3: resp = 'Terça'; break;
  case 4: resp = 'Quarta'; break;
  case 5: resp = 'Quinta'; break;
  case 6: resp = 'Sexta'; break;
  case 7: resp = 'Sábado'; break;

  default: resp = 'Dia Inválido'
}

console.log(resp)

// OPERADOR TERNÁRIO

a = 6
b = 7

var resposta = (a, b) ? 'maior' : a < b ? 'menor' : 'igual'
console.log(resposta)
