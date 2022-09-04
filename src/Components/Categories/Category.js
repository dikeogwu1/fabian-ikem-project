import React, { Component } from 'react'
import icons from '../../Svg-icons/icons'

export default class Category extends Component {
  render() {
    const { product, currencyType, gallery } = this.props
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
          <button className='to-cart-icon'>{icons.cartSecond}</button>
        )}
      </article>
    )
  }
}
