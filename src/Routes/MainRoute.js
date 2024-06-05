import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import Shop from '../Pages/Shop'
import Cart from '../Pages/Cart'
import Contact from '../Pages/Contact'
import Product from '../Pages/Product'
import Header from '../Layout/Header'


function MainRoute() {
  return (
   <>
   <Router>
    <Header/>
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/shop/product/:id' element={<Product />} />

        <Route path='/cart' element={<Cart />} />
        <Route path='/contact' element={<Contact />} />




    </Routes>

   </Router>

   
   </>
  )
}

export default MainRoute