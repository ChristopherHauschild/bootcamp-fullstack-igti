import React, { Component } from 'react'
import User from './User'

export default class Users extends Component {
  constructor() {
    super()

    this.state = {
      secondsVisible: 0
    }

    this.interval = null
  }

  componentDidMount() {
    console.log('DidMount of Users')

    this.interval = setInterval(() => {
      const { secondsVisible } = this.state

      this.setState({
        secondsVisible: secondsVisible + 1
      })
    }, 1000)
  }

  componentDidUpdate() {
    console.log('DidUpdate of Users')
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    const { users } = this.props
    const { secondsVisible } = this.state

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
}
