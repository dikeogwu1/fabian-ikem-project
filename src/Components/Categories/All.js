import React, { Component } from 'react'
import { connect } from 'react-redux'
import { request } from 'graphql-request'
import QUERYS from '../../Graphql/queries'
import './categories.css'
import Category from './Category'
import { CLOSE_SWITCHER } from '../../Redux/action'
class All extends Component {
  constructor(props) {
    super(props)
    this.state = {
      category: [],
    }
  }

  // **** request for all category
  getCategory = async (query) => {
    try {
      const response = await request('http://localhost:4000/', query)
      const data = await response
      this.setState({ category: data.category })
    } catch (error) {
      console.log(error)
    }
  }

  componentDidMount() {
    this.getCategory(QUERYS.ALL_CATEGORY)
  }

  render() {
    const { currentCurrency, dispatch } = this.props
    if (this.state.category.length <= 0) {
      return (
        <main className='categories-wrapper'>
          <h2>fetching data...</h2>
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
                  gallery={0}
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
  return { currentCurrency: state.currentCurrency }
}

export default connect(mapStateToProps)(All)
