import React, { Component } from 'react'

class DecrementButton extends Component {
  handleButton = () => {
    this.props.onDecrement('-')
  }

  render() {
    return (
      <button onClick={this.handleButton}>
        -
      </button>
    )
  }
}

export default DecrementButton