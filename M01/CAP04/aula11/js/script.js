'use strict' // JS acusa mais erros

window.addEventListener('load', () => {
  doMap()
  doFilter()
  doForEach()
  doReduce()
  doFind()
  doSome()
  doEvery()
  doSort()
})

function doMap() {
  // (item, função)
  const nameEmailArray =  people.results.map(person => {
    return {
      name: person.name,
      email: person.email
    }
  })

  console.log(nameEmailArray)
  return nameEmailArray
}

function doFilter() {
  // (item, função) -> retorna verdadeiro ou falso
  const olderThan50 = people.results.filter(person => {
    return person.dob.age > 50
  })

  console.log(olderThan50)
}

function doForEach() {
  const mappedPeople = doMap()
  // (item, função) -> retorna mesmo array aplicando lógica
  mappedPeople.forEach(person => {
    person.nameSize = 
    person.name.title.length +
    person.name.first.length + 
    person.name.last.length
  })

  console.log(mappedPeople)
}

function doReduce() {
  // reduce((acc, current) função {}, initialValue)
  const totalAges = people.results.reduce((accumulator, current) => {
    return accumulator + current.dob.age
  }, 0)

  console.log(totalAges)

  // let sumAge = 0
  
  // for (let i = 0; i < people.results.length; i++) {
  //   var current = people.results[i]
  //   sumAge += current.dob.age
  // }

  // console.log(sumAge)
}

function doFind() {
  // (item, função) -> retorna o primeiro item conforme regra
  const found = people.results.find(person => {
    return person.location.state === 'Minas Gerais'
  })

  console.log(found)
}

function doSome() {
  // (item, função) -> verifica se há um elemento conforme regra passada (boolean)
  const found = people.results.some(person => {
    return person.location.state === 'Amazonas'
  })

  console.log('some', found)
}

function doEvery() {
  // (item, função) -> verifica se todos elementos estão conforme regra passada (boolean)
  const every = people.results.every(person => {
    return person.nat === 'BR'
  })

  console.log(every)
}

function doSort() {
  // ((param1, param2) função)
  const mappedNames = people.results
    .map(person => {
      return {
        name: person.name.first
      }
    })
    .filter(person =>  person.name.startsWith('A'))
    .sort((a, b) => {
      return a.name.length - b.name.length // menor -> maior
      // return a.name.length - b.name.length // maior -> menor
      // return a.name.localeCompare(b.name) // ordem alfabética
    })
  console.log(mappedNames)
}