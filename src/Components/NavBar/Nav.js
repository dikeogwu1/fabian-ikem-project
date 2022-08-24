import React, { Component } from 'react'
import { request } from 'graphql-request'
import QUERY from '../../Graphql/queries'
import { NavLink } from 'react-router-dom'
import icons from '../../Svg-icons/icons'
import './nav.css'

class Nav extends Component {
  constructor(props) {
    super(props)

    this.state = { allCategoreis: [], isLinksOpen: false }
    this.getCategoryNames = async (query) => {
      try {
        const response = await request('http://localhost:4000/', query)
        const data = await response
        if (data.categories) {
          this.setState({ ...this.state, allCategoreis: data.categories })
        }
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

  componentDidMount() {
    this.getCategoryNames(QUERY.CATEGORIES_NAMES)
  }

  render() {
    if (this.state.allCategoreis.length === 0) {
      return <h4>server error encountered</h4>
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
                {this.state.allCategoreis.map((category, index) => {
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
              <div className='logo-wrapper'>
                <img src='./SVG/logo.svg' alt='logo' />
              </div>
            </div>
            <section>
              <div className='currency-switch-wrapper'>
                <h4>$</h4>
                {icons.chevronDown}
              </div>
              <div className='cart-wrapper'>
                <div>{icons.cart}</div>
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
