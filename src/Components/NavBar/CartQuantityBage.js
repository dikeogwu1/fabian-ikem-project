import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyledQuantityBage } from '../../Styles/CartQuantityBage.styled'

class CartQuantityBage extends Component {
  render() {
    return <StyledQuantityBage>{this.props.inCartQuantity}</StyledQuantityBage>
  }
}
const mapStateToProps = (state) => {
  return { inCartQuantity: state.inCartQuantity }
}
export default connect(mapStateToProps)(CartQuantityBage)
