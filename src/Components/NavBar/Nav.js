import React, { Component } from 'react'
import { connect } from 'react-redux'
import { request } from 'graphql-request'
import { NavLink } from 'react-router-dom'
import { ChevronDown, ChevronUP, FaCart, FaBars } from '../../Svg-icons/icons'
import './nav.css'
// components
import CartQuantity from './CartQuantity'
import CurrencySwitch from './CurrencySwitch'
import CartOverlay from '../CartOverlay/CartOverlay'
// actions
import {
  CALCULATE_CART,
  CLOSE_CART_OVERLAY,
  CLOSE_SWITCHER,
  TOGGLE_CART_OVERLAY,
  TOGGLE_CURRENCY_SWITCHER,
} from '../../Redux/action'
// use for query
import QUERYS from '../../Graphql/queries'

class Nav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categoryNames: [],
      isLinksOpen: false,
      isSwitcherOpen: false,
    }
  }
  // **** request for category names
  getCategoryNames = async (query) => {
    try {
      const response = await request('http://localhost:4000/', query)
      const data = await response
      this.setState({ ...this.state, categoryNames: data.categories })
    } catch (error) {
      console.log(error)
    }
  }
  // toggle links for mobile view
  toggleNavBar = () => {
    if (this.state.isLinksOpen) {
      this.setState({ ...this.state, isLinksOpen: false })
    } else {
      this.setState({ ...this.state, isLinksOpen: true })
    }
  }

  componentDidMount() {
    this.getCategoryNames(QUERYS.CATEGORIES_NAMES)
    this.props.dispatch({ type: CLOSE_SWITCHER })
    this.props.dispatch({ type: CLOSE_CART_OVERLAY })
    this.props.dispatch({ type: CALCULATE_CART })
  }

  render() {
    const { currentCurrency, isSwitcherOpen, isOverlayOpen, dispatch } =
      this.props
    if (this.state.categoryNames.length <= 0) {
      return <h2>Loading...</h2>
    }

    return (
      <>
        <header
          className='nav-contianer'
          onClick={(e) => {
            if (!e.target.classList.contains('switch')) {
              dispatch({ type: CLOSE_SWITCHER })
            }
          }}
        >
          <nav>
            <div className='nav-box'>
              <ul
                className={
                  this.state.isLinksOpen
                    ? 'links-wrapper show-links'
                    : 'links-wrapper'
                }
              >
                {this.state.categoryNames.map((category, index) => {
                  return (
                    <li key={index}>
                      <NavLink
                        className='nav-link'
                        to={category.name === 'all' ? '/' : category.name}
                      >
                        {category.name}
                      </NavLink>
                    </li>
                  )
                })}
              </ul>
              <NavLink className='logo-wrapper' to={'/'}>
                <img src='./SVG/logo.svg' alt='logo' />
              </NavLink>
            </div>

            {/*Currency switcher */}
            <section>
              <div
                className='currency-switch-wrapper switch'
                onClick={() => dispatch({ type: TOGGLE_CURRENCY_SWITCHER })}
              >
                <h4 className='switch'>{currentCurrency.symbol}</h4>
                {isSwitcherOpen ? <ChevronUP /> : <ChevronDown />}
              </div>
              {/*End of currency switcher */}

              {/*InCart component */}
              <div
                className='cart-wrapper'
                onClick={() => dispatch({ type: TOGGLE_CART_OVERLAY })}
              >
                <div>
                  <FaCart />
                </div>
                <CartQuantity />
              </div>
              {/*End of InCart component */}

              {/*Menu icon for mobile view */}
              <div className='bars-wrapper' onClick={this.toggleNavBar}>
                <FaBars />
              </div>
            </section>
          </nav>
          {/*CurrencySwitcher component */}
          {isSwitcherOpen && <CurrencySwitch />}

          {/* CartOverlay component */}
          {isOverlayOpen && <CartOverlay />}
        </header>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  const { isSwitcherOpen, currentCurrency, isOverlayOpen } = state
  return { currentCurrency, isSwitcherOpen, isOverlayOpen }
}
export default connect(mapStateToProps)(Nav)
