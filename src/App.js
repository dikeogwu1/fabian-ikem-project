import React, { Component } from 'react'
import Nav from './Components/NavBar/Nav'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import All from './Components/Categories/All'
import Clothes from './Components/Categories/Clothes'
import Tech from './Components/Categories/Tech'

class App extends Component {
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
