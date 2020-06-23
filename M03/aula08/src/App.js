import React, { useState, useEffect } from 'react';
import Countries from './components/countries/Countries';
import Header from './components/header/Header';

export default function App() {
  const [allCountries, setAllCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [filteredPopulation, setFilteredPopulation] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    const fetchCountries = async() => {
      const res = await fetch('https://restcountries.eu/rest/v2/all')
      let allCountries = await res.json()

      allCountries = allCountries.map(({ name, numericCode, flag, population }) => {
        return {
          id: numericCode,
          name,
          filterName: name.toLowerCase(),
          flag,
          population
        }
      })

      const filteredPopulation = calculateTotalPopulation(allCountries)

      setAllCountries(allCountries)
      setFilteredCountries(Object.assign([], allCountries))
      setFilteredPopulation(filteredPopulation)
    }

    fetchCountries()

  }, [])

  const calculateTotalPopulation = (countries) => {
    const totalPopulation = countries.reduce((acc, cur) => {
      return acc + cur.population
    }, 0)

    return totalPopulation
  }

  // newText -> valor passado como param no onChangeFilter do Header
  const handleChangeFilter = (newText) => {
    setFilter(newText)

    const filteredLowerCase = newText.toLowerCase()

    const filteredCountries = allCountries.filter((country) => {
      return country.filterName.includes(filteredLowerCase)
    })

    const filteredPopulation = calculateTotalPopulation(filteredCountries)

    setFilteredCountries(filteredCountries)
    setFilteredPopulation(filteredPopulation)
  }

  return (
    <div className="container">
      <h3 style={styles.centeredTitle}>
        React Countries
        </h3>

      <Header
        filter={filter}
        countryCount={filteredCountries.length}
        totalPopulation={filteredPopulation}
        onChangeFilter={handleChangeFilter}
      />

      <Countries countries={filteredCountries} />

    </div>
  )
}

const styles = {
  centeredTitle: {
    textAlign: 'center'
  }
}
