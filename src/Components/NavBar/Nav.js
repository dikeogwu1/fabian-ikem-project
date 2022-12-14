import React, { Component } from 'react'
import { connect } from 'react-redux'
import { request } from 'graphql-request'
import { NavLink } from 'react-router-dom'
import { ChevronDown, ChevronUP, FaCart, FaBars } from '../../Svg-icons/icons'
import { StyledNav } from '../../Styles/Nav.styled'

// components
import CartQuantityBage from './CartQuantityBage'
import CurrencySwitch from './CurrencySwitch'
import MiniCart from '../MiniCart/MiniCart'

// actions
import {
  CALCULATE_CART,
  CLOSE_MINI_CART,
  CLOSE_SWITCHER,
  TOGGLE_MINI_CART,
  TOGGLE_CURRENCY_SWITCHER,
} from '../../Redux/action'

// use for query
import QUERYS from '../../Graphql/queries'
import { endpoint } from '../../Graphql/request'

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
      const response = await request(endpoint, query)
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
    this.props.dispatch({ type: CLOSE_MINI_CART })
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
        <StyledNav
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
                        to={category.name === 'all' ? '/' : `/${category.name}`}
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
                onClick={() => dispatch({ type: TOGGLE_MINI_CART })}
              >
                <div>
                  <FaCart />
                </div>
                <CartQuantityBage />
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
          {isOverlayOpen && <MiniCart />}
        </StyledNav>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  const { isSwitcherOpen, currentCurrency, isOverlayOpen } = state
  return { currentCurrency, isSwitcherOpen, isOverlayOpen }
}
export default connect(mapStateToProps)(Nav)
