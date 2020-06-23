import React, { useState, useEffect } from 'react'
import User from './User'

export default function Users({ users }) {
  const [secondsVisible, setSecondsVisible] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsVisible(secondsVisible + 1)
    }, 1000)

    return () => {
      // retorna para fazer limpeza do evento
      clearInterval(interval)
    }
  }, [secondsVisible])

  return (
    <div>
      <p>Component Users visible for {secondsVisible} </p>

      <ul>
        {users.map(user => {
          const { login } = user
          return <li key={login.uuid}>
            <User user={user} />
          </li>
        })}
      </ul>
    </div>
  )
}
