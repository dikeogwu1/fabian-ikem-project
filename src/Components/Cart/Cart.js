import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CALCULATE_CART, CLOSE_CART_OVERLAY } from '../../Redux/action'
import './cart.css'
import CartItem from './CartItem'

class Cart extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.dispatch({ type: CALCULATE_CART })
    this.props.dispatch({ type: CLOSE_CART_OVERLAY })
  }

  componentDidUpdate() {
    this.props.dispatch({ type: CALCULATE_CART })
  }

  render() {
    const { cartItems, currentCurrency, total, inCartQuantity } = this.props

    return (
      <main>
        <section className='cart-container'>
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
                            key={item.id}
                            item={item}
                            currencyType={currencyType}
                          />
                        )
                      })}
                    </div>
                    <div className='cart-underline'></div>
                  </section>
                )
              }
              // cart overlay items without variant
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
        </section>
      </main>
    )
  }
}

const mapStateToProps = (state) => {
  const { cartItems, currentCurrency, total, inCartQuantity } = state
  return { cartItems, currentCurrency, total, inCartQuantity }
}

export default connect(mapStateToProps)(Cart)
