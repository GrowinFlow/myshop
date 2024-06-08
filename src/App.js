
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Shop from './Pages/Shop'
import Cart from './Pages/Cart'
import Contact from './Pages/Contact'
import Product from './Pages/Product'
import Header from './Layout/Header'
import SmoothScroll from './Component/Common/SmothScrolling'
import Footer from './Layout/Footer'





function App() {
  return (
    <>
    
    <Router>
    <SmoothScroll>
 

<div className='bg h-full transition-colors duration-200 ease-linear delay-75'>

    <Header />

    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/shop/product/:id' element={<Product />} />

        <Route path='/cart' element={<Cart />} />
        <Route path='/contact' element={<Contact />} />
    </Routes>
     
    <Footer/>
</div>

    </SmoothScroll>
   </Router>
    
    </>
  );
}

export default App;
