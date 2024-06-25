import React, { useContext, useEffect, useState } from 'react';
import GlassCard from '../../../../Common/Components/GlassCard';
import { FaTimes } from 'react-icons/fa';
import WelcomeCard from '../../PreComonents/WelcomeCard';
import { formatDate } from '../../../../lib/helper';
import imgPlaceholder from '../../../../assets/images/product.jpg'; // Fallback image
import { AdminSideProductContext } from '../../../../lib/context/admin/AdminSideProductContext';

function SingleproductPrev({ productData, onClose }) {
    const { products } = useContext(AdminSideProductContext);
    const [productDetails, setProductDetails] = useState(null);
    const [featureImg, setFeatureImg] = useState(null);


    useEffect(() => {
        if (productData) {
            const productObj = products.find(product => product._id === productData);
            if (productObj) {
                setProductDetails(productObj);
                setFeatureImg(productObj.images[0] || imgPlaceholder); // Set the initial featured image
            }
        }
    }, [productData, products]);

    // Guard clause to handle undefined productDetails
    if (!productDetails) {
        return null;
    }

    // Destructure product details for easier access
    const { title, description, stock, images = [], category, brand, price, discount_percentage, creation_date, updatedAt, keywords = [] } = productDetails;

    // Handler to set the clicked image as the featured image
    const handleImageClick = (image) => {
        setFeatureImg(image);
    };

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-[100] rounded-2xl w-full h-full flex-col gap-4'>
            <GlassCard styleClass="relative p-4 pt-8 shadow-lg h-auto">
                <button
                    className='absolute top-2 right-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white text-xl'
                    onClick={onClose}
                >
                    <FaTimes />
                </button>

                <div className='bg-gray-100 dark:bg-gray-800 rounded-2xl p-4'>
                    <div className="bg rounded-2xl p-4 flex flex-col gap-4 items-center">
                        <WelcomeCard
                            text="This is"
                            data={`'${title || "N/A"}'`}
                            styleClass="w-full"
                        />
                        <div className="grid grid-cols-1 grid-rows-2 md:grid-rows-1 md:grid-cols-6 items-center gap-4 w-full">
                            <GlassCard styleClass="md:col-span-4">
                                <h2 className='text-xl font-semibold text-gray-900 dark:text-white'>
                                    Product Details
                                </h2>
                                <div className="hr mb-1 border-b border-gray-800 dark:border-gray-100"></div>
                                <p>{`DB_ID: ${productDetails._id || "N/A"}`}</p>
                                <p>{`Item ID: ${productDetails.item_id || "N/A"}`}</p>
                                <p>{`Title: ${title || "N/A"}`}</p>
                                <p className='line-clamp-2'>{`Description: ${description || "N/A"}`}</p>
                                <p>{`Stock: ${stock || "N/A"}`}</p>
                                <p>{`Category: ${category || "N/A"}`}</p>
                                <p>{`Brand: ${brand || "N/A"}`}</p>
                                <p>{`Price: $${price ? price['$numberDecimal'] : "N/A"}`}</p>
                                <p>{`Discount: ${discount_percentage || 0}%`}</p>
                                <p>{`Keywords: ${keywords.join(', ') || "N/A"}`}</p>
                            </GlassCard>

                            <GlassCard styleClass="md:col-span-2 h-80 group">
                                <div className="img themeGlassBg themeText rounded-xl p-2 col-span-2 h-full overflow-hidden flex">
                                    <img
                                        src={featureImg}
                                        alt={title || "Product Image"}
                                        className="object-cover h-full w-full rounded-lg group-hover:scale-125 cursor-pointer transition-all duration-400 ease-linear"
                                    />
                                </div>
                            </GlassCard>
                        </div>

                        <div className="grid grid-cols-1 grid-rows-2 md:grid-rows-1 md:grid-cols-6 items-center gap-4 w-full">
                            <GlassCard styleClass="md:col-span-4 flex items-center justify-between">
                                <div className="fRow">
                                    <p>{`Created At: ${creation_date ? formatDate(creation_date) : "N/A"}`}</p>
                                    <p>{`Updated At: ${updatedAt ? formatDate(updatedAt) : "N/A"}`}</p>
                                </div>
                                <div className="sRow">
                                    <p>{`Featured: ${productDetails.featured ? "Yes" : "No"}`}</p>
                                    <p>{`Visible: ${productDetails.visible ? "Yes" : "No"}`}</p>
                                </div>
                            </GlassCard>

                            <GlassCard styleClass="md:col-span-2 h-20 overflow-hidden flex items-center gap-2 justify-center">
                                {images.map((image, index) => (
                                    <div
                                        key={index}
                                        className="img themeGlassBg themeText rounded-xl col-span-2 h-full w-20 overflow-hidden flex p-1 group"
                                        onClick={() => handleImageClick(image)} // Update the featured image on click
                                    >
                                        <img
                                            src={image || imgPlaceholder}
                                            alt={title || "Product Image"}
                                            className="object-cover w-full rounded-lg group-hover:scale-125 cursor-pointer transition-all duration-400 ease-linear"
                                        />
                                    </div>
                                ))}
                            </GlassCard>
                        </div>
                    </div>
                </div>
            </GlassCard>
        </div>
    );
}

export default SingleproductPrev;
