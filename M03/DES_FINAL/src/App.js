import React, { useState, useEffect } from 'react';

import Form from './components/Form';
import Installment from './components/Installment';
import Installments from './components/Installments';

export default function App() {
  const [initialValue, setInitialValue] = useState(1000)
  const [monthlyInterest, setMonthlyInterest] = useState(1)
  const [period, setPeriod] = useState(1)

  useEffect(() => {

    console.log(initialValue)
    console.log(monthlyInterest)
    console.log(period)

  }, [initialValue, monthlyInterest, period])

  const handleValueChange = (newValue) => {
    setInitialValue(newValue)
  }

  const handleMonthlyInterestChange = (newValue) => {
    setMonthlyInterest(newValue)
  }

  const handlePeriodChange = (newValue) => {
    setPeriod(newValue)
  }

  return (
    <div className='container center' style={styles.box}>
      <h4>React - Juros Compostos</h4>
      <Form
        onValueChange={handleValueChange}
        onMonthlyInterestChange={handleMonthlyInterestChange}
        onPeriodChange={handlePeriodChange}
        initialValue={initialValue}
        monthlyInterest={monthlyInterest}
        period={period}
      />
      <Installments period={period}/>
      <Installment />
    </div>
  )
}

const styles = {
  box: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    margin: '30px auto',
    paddingTop: '10px',
    paddingBottom: '40px',

    background: '#fff',
    borderRadius: '3px',
    boxShadow: '2px 2px 1.5px 0px lightgrey'
  }
}
