import React, { useState } from 'react';
import Counter from './components/Counter/Counter'
import Counter02 from './components/Counter/Counter02'
import Band from './components/Band';

export default function App() {
  const [currentCounter, setCurrentCounter] = useState(3)
  const [steps, setSteps] = useState(0)

  const handleCount = (type) => {
    const counter = type === '+' ? currentCounter + 1 : currentCounter - 1
    
    setCurrentCounter(counter)

    setSteps(steps + 1)
  }

  return (
    <>
      <h3>Band</h3>
      <Band />

      <h3>Counter</h3>
      <Counter />
      <Counter />
      <Counter />

      <h3>Counter 2</h3>
      <Counter02 onCount={handleCount} countValue={currentCounter} currentStep={steps} />
      <Counter02 onCount={handleCount} countValue={currentCounter} currentStep={steps} />
      <Counter02 onCount={handleCount} countValue={currentCounter} currentStep={steps} />
    </>
  )
}
