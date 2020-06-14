import React, { Component } from 'react'

import IncrementButton from './IncrementButton'
import DecrementButton from './DecrementButton'
import Value from './Value'
import Span from './Span'

export default class Counter extends Component {
  constructor() {
    super()

    this.state = {
      count: 0,
      steps: 0
    }
  }

  handleButton = (type) => {
    const { count, steps } = this.state

    this.setState({
      count: (type === '+') ? count + 1 : count - 1,
      steps: steps + 1
    })

  }

  render() {
    const { count, steps } = this.state

    return (
      <div>
        <IncrementButton onIncrement={this.handleButton} />

        <Value value={count} />

        <DecrementButton onDecrement={this.handleButton} />

        <Span currentSteps={steps} />
      </div>
    )
  }
}
