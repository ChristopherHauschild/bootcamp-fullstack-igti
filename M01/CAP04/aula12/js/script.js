'use strict' // JS acusa mais erros

window.addEventListener('load', () => {
  console.log('Hello World!')

  doSpread()
  doRest()
  doDestructuring()
})

function doSpread() {
  const marriedMen = people.results.filter(
    person => person.name.title === 'Mr'
  )
  const marriedWomen = people.results.filter(
    person => person.name.title === 'Ms'
  )

  const marriedPeople = [...marriedMen, ...marriedWomen, { msg: 'Teste' }]
  
  console.log(marriedPeople)
}

function doRest() {
  console.log(infiniteSum(1, 2))
  console.log(infiniteSum(6, 2, 10, 1111, 333, -4))
}

function infiniteSum(...numbers) {
  // transforma em vetor
  return numbers.reduce((acc, curr) => acc + curr, 0)
}

function doDestructuring() {
  const first = people.results[0]

  // repetitivo
  // const username = first.login.username
  // const password = first.login.password

  // utilizando destructuring
  const {username, password} = first.login
  
  console.log(username)
  console.log(password)
}