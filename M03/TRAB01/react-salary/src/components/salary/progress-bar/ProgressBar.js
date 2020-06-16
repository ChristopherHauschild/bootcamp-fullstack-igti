import React, { Component } from 'react'

import css from './progress-bar.module.css'

export default class ProgressBar extends Component {
  render() {
    const { discINSS, discIRPF, netS } = this.props

    console.log(discINSS, discIRPF, netS)
    return (
      <div>
        <div className={css.containerLabel}>
        <label className={css.labelBar}>
          Barra de Progresso | <span className={css.squareOrange}>1</span> Desc. INSS |
          <span className={css.squareRed}>2</span> Desc. IRPF | 
          <span className={css.squareBlue}>3</span> Salário Líquido
          </label>
        </div>
        <div className={css.bar}>
          <div
            style={{
              height: "100%",
              backgroundColor: "#e67e22",
              width: `${discINSS}%`
            }}
          ></div>
          <div
            style={{
              height: "100%",
              backgroundColor: "rgb(153, 42, 42)",
              width: `${discIRPF}%`
            }}
          ></div>
          <div
            style={{
              height: "100%",
              backgroundColor: "#16a085",
              width: `${netS}%`
            }}
          ></div>
        </div>
      </div>
    )
  }
}
