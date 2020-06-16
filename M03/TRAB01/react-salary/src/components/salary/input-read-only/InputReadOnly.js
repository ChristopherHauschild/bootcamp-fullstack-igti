import React, { Component } from 'react'
import ProgressBar from '../progress-bar/ProgressBar'

import css from './input-read-only.module.css'

import { calculateSalaryFrom } from '../../../helpers/calculateSalary'
import { formatNumber } from '../../../helpers/formatNumber'

export default class InputReadOnly extends Component {
  render() {
    const { valueInput } = this.props

    const baseINSS = formatNumber(calculateSalaryFrom(valueInput).baseINSS)
    const discountINSS = calculateSalaryFrom(valueInput).discountINSS
    const baseIRPF = formatNumber(calculateSalaryFrom(valueInput).baseIRPF)
    const discountIRPF = calculateSalaryFrom(valueInput).discountIRPF
    const netSalary = calculateSalaryFrom(valueInput).netSalary

    let percINSS = ((discountINSS / Number(valueInput)) * 100).toFixed(2)

    if (isNaN(percINSS)) {
      percINSS = 0
    }

    let percIRPF = ((discountIRPF / Number(valueInput)) * 100).toFixed(2)

    if (isNaN(percIRPF)) {
      percIRPF = 0
    }

    let percNetSalary = ((netSalary / Number(valueInput)) * 100).toFixed(2)

    if (isNaN(percNetSalary)) {
      percNetSalary = 0
    }

    return (
      <div className={css.container}>
        <div className={css.inputContainer}>

          <div className={css.inputItem}>
            <p className={css.titleItem}>Base INSS</p>
            <i className={`${css.icon} ${css.backGrey} material-icons`}>equalizer</i>
            <input
              className={css.backAutoItalic}
              name="BaseINSS"
              type="text"
              placeholder="Base INSS"
              value={baseINSS}
              readOnly
            />
          </div>

          <div className={`${css.inputItem} ${css.shadowOrange}`}>
            <p className={`${css.titleItem} ${css.backOrange}`}>Desconto INSS</p>
            <i className={`${css.icon} ${css.backOrange} material-icons`}>trending_down</i>
            <input
              className={css.backOrangeItalic}
              name="DescontoINSS"
              type="text"
              placeholder="Desconto INSS"
              value={` ${formatNumber(discountINSS)}  (${percINSS} %)`
              }
              readOnly
            />
          </div>

          <div className={css.inputItem}>
            <p className={css.titleItem}>Base IRPF</p>
            <i className={`${css.icon} ${css.backGrey} material-icons`}>equalizer</i>
            <input
              className={css.backAutoItalic}
              name="BaseIRPF"
              type="text"
              placeholder="Base IRPF"
              value={baseIRPF}
              readOnly
            />
          </div>

          <div className={`${css.inputItem} ${css.shadowRed}`}>
            <p className={`${css.titleItem} ${css.backRed}`}>Desconto IRPF</p>
            <i className={`${css.icon} ${css.backRed} material-icons`}>trending_down</i>
            <input
              className={css.backRedItalic}
              name="DescontoIRPF"
              type="text"
              placeholder="Desconto IRPF"
              value={` ${formatNumber(discountIRPF)}  (${percIRPF} %)`}
              readOnly
            />
          </div>

          <div className={`${css.inputItem} ${css.shadowBlue}`}>
            <p className={`${css.titleItem} ${css.backBlue}`}>Salário Líquido</p>
            <i className={`${css.icon} ${css.backBlue} material-icons`}>attach_money</i>
            <input
              className={css.backBlueItalic}
              name="SalarioLiquido"
              type="text"
              placeholder="Salário Líquido"
              value={` ${formatNumber(netSalary)}  (${percNetSalary} %)`}
              readOnly
            />
          </div>

        </div>
        <ProgressBar discINSS={percINSS} discIRPF={percIRPF} netS={percNetSalary} />
      </div>
    )
  }
}
