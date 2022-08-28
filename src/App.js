import React, { Component } from 'react'
import Nav from './Components/NavBar/Nav'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// components
import All from './Components/Categories/All'
import Clothes from './Components/Categories/Clothes'
import Tech from './Components/Categories/Tech'
import QUERYS from './Graphql/queries'
import queryServer from './Graphql/request'
import { ADD_ALL_CATEGORIES } from './Redux/action'

class App extends Component {
  componentDidMount() {
    queryServer(QUERYS.ALL_CATEGORIES, ADD_ALL_CATEGORIES)
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
