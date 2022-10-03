import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ADD_TO_CART, CALCULATE_CART } from '../../Redux/action'
import './details.css'

class Details extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentAttr: [],
      selected: [],
    }
    this.descriptionRef = React.createRef()
  }

  componentDidMount() {
    const { item } = this.props

    const productAttr =
      item.attributes.length > 0
        ? item.attributes.map((singleAtt) => {
            return {
              ...singleAtt,
              selectedAtt: singleAtt.items[0].value,
            }
          })
        : []

    const selectedAttr =
      item.attributes.length > 0
        ? item.attributes.map((singleAtt) => singleAtt.items[0].value)
        : ['']

    this.setState({
      ...this.state,
      currentAttr: productAttr,
      selected: selectedAttr,
    })

    this.descriptionRef.current.innerHTML = item.description
  }

  handleAddToCart = () => {
    const { item, dispatch } = this.props
    dispatch({
      type: ADD_TO_CART,
      CALCULATE_CART,
      payload: {
        id: item.id,
        attr: {
          productAttr: this.state.currentAttr,
          gallery: this.state.selected,
        },
      },
    })
    dispatch({ type: CALCULATE_CART })
  }

  render() {
    const { item, currentCurrency, dispatch } = this.props
    const currencyType = item.prices.find(
      (item) => item.currency.label === currentCurrency.label
    )

    return (
      <div className='product-detail-wrapper'>
        <h4 className='product-brand'>{item.brand}</h4>
        <h4 className='product-name'>{item.name}</h4>
        <div className='product-item-attributes'>
          {item.attributes.length > 0 &&
            this.state.currentAttr.map((attribute) => {
              // swatch attribute
              if (attribute.type === 'swatch') {
                return (
                  <div key={attribute.id}>
                    <p className='product-attr-name'>{attribute.name}</p>
                    {attribute.items.map((singleItem) => {
                      let activeColor = 'product-attr-color'
                      if (
                        singleItem.id === attribute.selectedAtt ||
                        singleItem.value === attribute.selectedAtt
                      ) {
                        activeColor = 'product-attr-color activeColor'
                      }
                      return (
                        <button
                          key={singleItem.id}
                          className={activeColor}
                          style={{
                            background: `${singleItem.value}`,
                          }}
                          onClick={() => {
                            const chosenAttr = this.state.currentAttr.map(
                              (attr) => {
                                if (attr.id === attribute.id) {
                                  return {
                                    ...attr,
                                    selectedAtt: singleItem.value,
                                  }
                                }
                                return attr
                              }
                            )
                            const newAttr = this.state.currentAttr.map(
                              (attr) => {
                                if (attr.id === attribute.id) {
                                  return singleItem.value
                                }
                                return attr.selectedAtt
                              }
                            )
                            this.setState({
                              ...this.state,
                              currentAttr: chosenAttr,
                              selected: newAttr,
                            })
                          }}
                        ></button>
                      )
                    })}
                  </div>
                )
              }

              {
                /* none switch attribute */
              }

              return (
                <div key={attribute.id}>
                  <p className='product-attr-name'>{attribute.name}</p>
                  {attribute.items.map((singleItem) => {
                    // backgroudColor logic for selected attribute
                    let attrStyle = 'product-attr-btn'
                    if (
                      singleItem.id === attribute.selectedAtt ||
                      singleItem.value === attribute.selectedAtt
                    ) {
                      attrStyle = 'product-attr-btn active-attribute'
                    }
                    return (
                      <button
                        className={attrStyle}
                        key={singleItem.id}
                        onClick={() => {
                          const chosenAttr = this.state.currentAttr.map(
                            (attr) => {
                              if (attr.id === attribute.id) {
                                return {
                                  ...attr,
                                  selectedAtt: singleItem.value,
                                }
                              }
                              return attr
                            }
                          )
                          const newAttr = this.state.currentAttr.map((attr) => {
                            if (attr.id === attribute.id) {
                              return singleItem.value
                            }
                            return attr.selectedAtt
                          })
                          this.setState({
                            ...this.state,
                            currentAttr: chosenAttr,
                            selected: newAttr,
                          })
                        }}
                      >
                        {singleItem.value}
                      </button>
                    )
                  })}
                </div>
              )
            })}
        </div>

        <h4 className='product-price'>price:</h4>
        <p className='product-unit-price'>
          {currencyType.currency.symbol} <span>{currencyType.amount}</span>
        </p>
        {item.inStock ? (
          <button className='product-order' onClick={this.handleAddToCart}>
            add to cart
          </button>
        ) : (
          <button className='unavailable-product'>out of stock</button>
        )}
        <article ref={this.descriptionRef}></article>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { currentCurrency } = state
  return { currentCurrency }
}

export default connect(mapStateToProps)(Details)
