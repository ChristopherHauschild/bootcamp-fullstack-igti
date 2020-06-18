import React from 'react'

import IncrementButton from './IncrementButton'
import DecrementButton from './DecrementButton'
import Value from './Value'
import Steps from './Steps'

import css from './counter.module.css'

export default function Counter2(props) {

  const handleButtonClick = (type) => {
    props.onCount(type)
  }

  const { countValue, currentStep } = props

  return (
    <div className={css.counterContainer}>

      <DecrementButton onDecrement={handleButtonClick} />

      <Value value={countValue} />

      <IncrementButton onIncrement={handleButtonClick} />

      <Steps currentStep={currentStep} />
    </div>
  )
}
