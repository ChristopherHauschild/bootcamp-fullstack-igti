import React, { useState, useEffect } from 'react';
import { getNewTimestamp } from './helpers/dateTimeHelpers'

export default function App () {
  const [clickArray, setClickArray] = useState([])

  useEffect(() => {
    document.title = clickArray.length.toString()
  })

  const handleButtonClick = () => {
    const newClickArray = Object.assign([], clickArray)
    newClickArray.push(getNewTimestamp())
    
    setClickArray(newClickArray)
  }

  return (
    <>
      <h1>
        React com <em>Hooks</em>
      </h1>

      <button onClick={handleButtonClick}>Clique aqui</button>
      
      <ul>
        {clickArray.map(item => {
          return <li key={item}>{item}</li>
        })}
      </ul>
    </>
  )
}
