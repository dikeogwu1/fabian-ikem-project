import React, { Component } from 'react'
import { SolidMinus, SolidPlus } from '../../Svg-icons/icons'

export default class OverlayItems extends Component {
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
                // swatch attribute
                if (attribute.type === 'swatch') {
                  return (
                    <div key={attribute.id}>
                      <p className='overlay-item-size'>{attribute.name}</p>
                      {attribute.items.map((singleItem, index) => {
                        let activeColor = 'overlay-attr-color'
                        if (index === 0) {
                          activeColor = 'overlay-attr-color activeColor'
                        }
                        return (
                          <button
                            className={activeColor}
                            style={{
                              background: `${singleItem.value}`,
                            }}
                            key={singleItem.id}
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
                    <p className='overlay-item-size'>{attribute.name}</p>
                    {attribute.items.map((singleItem, index) => {
                      // backgroudColor logic for selected attribute
                      let attrStyle = 'overlay-attr-btn'
                      if (singleItem.value === item.selectedAtt.productAttr) {
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
        <div className='overlay-btns-wrapper'>
          <button>
            <SolidPlus />
          </button>
          <h4>{item.quantity}</h4>
          <button>
            <SolidMinus />
          </button>
        </div>
        <div className='overlay-img-wrapper'>
          <img src={item.gallery[item.selectedAtt.gallery]} alt={item.name} />
        </div>
      </article>
    )
  }
}
