import React, { Component } from 'react'

export default class Value extends Component {
  render() {
    return (
      <div>
        <span> {this.props.value} </span>
      </div>
    )
  }
}
