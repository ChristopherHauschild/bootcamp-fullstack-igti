'use strict'

let countInterval = 0
let loading = null
let form = null
let inputFind = null
let btnFind = null

let usersInfo = []
let statisticInfo = []

let tabUsers = null
let tabStatistics = null
let titleStatistics = null

let countUsers = 0

let totalMasc = 0
let totalFem = 0
let totalAges = 0
let mediaAges = 0

let numberFormat = null

window.addEventListener('load', () => {

  const interval = setInterval(() => {
    countInterval++

    if (countInterval === 3) {
      loading = document.querySelector("#loading")
      loading.style.display = 'none'

      inputFind.disabled = false

      this.clearInterval(interval)
      return
    }

  }, 1000)

  form = document.querySelector('form')
  form.addEventListener('submit', () => { event.preventDefault() })

  btnFind = document.querySelector('#btnFind')
  btnFind.addEventListener('click', onInputOrButton)

  inputFind = document.querySelector('#inputFind')
  inputFind.focus()
  inputFind.addEventListener('keyup', onInputOrButton)

  tabUsers = document.querySelector('#tabUsers')
  tabStatistics = document.querySelector('#tabStatistics')

  countUsers = document.querySelector('#countUsers')
  titleStatistics = document.querySelector('#titleStatistics')

  numberFormat = Intl.NumberFormat('pt-br')

})

async function fetchUsers() {
  const res = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo')
  const json = await res.json()

  usersInfo = json.results.map(user => {

    const { name, picture, dob, gender } = user

    return {
      name: `${name.first} ${name.last}`,
      picture: picture.thumbnail,
      age: dob.age,
      gender
    }
  })

  render()
}

function onInputOrButton() {
  // função para alterar botão conforme value do input
  buttonDisabled(event)

  if(event.type === 'click' || event.key === 'Enter') {
    render()
    
    fetchUsers()
  }
}

function render() {
  renderUsers()
  renderStatistics()
  renderSummary()
}

function buttonDisabled(event) {
  const valueInput = event.target.value

  if (valueInput !== '') {
    btnFind.disabled = false
  } else {
    btnFind.disabled = true
  }
}

function renderUsers() {

  const nameInput = inputFind.value

  let usersHTML = '<div>'

  const findName = usersInfo.filter(user => user.name.toLowerCase().match(nameInput.toLowerCase()))

  usersInfo = [...findName]

  usersInfo.sort((a, b) => {
    return a.name.localeCompare(b.name)
  })

  usersInfo.forEach(user => {
    const { name, picture, age } = user

    const userHTML = `
      <div class="user">
        <div class="picture">
          <img src="${picture}" alt="${name}">
        </div>
        <div class="user-description">
          <p>${name}, ${age}</p>
        </div>
      </div>
    `
  
    usersHTML += userHTML
  })
  usersHTML += '</div>'
  tabUsers.innerHTML = usersHTML
  
}

function renderSummary() {
  countUsers.textContent = usersInfo.length + ' usuário(s) encontrado(s)'
}

function renderStatistics() {
  const totalMasc =
    usersInfo.filter(user => user.gender === 'male')

  const totalFem =
    usersInfo.filter(user => user.gender === 'female')

  const totalAges = usersInfo.reduce((acc, current) => {
    return acc + current.age
  }, 0)

  const mediaAges = totalAges / usersInfo.length

  const statisticsHTML = `
  <div class='statistic'>
    <div>
      <p>Sexo masculino: ${totalMasc.length}</p>
    </div>
    <div>
      <p>Sexo feminino: ${totalFem.length}</p>
    </div>
    <div>
      <p>Soma das idades: ${formatNumber(totalAges)}</p>
    </div>
    <div>
      <p>Média das idades: ${formatNumber(mediaAges.toFixed(2))}</p>
    </div>
  </div>
`

  tabStatistics.innerHTML = statisticsHTML
  titleStatistics.textContent = 'Estatísticas'
}

function formatNumber(number) {
  return numberFormat.format(number)
}