
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Shop from './Pages/Shop'
import Cart from './Pages/Cart'
import Contact from './Pages/Contact'
import Product from './Pages/Product'
import Header from './Layout/Header'






function App() {
  return (
    <>
<div className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-screen'>

    <Router>
    <Header />

    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/shop/product/:id' element={<Product />} />

        <Route path='/cart' element={<Cart />} />
        <Route path='/contact' element={<Contact />} />




    </Routes>

   </Router>
   <div className="w-full ">
      <div className="container mx-auto px-4 lg:px-8">

    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
 
      </div>
    </div>
     
</div>
    </>
  );
}

export default App;
