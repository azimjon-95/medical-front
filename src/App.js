import React from 'react'
import './App.css'
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom'
import Img from "./img/Img.jpg"

const App = () => {

  return (
    <div className='App'>
      <div id='navbar'></div>
      <img src={Img} alt="" />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App;