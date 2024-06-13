import React from 'react'
import { Link, useParams } from 'react-router-dom'
import Footer from '../../Common/Layout/Footer'


function Product() {
    let {id }= useParams()
  return (
    <div className='border-2 p-4 bg-teal-500'>
        Product id : <span>{id}</span>
        <h1 className='text-5xl'>{id}</h1>

<div className='p-4'>
        <Link to={`/shop/`} className='m-4 p-1 rounded-lg bg-slate-200 ring-4 ring-gray-200 focus:ring-gray-300'>Back on shop . .</Link>
</div>
    
            <Footer/>
        </div>
  )
}

export default Product