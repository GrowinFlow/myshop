import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProductCard from './PreComponents/ProductCard';
import Loading from '../../../Common/Components/Loading';

function ProductsPrevCard({ products, isLoading, error, searchTerm }) {
  const [categories, setCategories] = useState([]);
  const [currentFilter, setCurrentFilter] = useState('All');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const uniqueCategories = new Set(products.map(product => product.category));
    const categoriesArray = ['All', ...uniqueCategories];
    setCategories(categoriesArray);
  }, [products]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    setCurrentFilter(categoryParam || 'All');
  }, [location.search]);

  const filterProductByCategory = (category) => {
    setCurrentFilter(category);
    navigate(`/products${category !== 'All' ? `?category=${encodeURIComponent(category)}` : ''}`);
  };

  const filteredProducts = products.filter(product => {
    if (currentFilter === 'All') {
      return true; // Return all products if currentFilter is 'All'
    } else {
      return product.category === currentFilter;
    }
  });

  return (
    <div className="flex flex-col gap-2 overflow-y-auto">
      {/* Filter buttons */}
      <div className="themeGlassBg rounded-xl p-4 themeText">
        <div className="flex gap-2 flex-wrap justify-start items-center themeText">
          {categories.map(category => (
            <button
              key={category}
              className={`flex focus:outline-none ${
                currentFilter === category ? 'bg-orange-700 dark:bg-orange-400' : 'themeText'
              } focus:ring-2 focus:ring-orange-300 font-medium rounded-lg px-5 py-2.5 cursor-pointer dark:focus:ring-yellow-900`}
              onClick={() => filterProductByCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Product display */}
      <div className="themeGlassBg h-[65vh] rounded-xl p-4 themeText flex flex-col gap-2 overflow-y-auto">
        {isLoading ? (
          <Loading />
        ) : error ? (
          <p>Error loading products. Please try again later.</p>
        ) : filteredProducts.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <div className="themeGlassBg rounded-xl p-4 themeText flex flex-wrap content-start gap-2 h-full overflow-y-auto md:grid grid-cols-2 xl:grid-cols-3">
            <ProductCard products={filteredProducts} query={searchTerm} category={currentFilter}/>
          </div>
        )}
      </div>
    </div>
  );
}


export default ProductsPrevCard;
 