import React, { Component } from 'react'
import { connect } from 'react-redux'
import { DECREASE_QUANTITY, INCREASE_QUANTITY } from '../../Redux/action'
import {
  ChevronLeft,
  ChevronRight,
  SolidMinus,
  SolidPlus,
} from '../../Svg-icons/icons'

class CartItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0,
    }
  }

  forwardImage = () => {
    this.setState({ count: this.state.count + 1 })
    if (this.state.count === this.props.item.gallery.length - 1) {
      this.setState({ count: 0 })
    }
  }
  backwardImage = () => {
    this.setState({ count: this.state.count - 1 })
    if (this.state.count <= 0) {
      this.setState({ count: this.props.item.gallery.length - 1 })
    }
  }

  increaseQuantity = () => {
    const { item, dispatch } = this.props
    const productAttr =
      item.attributes.length >= 1 &&
      item.attributes
        .map((attribute) => attribute)
        .map((item) => item.selectedAtt)
    dispatch({ type: INCREASE_QUANTITY, payload: { id: item.id, productAttr } })
  }
  decreaseQuantity = () => {
    const { item, dispatch } = this.props
    const productAttr =
      item.attributes.length >= 1 &&
      item.attributes
        .map((attribute) => attribute)
        .map((item) => item.selectedAtt)
    dispatch({ type: DECREASE_QUANTITY, payload: { id: item.id, productAttr } })
  }

  render() {
    const { item, currencyType, dispatch } = this.props

    return (
      <article className='cart-items'>
        <div className='cart-items-box'>
          <h4 className='cart-brand-name'>{item.brand}</h4>
          <h4 className='cart-prd-name'>{item.name}</h4>
          <p className='cart-item-price'>
            {currencyType.currency.symbol} <span>{currencyType.amount}</span>
          </p>
          <div className='cart-item-attributes'>
            {item.attributes.length > 0 &&
              item.attributes.map((attribute) => {
                // swatch attribute
                if (attribute.type === 'swatch') {
                  return (
                    <div key={attribute.id}>
                      <p className='cart-item-size'>{attribute.name}</p>
                      {attribute.items.map((singleItem) => {
                        let activeColor = 'overlay-attr-color'
                        if (singleItem.value === attribute.selectedAtt) {
                          activeColor = 'cart-attr-color activeColor'
                        }
                        return (
                          <button
                            key={singleItem.id}
                            className={activeColor}
                            style={{
                              background: `${singleItem.value}`,
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
                    <p className='cart-item-size'>{attribute.name}</p>
                    {attribute.items.map((singleItem) => {
                      // backgroudColor logic for selected attribute
                      let attrStyle = 'cart-attr-btn'
                      if (singleItem.value === attribute.selectedAtt) {
                        attrStyle = 'cart-attr-btn active-attribute'
                      }
                      return (
                        <button className={attrStyle} key={singleItem.id}>
                          {singleItem.value}
                        </button>
                      )
                    })}
                  </div>
                )
              })}
          </div>
        </div>
        <div className='cart-btns-wrapper'>
          <button onClick={this.increaseQuantity}>
            <SolidPlus />
          </button>
          <h4>{item.quantity}</h4>
          <button onClick={this.decreaseQuantity}>
            <SolidMinus />
          </button>
        </div>
        <div className='cart-img-container'>
          {item.gallery.map((single, index) => {
            let imageSlide = 'next-slide'
            if (index === this.state.count) {
              imageSlide = 'active-slide'
            }
            if (index === this.state.count - 1) {
              imageSlide = 'prev-slide'
            }
            return (
              <div className={imageSlide} key={index}>
                <img src={single} alt={item.name} />
              </div>
            )
          })}
          {item.gallery.length > 1 && (
            <article className='cart-btn-wrapper'>
              <button onClick={this.backwardImage}>{<ChevronLeft />}</button>
              <button onClick={this.forwardImage}>{<ChevronRight />}</button>
            </article>
          )}
        </div>
      </article>
    )
  }
}
const mapDispatchToProps = (dispatch) => {
  return { dispatch: dispatch }
}

export default connect(null, mapDispatchToProps)(CartItem)
