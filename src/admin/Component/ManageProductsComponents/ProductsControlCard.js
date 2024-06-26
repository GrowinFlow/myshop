import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import GlassCard from '../../../Common/Components/GlassCard';
import ProductsPrevCard from './ProductsPrevCard';
import SearchBar from '../../../Common/Components/SearchBar';
import Button from '../../../Common/Components/Button';
import { FaPlus } from 'react-icons/fa';
import { AdminSideProductContext } from '../../../lib/context/admin/AdminSideProductContext';
import ProductsDetailsForm from './ProductsDetailsForm';

function ProductsControl() {
  const { products, isLoading, error,productIdToEdit } = useContext(AdminSideProductContext);
  const navigate = useNavigate();
  const location = useLocation();

  console.log(productIdToEdit)


  const [showOverlay, setShowOverlay] = useState(false);
  const [actionType, setActionType] = useState('add');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchTerm, setSearchTerm] = useState('');

  // Function to filter products based on search term
  const filterProducts = (query) => {
    if (!query) {
      setFilteredProducts(products);
      return;
    }

    const results = products.filter(product =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(results);
  };

  // Function to handle search
  const handleSearch = (query) => {
    setSearchTerm(query);
    if (query) {
      navigate(`/products?search=${encodeURIComponent(query)}`);
    } else {
      navigate('/products');
    }
  };
  useEffect(() => {
    if(productIdToEdit){

      console.log(productIdToEdit)
      setShowOverlay(true);
      setActionType('update');
      navigate('/products?action=update'); 
    }else{
      navigate('/products'); 

    }

  }, [productIdToEdit])
  

  // Function to open the overlay for adding a new product
  const handleOpenOverlay = () => {
    setShowOverlay(true);
    setActionType('add');
    navigate('/products?action=add');
  };

  // Function to close the overlay
  const handleCloseOverlay = () => {
    setShowOverlay(false);
    setActionType('add');
    navigate('/products');
  };

  // Effect to update filtered products when URL or products change
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get('search') || '';
    setSearchTerm(search);
    filterProducts(search);
  }, [location.search, products]);

  return (
    <GlassCard>
      <div className="flex flex-col gap-4 min-h-[735px] overflow-x-hidden overflow-y-auto">
        {/* SearchBar and Add Button */}
        <GlassCard styleClass="flex gap-2">
          <SearchBar onSearch={handleSearch} placeholder="Search products by title ..." />
          <Button text={<FaPlus />} styleClass="flex justify-center items-center text-xl font-bold" onClick={handleOpenOverlay} />
        </GlassCard>

        {/* Overlay Form */}
        {showOverlay && (
          <div className="form z-10">
            <ProductsDetailsForm
              handleCloseOverlay={handleCloseOverlay}
              actionType={actionType}
              setActionType={setActionType}
              productIdToEdit={productIdToEdit}
            />
          </div>
        )}

        {/* Preview Cards */}
        <div className="prev">
          <ProductsPrevCard products={filteredProducts} error={error} isLoading={isLoading} searchTerm={searchTerm} />
        </div>
      </div>
    </GlassCard>
  );
}

export default ProductsControl;
