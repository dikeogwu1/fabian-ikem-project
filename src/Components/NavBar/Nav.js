import React, { Component } from 'react'
import { request } from 'graphql-request'
import QUERY from '../../Graphql/queries'
import { NavLink } from 'react-router-dom'
import icons from '../../Svg-icons/icons'
import './nav.css'
import InCart from './InCart'

class Nav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categoryNames: [],
      isLinksOpen: false,
      isSwitcherOpen: false,
    }

    this.getCategoryNames = async (query) => {
      try {
        const response = await request('http://localhost:4000/', query)
        const data = await response
        this.setState({ ...this.state, categoryNames: data.categories })
      } catch (error) {
        console.log(error)
      }
    }
  }
  // toggle nav for mobile screen
  toggleNavBar = () => {
    if (this.state.isLinksOpen) {
      this.setState({ ...this.state, isLinksOpen: false })
    } else {
      this.setState({ ...this.state, isLinksOpen: true })
    }
  }
  // toggle currency switcher
  toggleSitcher = () => {
    if (this.state.isSwitcherOpen) {
      this.setState({ ...this.state, isSwitcherOpen: false })
    } else {
      this.setState({ ...this.state, isSwitcherOpen: true })
    }
  }

  componentDidMount() {
    this.getCategoryNames(QUERY.CATEGORIES_NAMES)
  }

  render() {
    if (this.state.categoryNames.length <= 0) {
      return <h4>Unable to fetch data</h4>
    }
    return (
      <>
        <header
          className={
            this.state.isLinksOpen
              ? 'nav-contianer show-links'
              : 'nav-contianer'
          }
        >
          <nav>
            <div className='nav-box'>
              <ul className='links-wrapper'>
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
            {/*currency switcher */}
            <section>
              <div
                className='currency-switch-wrapper'
                onClick={this.toggleSitcher}
              >
                <h4>$</h4>
                {this.state.isSwitcherOpen
                  ? icons.chevronUp
                  : icons.chevronDown}
              </div>
              {/*end of currency switcher */}
              <div className='cart-wrapper'>
                <div>{icons.cart}</div>
                <InCart />
              </div>
              <div className='bars-wrapper' onClick={this.toggleNavBar}>
                {icons.solidBars}
              </div>
            </section>
          </nav>
        </header>
        <div className='empty-space'></div>
      </>
    )
  }
}

export default Nav
