'use strict'

// State

let tabCountries = null
let tabFavorites = null

let allCountries = []
let favoriteCountries = []

let countCountries = 0
let countFavorites = 0

let totalPopulationList = 0
let totalPopulationFavorites = 0

let numberFormat = null

window.addEventListener('load', () => {

  // DOM
  tabCountries = document.querySelector('#tabCountries')
  tabFavorites = document.querySelector('#tabFavorites')

  countCountries = document.querySelector('#countCountries')
  countFavorites = document.querySelector('#countFavorites')

  totalPopulationList = document.querySelector('#totalPopulationList')
  totalPopulationFavorites = document.querySelector('#totalPopulationFavorites')

  numberFormat = Intl.NumberFormat('pt-br')

  fetchCountries()
})

async function fetchCountries() {
  const res = await fetch('https://restcountries.eu/rest/v2/all')
  const json = await res.json()
  // retornando array com elemementos da API para serem utilizados na aplicação
  allCountries = json.map(country => {

    const { numericCode, translations, population, flag } = country
    // não mais necessário 'id: country.numericCode'
    return {
      id: numericCode,
      name: translations.pt,
      population, // === population: population
      formattedPopulation: formatNumber(population),
      flag // === flag: flag
    }
  })

  render()
}

function render() {

  renderCountryList()
  renderFavorites()
  renderSummary()
  handleCountryButtons()

}

function renderCountryList() {
  let countriesHTML = '<div>'

  allCountries.forEach(country => {
    // forEach() no array com propriedades mapeadas anteriormente
    const { name, flag, id, formattedPopulation } = country

    const countryHTML = `
      <div class='country'>
        <div>
          <a id="${id}" class="waves-effect waves-light btn">+</a>
        </div>
        <div class='flag'>
          <img src="${flag}" alt="${name}">
        </div>
        <div class='name-list'>
          <ul>
            <li>${name}</li>
            <li>${formattedPopulation}</li>
          </ul>
        </div>
      </div>
    `
    // no caso de strings concatena
    countriesHTML += countryHTML
  })
  countriesHTML += '</div>'
  tabCountries.innerHTML = countriesHTML
}

function renderFavorites() {
  let favoritesHTML = '<div>'

  favoriteCountries.forEach(country => {
    const { name, flag, id, formattedPopulation } = country

    const favoriteCountrieHTML = `
      <div class='country'>
        <div>
          <a id="${id}" class="waves-effect waves-light btn red darken-4">-</a>
        </div>
        <div class='flag'>
          <img src="${flag}" alt="${name}">
        </div>
        <div class='name-list'>
          <ul>
            <li>${name}</li>
            <li>${formattedPopulation}</li>
          </ul>
        </div>
      </div>
    `

    favoritesHTML += favoriteCountrieHTML
  })

  favoritesHTML += '</div>'
  tabFavorites.innerHTML = favoritesHTML

}

function renderSummary() {
  countCountries.textContent = allCountries.length
  countFavorites.textContent = favoriteCountries.length

  const totalPopulation = allCountries.reduce((acc, current) => {
    return acc + current.population
  }, 0)

  const totalFavorites = favoriteCountries.reduce((acc, current) => {
    return acc + current.population
  }, 0)

  totalPopulationList.textContent = formatNumber(totalPopulation)
  totalPopulationFavorites.textContent = formatNumber(totalFavorites)
}

function handleCountryButtons() {
  // .btn -> class presente em tabCountries e tabFavorites ``
  // retorna por padrão NodeList
  const countryButtons = Array.from(tabCountries.querySelectorAll('.btn'))
  const favoriteButtons = Array.from(tabFavorites.querySelectorAll('.btn'))
  
  // adicionando eventos no click dos botões
  countryButtons.forEach(button => {
    button.addEventListener('click', () => addToFavorites(button.id))
  })

  favoriteButtons.forEach(button => {
    button.addEventListener('click', () => removeFromFavorites(button.id))
  })
}

function addToFavorites(id) {
  // retorna elemento com condição de id no click do botão
  const countryToAdd = allCountries.find(country => country.id === id)
  
  favoriteCountries = [...favoriteCountries, countryToAdd]

  favoriteCountries.sort((a, b) => {
    return a.name.localeCompare(b.name)
  })

  allCountries = allCountries.filter(country => country.id !== id)

  render()
}

function removeFromFavorites(id) {
  // retorna elemento com condição de id no click do botão
  const countryToRemove = favoriteCountries.find(country => country.id === id)
  
  allCountries = [...allCountries, countryToRemove]

  allCountries.sort((a, b) => {
    return a.name.localeCompare(b.name)
  })

  favoriteCountries = favoriteCountries.filter(country => country.id !== id)

  render()
}

function formatNumber(number) {
  return numberFormat.format(number)
}