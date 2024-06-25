import React from 'react'
import { FaBoxOpen, FaDoorOpen, FaEye, FaPen, FaTrash } from 'react-icons/fa6'
import img from '../../../../assets/images/product.jpg'


function ProductCard({products}) {
  return (
    <>
    {products.map((product=>{
        
    <div
    key={product._id}
    className="relative grid grid-cols-6 gap-2 bg rounded-xl items-center p-2 w-full h-40"
>
    <div className="img themeGlassBg themeText rounded-xl p-2 col-span-2 h-full overflow-hidden flex ">
        <img src={product.images[0] || img} alt={product.title || "productImg}"} className='object-fit h-full w-full rounded-lg' />
    </div>

    <div className="product themeGlassBg themeText rounded-xl p-2 col-span-4 h-full">
                      <div className="details-box w-full rounded-xl flex flex-col items-center justify-center themeText text-sm">

                          {/* Action Buttons */}
                          <div className="action-D-E flex items-center justify-between gap-2 w-full py-2">
                            
                              <span className='flex gap-2 items-center'>
                              <button
                                  className='flex items-center text-blue-700 dark:text-blue-500 cursor-pointer hover:text-black  dark:hover:text-black hover:text-lg'
                                  title='Edit'
                                  onClick={null}
                              >
                                  <FaPen />
                              </button>
                                  <button
                                      className='flex items-center cursor-pointer text-gray-700 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-400 hover:text-lg'
                                      title='Preview'
                                      onClick={null}
                                  >
                                      <FaDoorOpen />
                                  </button>
                                  <button
                                      className='flex items-center cursor-pointer text-gray-700 dark:text-gray-300 hover:text-lg hover:text-black dark:hover:text-black'
                                      title='Visible'
                                      onClick={null}
                                  >
                                      <FaEye />
                                  </button>
                              </span>
                              <span className='themeSpeText'>visible | #category </span>

                            <button
                                      className='flex items-center cursor-pointer text-red-700 dark:text-red-600 hover:text-lg'
                                      title='Delete'
                                      onClick={null}
                                  >
                                      <FaTrash />
                                  </button>
                                
                          </div>

                          {/* User Details */}
                          <div className="name-price flex items-center justify-between gap-2 w-full border-b border-gray-800 dark:border-gray-100">
                              <span className='flex items-center capitalize text-ellipsis overflow-hidden'>
                                  {product.title}
                              </span>
                              <span className='flex items-center'>
                               <b className='themeSpeText'>$</b>  {product.price}
                              </span>
                          </div>

                          <div className=" flex gap-2 w-full border-b border-gray-800 dark:border-gray-100">
                              <span className=' overflow-hidden line-clamp-2'>
                                {product.description}
                                </span> 
                          </div>
                          <div className="brand-stock flex items-center justify-between gap-2 w-full border-b border-gray-800 dark:border-gray-100">
                        
                              <span className='flex items-center capitalize text-ellipsis overflow-hidden'>
                                  {product.brand}
                              </span>
                              <span className='flex items-center'>
                               <b className='themeSpeText'><FaBoxOpen className='text-lg'/></b>  {product.stock}
                              </span>
                          </div>

                      </div> 
                  </div> 
</div>
    }))}
    </>
  )
}

export default ProductCard