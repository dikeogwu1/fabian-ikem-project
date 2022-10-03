import React, { Component } from 'react'
import { request } from 'graphql-request'
import { endpoint } from '../../Graphql/request'
import QUERYS from '../../Graphql/queries'
import { useParams } from 'react-router-dom'
import Details from './Details'
import './product.css'

class Product extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentImage: 0,
      product: [],
    }
  }

  variable = {
    id: this.props.params.id,
  }

  // **** request product
  getProductDetails = async () => {
    try {
      const response = await request(endpoint, QUERYS.PRODUCT, this.variable)
      const data = await response
      this.setState({ ...this.state, product: [data.product] })
    } catch (error) {
      console.log(error)
    }
  }

  componentDidMount() {
    this.getProductDetails()
  }

  render() {
    if (this.state.product.length < 1) {
      return (
        <main className='product-loading'>
          <h2>Loading...</h2>
        </main>
      )
    }
    return (
      <main>
        {this.state.product.map((item) => {
          return (
            <section key={item.id} className='product-container'>
              <div className='product-gallery-wrapper'>
                {item.gallery.map((singleImage, index) => {
                  if (index === this.state.currentImage) {
                    return (
                      <div className='major-image-box' key={index}>
                        <div className='major-image'>
                          <img src={singleImage} alt={item.name} />
                        </div>
                      </div>
                    )
                  }

                  return (
                    <div className='other-imge-box' key={index}>
                      <div
                        className='other-image'
                        onClick={() =>
                          this.setState({ ...this.state, currentImage: index })
                        }
                      >
                        <img src={singleImage} alt={item.name} />
                      </div>
                    </div>
                  )
                })}
              </div>

              <Details item={item} />
            </section>
          )
        })}
      </main>
    )
  }
}

export default (props) => <Product {...props} params={useParams()} />
