'use strict' // JS acusa mais erros

// ========== var x let ==========

function withVar() {
  for (var i = 0; i < 10; i++) {
    console.log('var ' + i)
  }

  i = 20;
  console.log(i)
}

function withLet() {
  for (let i = 0; i < 10; i++) {
    console.log('let ' + i)
  }
  
  // -> i is not defined
  
  // i = 20;
  // console.log(i)
}

withVar()
withLet()

// ========== const ==========

// -> assignment to constante variabel

// const c = 10
// c = 20

// não garante imutabilidade total
const d = []
console.log(d)

d.push(1)
console.log(d)