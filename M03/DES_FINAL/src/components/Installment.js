import React, { useState, useEffect } from 'react'

import { formatNumber, formatPercentage } from '../helpers/formatNumber'

export default function Installment(props) {
  const [colorText, setColor] = useState('black')
  const [colorPercent, setColorPercent] = useState('black')
  const [iconType, setIconType] = useState('airplay')
  const [digitOperation, setDigitOperation] = useState('+')

  const { index, valueWithInterest, newValueWithInterest, newAccumulatedMonthly } = props

  useEffect(() => {
    if(newValueWithInterest > 0) {
      setColor('darkgreen')
      setColorPercent('#14ff47')
      setIconType('trending_up')
      setDigitOperation('+')
      return
    } else if(newValueWithInterest < 0) {
      setColor('darkred')
      setColorPercent('red')
      setIconType('trending_down')
      setDigitOperation(' ')
      return
    } else {
      setColor('black')
      setColorPercent('black')
      setIconType('equalizer')
      setDigitOperation(' ')
      return
    }

  }, [newValueWithInterest])

  return (
    <div>
    <p>Mês <b>{index}</b></p>
    <div style={styles.card}>
      <div style={styles.iconContainer}>
        <i className="material-icons" style={{ fontSize: '2.9rem', color: colorText }}>{iconType}</i>
      </div>
      
      <div style={styles.data}>
        <span style={{ color: colorText, fontWeight: 'bold' }}>{formatNumber(valueWithInterest)}</span>
        <span style={{ color: colorText }}>{digitOperation}{formatNumber(newValueWithInterest)}</span>
        <span style={{ color: colorPercent, marginTop: '10px', fontWeight: '700' }}>{digitOperation}{formatPercentage(newAccumulatedMonthly)}</span>
      </div>
    </div>
    </div>
  )
}

const styles = {
  card: {
    display: 'flex',
    flexDirection: 'row',

    width: '170px',
    height: '100px',
    background: 'yellow',
    boxShadow: '2px 2px 1px 0px lightgrey',
  },

  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    width: '60px',
    height: '100%',
    background: '#efefef'
  },

  data: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    boxSizing: 'border-box',
    overflow: 'hidden',
    width: '110px',
    height: '100%',
    background: '#fafafa'
  }
}
