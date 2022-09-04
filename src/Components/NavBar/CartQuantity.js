import React, { Component } from 'react'
import { connect } from 'react-redux'

class CartQuantity extends Component {
  render() {
    return <div className='incart-wrapper'>{this.props.inCartQuantity}</div>
  }
}
const mapStateToProps = (state) => {
  return { inCartQuantity: state.inCartQuantity }
}
export default connect(mapStateToProps)(CartQuantity)
