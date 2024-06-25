import React from 'react'
import Footer from '../../Common/Layout/Footer'
import ProductsControl from '../Component/ManageProductsComponents/ProductsControl'
import { AdminSideProductProvider } from '../../lib/context/admin/AdminSideProductContext'

function ManageProducts() {
  return (
    <AdminSideProductProvider>

    <div className="container mx-auto px-4 flex flex-col  gap-4 ">
    
      <ProductsControl/>


        <Footer/>
    </div>
    </AdminSideProductProvider>
  )
}

export default ManageProducts