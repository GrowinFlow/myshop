import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import Footer from '../../Common/Layout/Footer'

function Shop() {
    const [id, setId] = useState("1")
  return (
    <div className='border-2 p-4 bg-slate-500'>
    <div>Shop </div>
    <input onChange={(e)=>{setId(e.target.value)}} type="text" placeholder='Enter any word . . . .'/>

    <Link to={`/shop/product/${id}`} className='mx-4 p-4 rounded-lg bg-slate-200 ring-4 ring-gray-200 focus:ring-gray-300'>Go on Product Page . .</Link>
    
        <Footer/>
    </div>
  )
}

export default Shop