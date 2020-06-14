import React, { Component } from 'react'

import css from './countries.module.css'

export default class Country extends Component {
  render() {
    const { country } = this.props
    const { name, flag } = country

    return (
      <div className={`${css.country} ${css.border}`}>
        <img src={flag} alt={name} className={css.flag} />
        <span className={css.countryName}>{name}</span>
      </div>
    )
  }
}
