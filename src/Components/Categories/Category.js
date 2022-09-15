import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ADD_TO_CART, ADD_VARIANT, CALCULATE_CART } from '../../Redux/action'
import { ToCart } from '../../Svg-icons/icons'

class Category extends Component {
  constructor(props) {
    super(props)
  }

  handleAddToCart = () => {
    const { product, gallery, cartItems, dispatch } = this.props

    const productAttr =
      product.attributes.length > 0
        ? product.attributes[0].items[gallery].value
        : ''

    const sorted = cartItems.find((item) => item.id === product.id)
    // const sortedVariant = cartItems.productVariant.find(
    //   (item) => item.id === product.id
    // )
    if (!sorted) {
      dispatch({
        type: ADD_TO_CART,
        CALCULATE_CART,
        payload: { id: product.id, attr: { productAttr, gallery } },
      })
    }
    if (sorted && sorted.selectedAtt.productAttr !== productAttr) {
      dispatch({
        type: ADD_VARIANT,
        payload: { id: product.id, attr: { productAttr, gallery } },
      })
      dispatch({ type: CALCULATE_CART })
    }
  }

  render() {
    const { product, currencyType, gallery, cartItems, dispatch } = this.props

    return (
      <article className='category-product'>
        <div>
          <img src={product.gallery[gallery]} alt={product.name} />
          <p className='in-stock'>{`${
            product.inStock ? '' : 'out of stock'
          }`}</p>
        </div>
        <h4>
          {product.brand} <span>{product.name}</span>
        </h4>
        <p>
          {currencyType.currency.symbol} <span>{currencyType.amount}</span>
        </p>
        {product.inStock && (
          <button className='add-product' onClick={this.handleAddToCart}>
            <ToCart />
          </button>
        )}
      </article>
    )
  }
}

const mapStateToProps = (state) => {
  return { cartItems: state.cartItems }
}

export default connect(mapStateToProps)(Category)
