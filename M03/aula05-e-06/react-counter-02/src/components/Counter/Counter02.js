import React, { Component } from 'react'

import IncrementButton from './IncrementButton'
import DecrementButton from './DecrementButton'
import Value from './Value'
import Steps from './Steps'

import css from './counter.module.css'

export default class Counter2 extends Component {
  
  handleButtonClick = (type) => {
    this.props.onCount(type)
  }

  render() {
    const { countValue, currentStep } = this.props

    return (
      <div className={css.counterContainer}>

        <DecrementButton onDecrement={this.handleButtonClick} />

        <Value value={countValue} />
      
        <IncrementButton onIncrement={this.handleButtonClick} />
        
        <Steps currentStep={currentStep} />
      </div>
    )
  }
}
