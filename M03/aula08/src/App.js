import React, { Component } from 'react';
import Countries from './components/countries/Countries';
import Header from './components/header/Header';

export default class App extends Component {
  constructor() {
    super()

    this.state = {
      allCountries: [],
      filteredCountries: [],
      filteredPopulation: 0,
      filter: ''
    }
  }

  async componentDidMount() {
    const res = await fetch('https://restcountries.eu/rest/v2/all')
    const json = await res.json()

    const allCountries = json.map(({ name, numericCode, flag, population }) => {
      return {
        id: numericCode,
        name,
        filterName: name.toLowerCase(),
        flag,
        population
      }
    })

    const filteredPopulation = this.calculateTotalPopulation(allCountries)
    
    this.setState({
      allCountries,
      filteredCountries: Object.assign([], allCountries),
      filteredPopulation
    })
  }

  calculateTotalPopulation = (countries) => {
    const totalPopulation = countries.reduce((acc, cur) => {
      return acc + cur.population
    }, 0)

    return totalPopulation
  }

  // newText -> valor passado como param no onChangeFilter do Header
  handleChangeFilter = (newText) => {
    this.setState({
      filter: newText
    })

    const filteredLowerCase = newText.toLowerCase()

    const filteredCountries = this.state.allCountries.filter((country) => {
      return country.filterName.includes(filteredLowerCase)
    })

    const filteredPopulation = this.calculateTotalPopulation(filteredCountries)

    this.setState({
      filteredCountries,
      filteredPopulation
    })
  }

  render() {
    const { filteredCountries, filteredPopulation, filter } = this.state

    return (
      <div className="container">
        <h3 style={styles.centeredTitle}>
          React Countries
        </h3>

        <Header
          filter={filter}
          countryCount={filteredCountries.length}
          totalPopulation={filteredPopulation}
          onChangeFilter={this.handleChangeFilter}
        />

        <Countries countries={filteredCountries} />

      </div>
    )
  }
}

const styles = {
  centeredTitle: {
    textAlign: 'center'
  }
}
