import React from 'react'

export default function Form(props) {
  const {
    onValueChange,
    onMonthlyInterestChange,
    onPeriodChange,
    initialValue,
    monthlyInterest,
    period
  } = props

  const handleFormSubmit = (event) => {
    event.preventDefault()
    console.log('submit')
  }

  const handleInputValueChange = (event) => {
    const newValue = event.target.value
    console.log(`inputValue: ${newValue}`)

    onValueChange(newValue)
  }

  const handleInputMonthlyInterestChange = (event) => {
    const newMonthlyInterest = event.target.value
    console.log(`inputMonthlyInterest: ${newMonthlyInterest}`)
    
    onMonthlyInterestChange(newMonthlyInterest)
  }

  const handleInputPeriodChange = (event) => {
    const newPeriod = event.target.value
    console.log(`inputPeriod: ${newPeriod}`)

    onPeriodChange(newPeriod)
  }

  return (
    <div style={styles.container}>
      <form onSubmit={handleFormSubmit} style={styles.form}>
        
        <div className='input-field' style={styles.inputDiv}>
          <input
            id='inputValue'
            type='number'
            value={initialValue}
            onChange={handleInputValueChange}
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
            onChange={handleInputMonthlyInterestChange}
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
            onChange={handleInputPeriodChange}
            min={1}
            max={36}
          />
          <label className='active' htmlFor='inputPeriod'>
            Período (meses):
          </label>
        </div>

      </form>
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

    margin: '20px 20px',
    padding: '10px'
  },

  inputDiv: {
    minWidth: '32%',
    padding: '10px'
  }
}