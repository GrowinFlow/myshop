
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import GlassCard from '../../../Common/Components/GlassCard';
import SearchBar from '../../../Common/Components/SearchBar';
import Button from '../../../Common/Components/Button';
import { FaPlus } from 'react-icons/fa';
import ProductsPrevCard from './ProductsPrevCard';
import { AdminSideProductContext } from '../../../lib/context/admin/AdminSideProductContext';

function ProductsControl() {
  const { 
    products,
    isLoading,
    error,} = useContext(AdminSideProductContext)

  return (
          <GlassCard>
    <div className="flex flex-col gap-4 min-h-[735px] overflow-x-hidden overflow-y-auto">

          {/* SearchBar and Add Button */}
          <GlassCard styleClass="flex gap-2">
            <SearchBar onSearch={null} placeholder="Search products by product_ID or name ..." />
            <Button text={<FaPlus />} styleClass="flex justify-center items-center text-xl font-bold" onClick={null} />
          </GlassCard>

          <ProductsPrevCard products={products} error={error} isLoading={isLoading}/>
        </div>
        </GlassCard >
  )
}

export default ProductsControl