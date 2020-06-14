import React, { Component } from 'react';

import { getNewTimestamp } from './helpers/dateTimeHelpers'

export default class App extends Component {
  constructor() {
    super()

    this.state = {
      clickArray: []
    }
  }

  handleButtonClick = () => {
    const newClickArray = Object.assign([], this.state.clickArray)
    newClickArray.push(getNewTimestamp())
    
    // realimenta estado
    this.setState({ clickArray: newClickArray })
  }

  componentDidUpdate() {
    document.title = this.state.clickArray.length.toString()
  }

  render() {
    const { clickArray } = this.state
    return (
      <>
        <h1> React e <em>Class Components</em> </h1>

        <button onClick={this.handleButtonClick}>
          Clique aqui
        </button>

        <ul>
          {clickArray.map(item => {
            return <li key={item}>{item}</li>
          })}
        </ul>
      </>
    )
  }
}
