import React from 'react'
import ProductsControl from '../Component/ManageProductsComponents/ProductsControlCard'
import { AdminSideProductProvider } from '../../lib/context/admin/AdminSideProductContext'

function ManageProducts() {
  return (
    <AdminSideProductProvider>

    <div className="container mx-auto px-4 flex flex-col  gap-4 ">
    
      <ProductsControl/>


    </div>
    </AdminSideProductProvider>
  )
}

export default ManageProducts