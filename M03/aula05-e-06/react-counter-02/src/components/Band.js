import React, { useState } from 'react'

const BAND_MEMBERS = [
  {
    id: '1',
    name: 'Fulano 01',
    instrument: 'Guitarra'
  },
  {
    id: '2',
    name: 'Fulano 02',
    instrument: 'Baixo'
  },
  {
    id: '3',
    name: 'Fulano 03',
    instrument: 'Bateria'
  }
]

export default function Band() {
  const [bandMembers, setBandMembers] = useState(BAND_MEMBERS)
  const [bandName, setBandName] = useState('Rush')

  return (
    <>
      <h5>{bandName}</h5>

      <ul>
        {bandMembers.map(({ id, name, instrument }) => {
          return (
            <li key={id}>
              {name} - {instrument}
            </li>
          )
        })}
      </ul>
    </>
  )
}
