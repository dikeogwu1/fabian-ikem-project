import React, { Component } from 'react'
import './cartOverlay.css'

export default class CartOverlay extends Component {
  render() {
    return (
      <div className='overlay-container'>
        <article className='overlay-wrapper'>
          <div className='overlay'>
            <h4>
              My bag. <span className='overlay-qty'>3 items</span>
            </h4>
          </div>
        </article>
      </div>
    )
  }
}
