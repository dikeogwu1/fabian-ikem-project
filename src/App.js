import React, { Component } from 'react'
import Nav from './Components/NavBar/Nav'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// components
import All from './Components/Categories/All'
import Clothes from './Components/Categories/Clothes'
import Tech from './Components/Categories/Tech'
import QUERYS from './Graphql/queries'
import queryServer from './Graphql/request'
import { ADD_ALL_CATEGORIES, ADD_CURRENCIES } from './Redux/action'
import store from './Redux/store'

class App extends Component {
  componentDidMount() {
    queryServer(QUERYS.CURRENCIES, ADD_CURRENCIES)
    queryServer(QUERYS.CATEGORIES, ADD_ALL_CATEGORIES)
    localStorage.setItem('storage', JSON.stringify(store.getState()))
  }
  componentDidUpdate() {
    localStorage.setItem('storage', JSON.stringify(store.getState()))
  }
  render() {
    return (
      <Router>
        <Nav />
        <Routes>
          <Route path='/' element={<All />} />
          <Route path='clothes' element={<Clothes />} />
          <Route path='tech' element={<Tech />} />
        </Routes>
      </Router>
    )
  }
}

export default App
