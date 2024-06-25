// components/ProductCard.js
import React, { useContext, useState } from 'react';
import { FaBoxOpen, FaDoorOpen, FaEye, FaEyeSlash, FaPen, FaTrash } from 'react-icons/fa';
import img from '../../../../assets/images/product.jpg';
import { AdminSideProductContext } from '../../../../lib/context/admin/AdminSideProductContext';
import { formatPrice, highlightText } from '../../../../lib/helper';
import SingleproductPrev from './SingleProductPrev';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ products = [], query }) => {
  const navigate = useNavigate();
  const {
    updateProductVisibility,
    deleteProduct,
    fetchProductVisibility,
    setProductIdToEdit,
  } = useContext(AdminSideProductContext);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleToggleVisibility = async (productId) => {
    try {
      const isVisible = await fetchProductVisibility(productId);
      await updateProductVisibility(productId, !isVisible);
    } catch (error) {
      console.error(`Error toggling visibility for product ${productId}:`, error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(productId);
      } catch (error) {
        console.error(`Error deleting product ${productId}:`, error);
      }
    }
  };

  const handleViewProduct = (productId) => {
    const product = products.find(prod => prod._id === productId);
    setSelectedProduct(product);
    navigate(`/products/preview=${product.item_id}`);
  };

  const handleEditProduct = (productId) => {
    setProductIdToEdit(productId);
    console.log('Product ID to edit:', productId); // Log productId to check if it's being set

  };

  if (!products || products.length === 0) {
    return <p>No products available</p>;
  }

  return (
    <>
      {products.map((product) => (
        <div
          key={product._id}
          className="relative grid grid-cols-6 gap-2 bg rounded-xl items-center p-2 w-full h-40 group"
        >
          <div className="img themeGlassBg themeText rounded-xl p-2 col-span-2 h-full overflow-hidden flex">
            <img
              src={product.images[0] || img}
              alt={product.title || "productImg"}
              className="object-fit h-full w-full rounded-lg group-hover:scale-125 cursor-pointer transition-all duration-400 ease-linear"
            />
          </div>

          <div className="product themeGlassBg themeText rounded-xl p-2 col-span-4 h-full">
            <div className="details-box w-full rounded-xl flex flex-col items-center justify-center themeText text-sm">

              {/* Action Buttons */}
              <div className="action-D-E flex items-center justify-between gap-2 w-full py-2">
                <span className='flex gap-2 items-center'>
                  <button
                    className='flex items-center text-blue-700 dark:text-blue-500 cursor-pointer hover:text-black dark:hover:text-black transform transition-transform duration-300 hover:scale-150'
                    title='Edit'
                    onClick={() => handleEditProduct(product._id)}
                  >
                    <FaPen />
                  </button>
                  <button
                    className='flex items-center cursor-pointer text-gray-700 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-400 transform transition-transform duration-300 hover:scale-150'
                    title='Preview'
                    onClick={() => handleViewProduct(product._id)}
                  >
                    <FaDoorOpen />
                  </button>
                  <button
                    className={`flex items-center cursor-pointer ${product.visible ? 'text-gray-700' : 'text-red-600'} dark:${product.visible ? 'text-gray-300' : 'text-red-300'} transform transition-transform duration-300 hover:scale-150 hover:text-black dark:hover:text-black`}
                    title='Toggle Visibility'
                    onClick={() => handleToggleVisibility(product._id)}
                  >
                    {product.visible ? <FaEye /> : <FaEyeSlash />}
                  </button>
                </span>
                <span className='themeSpeText flex flex-nowrap text-nowrap'><small className='lg:flex hidden'>{product.visible ? 'Visible' : 'Hidden'} | </small> {product.category}</span>

                <button
                  className='flex items-center cursor-pointer text-red-700 dark:text-red-600 transform transition-transform duration-300 hover:scale-150'
                  title='Delete'
                  onClick={() => handleDeleteProduct(product._id)}
                >
                  <FaTrash />
                </button>
              </div>

              {/* Product Details */}
              <div className="name-price flex items-center justify-between gap-2 w-full border-b border-gray-800 dark:border-gray-100">
                <span className='flex items-center capitalize text-ellipsis overflow-hidden text-nowrap' dangerouslySetInnerHTML={{ __html: highlightText(product.title, query) }}>
                </span>
                <span className='flex items-center'>
                  <b className='themeSpeText'>$</b> {formatPrice(product.price)}
                </span>
              </div>

              <div className="description flex gap-2 w-full border-b border-gray-800 dark:border-gray-100">
                <span className='overflow-hidden line-clamp-2'>
                  {product.description}
                </span>
              </div>

              <div className="brand-stock flex items-center justify-between gap-2 w-full border-b border-gray-800 dark:border-gray-100">
                <span className='flex items-center capitalize text-ellipsis overflow-hidden'>
                  {product.brand}
                </span>
                <span className='flex items-center'>
                  <b className='themeSpeText'><FaBoxOpen className='text-lg' /></b> {product.stock}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Render the preview modal if a product is selected */}
      {selectedProduct && (
        <SingleproductPrev 
          productData={selectedProduct._id} 
          onClose={() => {
            setSelectedProduct(null);
            navigate(`/products`);
          }} 
        />
      )}
    </>
  );
};

export default ProductCard;
