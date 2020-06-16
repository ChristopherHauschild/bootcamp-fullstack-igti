import React, { Component } from 'react'

import InputSalary from './input-salary/InputSalary'
import InputReadOnly from './input-read-only/InputReadOnly'

export default class index extends Component {
  constructor() {
    super()

    this.state = {
      fullSalary: 0
    }
  }

  handleInputChange = (newText) => {
    this.setState({
      fullSalary: newText.replace(/[^\d]+/g,'')
    })
  }

  render() {
    const { fullSalary } = this.state
    return (
      <div>
        <InputSalary currentText={this.handleInputChange} />
        <InputReadOnly valueInput={fullSalary} />
      </div>
    )
  }
}
