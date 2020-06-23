import React, { useState, useEffect } from 'react'

import Installment from './Installment'

import { calculateInterest } from '../helpers/calculateInterest'

export default function Installments({ initialValue, monthlyInterest, period }) {
  const [valueInstallments, setValueInstallments] = useState([])

  useEffect(() => {
    const newArray = calculateInterest(initialValue, monthlyInterest, period)

    setValueInstallments([...newArray])
  }, [initialValue, monthlyInterest, period])

  return (
    <div style={styles.box}>

      {valueInstallments.map((value, index) => {
        const { valueWithInterest, newValueWithInterest, newAccumulatedMonthly } = value

        return (
          <div key={index} style={styles.item}>
            <Installment
              index={index + 1}
              valueWithInterest={valueWithInterest}
              newValueWithInterest={newValueWithInterest}
              newAccumulatedMonthly={newAccumulatedMonthly}
            />
          </div>
        )
      })}</div>
  )
}

const styles = {
  box: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    
    alignItems: 'center',
    justifyContent: 'center',

    padding: '0px 10px',
    boxSizing: 'border-box',
    margin: '0px 20px'
  },

  item: {
    margin: '10px 15px'
  }
}
