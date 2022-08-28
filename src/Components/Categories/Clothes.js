import React, { Component } from 'react'
import { connect } from 'react-redux'
import './categories.css'
import Category from './Category'

class Clothes extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    if (this.props.categories.length <= 0) {
      return (
        <main className='categories-wrapper'>
          <h2>fetching data...</h2>
        </main>
      )
    }

    return (
      <main className='category-wrapper'>
        <h2>{this.props.categories[1].name}</h2>
        <section className='category-product-box'>
          {this.props.categories[1].products.map((product) => {
            const currencyType = product.prices.find(
              (item) => item.currency.label === 'USD'
            )
            return (
              <Category
                product={product}
                currencyType={currencyType}
                gallery={2}
                key={product.id}
              />
            )
          })}
        </section>
      </main>
    )
  }
}
const mapStateToProps = (state) => {
  return { categories: state.categories }
}

export default connect(mapStateToProps)(Clothes)
