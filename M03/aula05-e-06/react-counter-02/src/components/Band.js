import React, { Component } from 'react'

export default class Band extends Component {
  constructor() {
    super()

    this.state = {
      bandName: 'Rush',

      bandMembers: [
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
    }
  }

  render() {
    const { bandName, bandMembers } = this.state

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
}
