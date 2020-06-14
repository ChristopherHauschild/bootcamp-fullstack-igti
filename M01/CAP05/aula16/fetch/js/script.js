'use strict'

window.addEventListener('load', () => {

  doFetch()
  doFetchAsyncAwait()

  executeDivisionPromise()
  executeDivisionPromiseAsyncAwait()
})

function showData(data) {
  const user = document.querySelector('#user')
  user.textContent = data.login + ' ' + data.name
}

function divisionPromise(a, b) {
  // retornando promise para poder trabalhar em cima
  return new Promise((resolve, reject) => {
    if (b === 0) {
      reject('Não é possível dividir por 0')
      // errorMessage
    }

    resolve(a / b)
  })
}

function executeDivisionPromise() {
  // promises retornadas a partir da função
  divisionPromise(12, 6).then(result => {
    console.log(result)
  })

  divisionPromise(12, 0).then(result => {
    console.log(result)
  }).catch(errorMessage => {
    console.log('Falha na divisão:', errorMessage)
  })
}

async function executeDivisionPromiseAsyncAwait() {
  const division = await divisionPromise(12, 2)
  console.log(division)
}

function doFetch() {
  fetch('https://api.github.com/users/rrgomide')
    .then(res => {
      // primeiro traz dados binários e segundo retorna promise com os dados
      res.json().then(data => {
        showData(data)
      })
    })
}

async function doFetchAsyncAwait() {
  const res = await fetch('https://api.github.com/users/rrgomide')
  const json = await res.json()
  console.log(json)
}