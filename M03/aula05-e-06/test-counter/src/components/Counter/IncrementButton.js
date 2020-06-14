import React, { Component } from 'react'

class IncrementButton extends Component {
  handleButton = () => {
    this.props.onIncrement('+')
  }

  render() {
    return (
      <button onClick={this.handleButton}>
        +
      </button>
    )
  }
}

export default IncrementButton