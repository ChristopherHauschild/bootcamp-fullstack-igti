import React, { useState } from 'react'

import Installments from './Installments'

export default function Form({ onChangeInput }) {
  const [initialValue, setInitialValue] = useState(1000)
  const [monthlyInterest, setMonthlyInterest] = useState(1)
  const [period, setPeriod] = useState(1)

  const handleFormSubmit = (event) => {
    event.preventDefault()
  }

  const handleChangeInput = (event) => {
    const newMonthlyInterest = event.target.value
    setMonthlyInterest(newMonthlyInterest)
    onChangeInput(newMonthlyInterest)
  }

  return (
    <div style={styles.container}>
      <form onSubmit={handleFormSubmit} style={styles.form}>

        <div className='input-field' style={styles.inputDiv}>
          <input
            id='inputValue'
            type='number'
            value={initialValue}
            onChange={(event) => setInitialValue(event.target.value)}
            min={100}
            max={100000}
            step={100}
            autoFocus
          />
          <label className='active' htmlFor='inputValue'>
            Montante inicial:
          </label>
        </div>

        <div className='input-field' style={styles.inputDiv}>
          <input
            id='inputMonthlyInterest'
            type='number'
            value={monthlyInterest}
            onChange={handleChangeInput}
            min={-12}
            max={12}
            step={0.1}
          />
          <label className='active' htmlFor='inputMonthlyInterest'>
            Taxa de juros mensal:
          </label>
        </div>

        <div className='input-field' style={styles.inputDiv}>
          <input
            id='inputPeriod'
            type='number'
            value={period}
            onChange={(event) => setPeriod(event.target.value)}
            min={1}
            max={36}
          />
          <label className='active' htmlFor='inputPeriod'>
            Período (meses):
          </label>
        </div>

      </form>

      <Installments
        initialValue={initialValue}
        monthlyInterest={monthlyInterest}
        period={period}
      />
    </div>
  )
}

const styles = {
  container: {
    width: '100%',
    boxSizing: 'border-box'
  },

  form: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    margin: '0px 20px',
    marginTop: '30px',
    marginBottom: '0px',
    padding: '10px'
  },

  inputDiv: {
    minWidth: '32%',
    padding: '10px'
  }
}