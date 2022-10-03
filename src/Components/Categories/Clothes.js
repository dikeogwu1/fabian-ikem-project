import React, { Component } from 'react'
import { connect } from 'react-redux'
import { request } from 'graphql-request'
import QUERYS from '../../Graphql/queries'
import './categories.css'
import Category from './Category'
import { CLOSE_SWITCHER } from '../../Redux/action'
import { endpoint } from '../../Graphql/request'

class Clothes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      category: [],
    }
  }

  variables = {
    name: { title: 'clothes' },
  }

  // **** request clothes category
  getCategory = async () => {
    try {
      const response = await request(endpoint, QUERYS.CATEGORY, this.variables)
      const data = await response
      this.setState({ category: data.category })
    } catch (error) {
      console.log(error)
    }
  }

  componentDidMount() {
    this.getCategory()
  }

  render() {
    const { currentCurrency, dispatch } = this.props

    if (this.state.category.length < 1) {
      return (
        <main className='category-loading'>
          <h2>Loading...</h2>
        </main>
      )
    }

    return (
      <main onClick={() => dispatch({ type: CLOSE_SWITCHER })}>
        <section className='category-wrapper'>
          <h2>{this.state.category.name}</h2>
          <div className='category-product-box'>
            {this.state.category.products.map((product) => {
              const currencyType = product.prices.find(
                (item) => item.currency.label === currentCurrency.label
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
          </div>
        </section>
      </main>
    )
  }
}
const mapStateToProps = (state) => {
  const { currentCurrency } = state
  return { currentCurrency }
}

export default connect(mapStateToProps)(Clothes)
