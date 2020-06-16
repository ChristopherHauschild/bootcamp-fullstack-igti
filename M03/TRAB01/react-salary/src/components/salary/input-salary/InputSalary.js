import React, { Component } from 'react'

import css from './input-salary.module.css'

export default class InputSalary extends Component {
  constructor() {
    super()

    this.state = {
      inputValue: ''
    }
  }

  handleInputChange = (event) => {
    const newText = event.target.value.replace(/[\D]+/g,'')
    this.props.currentText(newText)
  }

  render() {
    return (
      <div className={css.containerInput}>
        <label>
          Salário Bruto
        <input
          onChange={this.handleInputChange}
          className={css.inputMargin}
          type="text"
          placeholder="Informe o salário bruto"
        />
        </label>
      </div>
    )
  }
}
