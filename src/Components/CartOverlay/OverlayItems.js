import React, { Component } from 'react'
import { connect } from 'react-redux'
import { DECREASE_QUANTITY, INCREASE_QUANTITY } from '../../Redux/action'
import { SolidMinus, SolidPlus } from '../../Svg-icons/icons'

class OverlayItems extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0,
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
    const { item, currencyType } = this.props
    return (
      <article className='overlay-items'>
        <div className='overlay-items-box'>
          <h4>{item.brand}</h4>
          <h4>{item.name}</h4>
          <p className='overlay-item-price'>
            {currencyType.currency.symbol} <span>{currencyType.amount}</span>
          </p>
          <div className='overlay-item-attributes'>
            {item.attributes.length > 0 &&
              item.attributes.map((attribute) => {
                // CLOSE ATTENTION!!!! ==== swatch attribute
                if (attribute.type === 'swatch') {
                  return (
                    <div key={attribute.id}>
                      <p className='overlay-item-size'>{attribute.name}</p>
                      {attribute.items.map((singleItem) => {
                        let activeColor = 'overlay-attr-color'
                        if (singleItem.value === attribute.selectedAtt) {
                          activeColor = 'overlay-attr-color activeColor'
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
                // End of switch attributes

                // ATTENTION!!! ==== none switch attributes
                return (
                  <div key={attribute.id}>
                    <p className='overlay-item-size'>{attribute.name}</p>
                    {attribute.items.map((singleItem) => {
                      // backgroudColor logic for selected attribute
                      let attrStyle = 'overlay-attr-btn'
                      if (singleItem.value === attribute.selectedAtt) {
                        attrStyle = 'overlay-attr-btn active-attribute'
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
        {/* Overlay quantity increment & decrement buttons */}
        <div className='overlay-btns-wrapper'>
          <button onClick={this.increaseQuantity}>
            <SolidPlus />
          </button>
          <h4>{item.quantity}</h4>
          <button onClick={this.decreaseQuantity}>
            <SolidMinus />
          </button>
        </div>
        <div className='overlay-img-wrapper'>
          <img src={item.gallery[item.selectedGallery]} alt={item.name} />
        </div>
      </article>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return { dispatch: dispatch }
}

export default connect(null, mapDispatchToProps)(OverlayItems)
