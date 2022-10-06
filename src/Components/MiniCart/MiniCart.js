import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CALCULATE_CART } from '../../Redux/action'
import { Link } from 'react-router-dom'
import MiniItems from './MiniItems'
import { StyledEmptyCart, StyledMiniCart } from '../../Styles/MiniCart.styled'

class MiniCart extends Component {
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
        <StyledEmptyCart>
          <article className='mini-wrapper'>
            <div className='empty-cart'>
              <h3>Your Bag is empty</h3>
            </div>
          </article>
        </StyledEmptyCart>
      )
    }
    // when cart overlay has some content
    return (
      <StyledMiniCart>
        <article className='mini-wrapper'>
          <div className='mini'>
            <h4 className='mini-qty-box'>
              My bag. <span className='mini-qty'>{inCartQuantity} items</span>
            </h4>

            <div className='mini-items-wrapper'>
              {cartItems.map((item) => {
                const currencyType = item.prices.find(
                  (item) => item.currency.label === currentCurrency.label
                )
                if (item.productVariant) {
                  // Attention!!! cart overlay items without variant
                  return (
                    <section key={item.id}>
                      <MiniItems item={item} currencyType={currencyType} />
                      <div>
                        {item.productVariant.map((item) => {
                          return (
                            <MiniItems
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
                //Attention!!! cart overlay items without variant
                return (
                  <MiniItems
                    key={item.id}
                    item={item}
                    currencyType={currencyType}
                  />
                )
              })}
            </div>
            <article className='mini-total'>
              <h4>total</h4>
              <h4 className='mini-total-amount'>
                <span>{currentCurrency.symbol}</span>
                {parseFloat(total.toFixed(2))}
              </h4>
            </article>
            <article className='mini-checkout-btns'>
              <Link to='cart'>
                <button>view bag</button>
              </Link>

              <button id='mini-checkout'>Checkout</button>
            </article>
          </div>
        </article>
      </StyledMiniCart>
    )
  }
}

const mapStateToProps = (state) => {
  const { cartItems, currentCurrency, total, inCartQuantity } = state
  return { cartItems, currentCurrency, total, inCartQuantity }
}

export default connect(mapStateToProps)(MiniCart)
