import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
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
        ? product.attributes.map((singleAtt) => {
            return {
              ...singleAtt,
              selectedAtt: singleAtt.items[gallery].value,
            }
          })
        : []

    dispatch({
      type: ADD_TO_CART,
      CALCULATE_CART,
      payload: { id: product.id, attr: { productAttr, gallery } },
    })
    dispatch({ type: CALCULATE_CART })
  }

  render() {
    const { product, currencyType, gallery, cartItems, dispatch } = this.props
    return (
      <Link to={`../product/${product.id}`} className='category-product'>
        <div>
          <img src={product.gallery[gallery]} alt={product.name} />
          <p className='in-stock'>{`${
            product.inStock ? '' : 'out of stock'
          }`}</p>
        </div>
        <h4 className='category-brand'>
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
      </Link>
    )
  }
}

const mapStateToProps = (state) => {
  return { cartItems: state.cartItems }
}

export default connect(mapStateToProps)(Category)
