
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Dashbord from './admin/Pages/Dashbord'
import Home from './user/Pages/Home'
import Shop from './user/Pages/Shop'
import Cart from './user/Pages/Cart'
import Contact from './user/Pages/Contact'
import Product from './user/Pages/Product'
import Header from './Common/Layout/Header'
import SmoothScroll from './Common/Components/SmothScrolling'
import Footer from './Common/Layout/Footer'
import LoginPage from './Common/Auth/LoginPage'






function App() {
  return (
    <>
    
    <Router>
    <SmoothScroll>

<div className='bg h-full transition-colors duration-200 ease-linear delay-75 '>

    <Header />
 <LoginPage/>

    <Routes>
        <Route path='/' element={<Dashbord />} />
        <Route path='/home' element={<Home />} />
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
