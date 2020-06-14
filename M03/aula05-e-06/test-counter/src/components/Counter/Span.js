import React, { Component } from 'react'

export default class Span extends Component {
  render() {
    return (
      <div>
        <span> ({this.props.currentSteps}) </span>
      </div>
    )
  }
}
