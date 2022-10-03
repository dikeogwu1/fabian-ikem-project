import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CALCULATE_CART } from '../../Redux/action'
import './cartOverlay.css'
import OverlayItems from './OverlayItems'
import { Link } from 'react-router-dom'

class CartOverlay extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.dispatch({ type: CALCULATE_CART })
  }
  componentDidUpdate() {
    this.props.dispatch({ type: CALCULATE_CART })
  }
  render() {
    const { cartItems, currentCurrency, total, inCartQuantity } = this.props
    // when cart overlay is empty
    if (cartItems.length < 1) {
      return (
        <div className='overlay-container'>
          <article className='overlay-wrapper'>
            <div className='empty-cart'>
              <h3>Your Bag is empty</h3>
            </div>
          </article>
        </div>
      )
    }
    // when cart overlay has some content
    return (
      <div className='overlay-container'>
        <article className='overlay-wrapper'>
          <div className='overlay'>
            <h4 className='overlay-qty-box'>
              My bag.{' '}
              <span className='overlay-qty'>{inCartQuantity} items</span>
            </h4>

            <div className='overlay-items-wrapper'>
              {cartItems.map((item) => {
                const currencyType = item.prices.find(
                  (item) => item.currency.label === currentCurrency.label
                )
                if (item.productVariant) {
                  // cart overlay items without variant
                  return (
                    <section key={item.id}>
                      <OverlayItems item={item} currencyType={currencyType} />
                      <div>
                        {item.productVariant.map((item) => {
                          return (
                            <OverlayItems
                              key={JSON.stringify(item.selectedGallery)}
                              item={item}
                              currencyType={currencyType}
                            />
                          )
                        })}
                      </div>
                    </section>
                  )
                }
                // cart overlay items without variant
                return (
                  <OverlayItems
                    key={item.id}
                    item={item}
                    currencyType={currencyType}
                  />
                )
              })}
            </div>
            <article className='overlay-total'>
              <h4>total</h4>
              <h4 className='overlay-total-amout'>
                <span>{currentCurrency.symbol}</span>
                {parseFloat(total.toFixed(2))}
              </h4>
            </article>
            <article className='overlay-checkout-btns'>
              <Link to='cart'>
                <button>view bag</button>
              </Link>

              <button id='overlay-checkout'>Checkout</button>
            </article>
          </div>
        </article>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { cartItems, currentCurrency, total, inCartQuantity } = state
  return { cartItems, currentCurrency, total, inCartQuantity }
}

export default connect(mapStateToProps)(CartOverlay)
