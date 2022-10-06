import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CALCULATE_CART, SWITCH_CURRENCY } from '../../Redux/action'
import { StyledCurrencySwticher } from '../../Styles/CurrencySwitcher.styled'

class CurrencySwitch extends Component {
  render() {
    const { currencies, dispatch } = this.props
    return (
      <StyledCurrencySwticher>
        {currencies.map((currency, index) => {
          return (
            <li
              key={index}
              onClick={() => {
                dispatch(
                  { type: SWITCH_CURRENCY, payload: index },
                  dispatch({ type: CALCULATE_CART })
                )
              }}
            >
              {currency.symbol} <span>{currency.label}</span>
            </li>
          )
        })}
      </StyledCurrencySwticher>
    )
  }
}
const mapStateToProps = (state) => {
  return { currencies: state.currencies }
}
export default connect(mapStateToProps)(CurrencySwitch)
