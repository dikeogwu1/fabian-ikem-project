import React, { Component } from 'react'
import { connect } from 'react-redux'
import { request } from 'graphql-request'
import QUERYS from '../../Graphql/queries'
import Category from './Category'
import { CLOSE_SWITCHER } from '../../Redux/action'
import { endpoint } from '../../Graphql/request'
import { StyledCategories } from '../../Styles/Categories.styled'
import { Loading } from '../../Styles/Loading.styled'

class All extends Component {
  constructor(props) {
    super(props)
    this.state = {
      category: [],
    }
  }

  variables = {
    name: { title: 'all' },
  }

  // **** request all category
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
        <Loading className='category-loading'>
          <h2>Loading...</h2>
        </Loading>
      )
    }

    return (
      <StyledCategories onClick={() => dispatch({ type: CLOSE_SWITCHER })}>
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
      </StyledCategories>
    )
  }
}
const mapStateToProps = (state) => {
  return { currentCurrency: state.currentCurrency }
}

export default connect(mapStateToProps)(All)
