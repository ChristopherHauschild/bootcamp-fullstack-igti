import React, { Component } from 'react'

export default class IncrementButton extends Component {
  handleButtonClick = () => {
    this.props.onIncrement('+')
  }
  
  render() {
    return (
      <div>
        <button
          onClick={this.handleButtonClick}
          className="waves-effect waves-light btn green darken-2"
        >
          +
        </button>
      </div>
    )
  }
}
