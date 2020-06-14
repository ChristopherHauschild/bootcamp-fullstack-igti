import React, { Component } from 'react'

import css from './user.module.css'

export default class User extends Component {
  render() {
    const { name, picture } = this.props.user

    return (
      <div className={css.flexRow}>
        <img className={css.avatar} src={picture.large} alt={name.first} />
        <span>{name.first}</span>
      </div>
    )
  }
}
