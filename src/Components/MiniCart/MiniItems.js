import React, { Component } from 'react'
import { connect } from 'react-redux'
import { DECREASE_QUANTITY, INCREASE_QUANTITY } from '../../Redux/action'
import { SolidMinus, SolidPlus } from '../../Svg-icons/icons'
import { StyledMiniItems } from '../../Styles/MiniItems.styled'

class MiniItems extends Component {
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
      <StyledMiniItems>
        <div className='mini-items-box'>
          <h4>{item.brand}</h4>
          <h4>{item.name}</h4>
          <p className='mini-item-price'>
            {currencyType.currency.symbol} <span>{currencyType.amount}</span>
          </p>
          <div className='mini-item-attributes'>
            {item.attributes.length > 0 &&
              item.attributes.map((attribute) => {
                // CLOSE ATTENTION!!!! ==== swatch attribute
                if (attribute.type === 'swatch') {
                  return (
                    <div key={attribute.id}>
                      <p className='mini-item-size'>{attribute.name}</p>
                      {attribute.items.map((singleItem) => {
                        let activeColor = 'mini-attr-color'
                        if (singleItem.value === attribute.selectedAtt) {
                          activeColor = 'mini-attr-color activeColor'
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
                    <p className='mini-item-size'>{attribute.name}</p>
                    {attribute.items.map((singleItem) => {
                      // backgroudColor logic for selected attribute
                      let attrStyle = 'mini-attr-btn'
                      if (singleItem.value === attribute.selectedAtt) {
                        attrStyle = 'mini-attr-btn active-attribute'
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
        {/* MiniCart quantity increment & decrement buttons */}
        <div className='mini-btns-wrapper'>
          <button onClick={this.increaseQuantity}>
            <SolidPlus />
          </button>
          <h4>{item.quantity}</h4>
          <button onClick={this.decreaseQuantity}>
            <SolidMinus />
          </button>
        </div>
        <div className='mini-img-wrapper'>
          <img src={item.gallery[0]} alt={item.name} />
        </div>
      </StyledMiniItems>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return { dispatch: dispatch }
}

export default connect(null, mapDispatchToProps)(MiniItems)
