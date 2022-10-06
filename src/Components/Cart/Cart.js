import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  CALCULATE_CART,
  CLOSE_MINI_CART,
  CLOSE_SWITCHER,
} from '../../Redux/action'
import { StyledCart, StyledEmpty } from '../../Styles/Cart.styled'
import CartItem from './CartItem'

class Cart extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.dispatch({ type: CALCULATE_CART })
    this.props.dispatch({ type: CLOSE_MINI_CART })
  }

  componentDidUpdate() {
    this.props.dispatch({ type: CALCULATE_CART })
  }

  render() {
    const { cartItems, currentCurrency, total, inCartQuantity, dispatch } =
      this.props

    if (cartItems.length < 1) {
      return (
        <StyledEmpty>
          <h1 className='empty-cart'>your bag is empty</h1>
        </StyledEmpty>
      )
    }

    return (
      <StyledCart onClick={() => dispatch({ type: CLOSE_SWITCHER })}>
        <div className='cart-container'>
          <h2 className='title'>Cart</h2>
          <div className='cart-underline'></div>
          <div className='cart-items-wrapper'>
            {cartItems.map((item) => {
              const currencyType = item.prices.find(
                (item) => item.currency.label === currentCurrency.label
              )
              if (item.productVariant) {
                // cart overlay items without variant
                return (
                  <section key={item.id}>
                    <CartItem item={item} currencyType={currencyType} />
                    <div>
                      {item.productVariant.map((item) => {
                        return (
                          <CartItem
                            item={item}
                            currencyType={currencyType}
                            key={JSON.stringify(item.selectedGallery)}
                          />
                        )
                      })}
                    </div>
                    <div className='cart-underline'></div>
                  </section>
                )
              }
              // cart items without variant
              return (
                <section key={item.id}>
                  <CartItem item={item} currencyType={currencyType} />
                  <div className='cart-underline'></div>
                </section>
              )
            })}
          </div>
          <section className='cart-total-wrapper'>
            <div className='total-text'>
              <p>Tax 21%:</p>
              <p>Quantity:</p>
              <p>Total:</p>
            </div>
            <div className='total-numbers'>
              <b>
                {' '}
                <span>{currentCurrency.symbol}</span>
                {''}
                {parseFloat((total / 21).toFixed(2))}
              </b>
              <b> {inCartQuantity}</b>
              <b>
                <span>{currentCurrency.symbol}</span>
                {''}
                {parseFloat((total + total / 21).toFixed(2))}
              </b>
            </div>
          </section>
          <button className='place-order'>Order</button>
        </div>
      </StyledCart>
    )
  }
}

const mapStateToProps = (state) => {
  const { cartItems, currentCurrency, total, inCartQuantity } = state
  return { cartItems, currentCurrency, total, inCartQuantity }
}

export default connect(mapStateToProps)(Cart)
