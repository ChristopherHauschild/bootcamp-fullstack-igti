import React, { useState } from 'react'

import IncrementButton from './IncrementButton'
import DecrementButton from './DecrementButton'
import Value from './Value'
import Steps from './Steps'

import css from './counter.module.css'

export default function Counter() {
  const [currentCounter, setCurrentCounter] = useState(2)
  const [steps, setSteps] = useState(0)

  const handleButtonClick = (type) => {
    const counter = type === '+' ? currentCounter + 1 : currentCounter - 1
    
    setCurrentCounter(counter)

    setSteps(steps + 1)
  }

  return (
    <div className={css.counterContainer}>

      <DecrementButton onDecrement={handleButtonClick} />

      <Value value={currentCounter} />

      <IncrementButton onIncrement={handleButtonClick} />

      <Steps currentStep={steps} />
    </div>
  )
}
