import React, { useContext, useEffect, useState } from 'react';
import {
    FaTag, FaDollarSign, FaAlignLeft, FaPercent, FaRegCalendar, FaBox, FaListUl, FaImage, FaTimes,
    FaQrcode
} from 'react-icons/fa';

import Button from "../../../Common/Components/Button";
import Toast from '../../../Common/Components/Toast';
import { AdminSideProductContext } from '../../../lib/context/admin/AdminSideProductContext';
import TagCloud from '../../../Common/Components/TagCloud';
import { useNavigate } from 'react-router-dom';
const ProductsDetailsForm = ({ handleCloseOverlay, actionType, setActionType, productIdToEdit }) => {
    const navigate = useNavigate()
    const [imageTags, setImageTags] = useState([]);
    const [keywordTags, setKeywordTags] = useState([]);

    const {
        products,
        isLoading,
        error,
        addProduct,
        updateProduct,
        setProductIdToEdit
    } = useContext(AdminSideProductContext);

    const [productData, setProductData] = useState({
        item_id: '',
        title: '',
        description: '',
        category: '',
        brand: '',
        price: '',
        discount_percentage: '',
        images: [],
        stock: '',
        keywords: [],
        featured: false,
        visible: true
    });

    const [toast, setToast] = useState({ show: false, type: '', message: '' });
    const [showOverlay, setShowOverlay] = useState(true);

    useEffect(() => {
        if (productIdToEdit && products && products.length > 0) {
            const productToEdit = products.find(product => product._id === productIdToEdit);
            if (productToEdit) {
                setProductData({
                    item_id: productToEdit.item_id || '',
                    title: productToEdit.title || '',
                    description: productToEdit.description || '',
                    category: productToEdit.category || '',
                    brand: productToEdit.brand || '',
                    price: productToEdit.price["$numberDecimal"] || '',
                    discount_percentage: productToEdit.discount_percentage || '',
                    images: productToEdit.images || [],
                    stock: productToEdit.stock || '',
                    keywords: productToEdit.keywords || [],
                    featured: productToEdit.featured || false,
                    visible: productToEdit.visible || true
                });
                setImageTags(productToEdit.images || []); // Initialize image tags
                setKeywordTags(productToEdit.keywords || []); // Initialize keyword tags
                setActionType('Update');
            }
        } else {
            setActionType('Add');
            setProductData({
                item_id: '',
                title: '',
                description: '',
                category: '',
                brand: '',
                price: '',
                discount_percentage: '',
                images: [],
                stock: '',
                keywords: [],
                featured: false,
                visible: true
            });
            setImageTags([]); // Reset image tags
            setKeywordTags([]); // Reset keyword tags
        }
    }, [productIdToEdit, products]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProductData(prevProductData => ({
            ...prevProductData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleAddOrUpdateProduct = async (e) => {
        e.preventDefault();
        try {
            if (!productData.item_id) {
                throw new Error('Item ID is required.');
            }

            const updatedProductData = {
                ...productData,
                images: imageTags, // Add images from TagCloud
                keywords: keywordTags // Add keywords from TagCloud
            };

            if (productIdToEdit) {
                await updateProduct(productIdToEdit, updatedProductData);
                setToast({ show: true, type: 'success', message: 'Product updated successfully!' });
            } else {
                const isDuplicate = products.some(product => product.title === productData.title);
                if (isDuplicate) {
                    setToast({ show: true, type: 'error', message: 'Product with the same title already exists!' });
                    return;
                }
                await addProduct(updatedProductData);
                setToast({ show: true, type: 'success', message: 'Product added successfully!' });
            }
            setTimeout(() => {
                setToast({ ...toast, show: false });
            }, 5000);
            setProductIdToEdit(null);
            handleClose(); // Close the overlay after action
        } catch (error) {
            console.error("Error in handleAddOrUpdateProduct:", error);
            setToast({ show: true, type: 'error', message: 'Error processing product. Please try again.' });
        }
    };

    const handleCloseToast = () => {
        setToast({ ...toast, show: false });
    };

    const handleClose = () => {
        setShowOverlay(false);
        setProductIdToEdit(null)
        if (typeof handleCloseOverlay === 'function') {
            handleCloseOverlay();
            navigate('/products')
        }
    };
    console.log(keywordTags, imageTags)

    return (
        <>
            {showOverlay && (
                <div className='fixed inset-0 flex flex-col items-center justify-center bg-gray-900 bg-opacity-75 z-[100] rounded-2xl'>
                    <div className="flex flex-col gap-2">
                        <button
                            className='absolute top-2 right-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white text-xl'
                            onClick={handleClose}
                        >
                            <FaTimes />
                        </button>
                    </div>
                    <div className="relative top-2 w-full flex flex-col gap-4">
                        <div className="themeGlassBg rounded-xl p-6 themeText w-full">
                            <span className='text-xl font-bold'>{actionType} Product:</span>
                        </div>
                        <form onSubmit={handleAddOrUpdateProduct} className='flex flex-col items-center gap-4 themeGlassBg rounded-xl p-4 themeText overflow-y-auto w-full'>
                            <div className='flex w-full items-center flex-wrap md:flex-nowrap gap-2'>
                                <div className="relative flex gap-2 bg rounded-xl items-center p-2 w-full">
                                    <div className="absolute z-10 inset-y-0 start-0 flex items-center ps-3 ml-2 pointer-events-none">
                                        <FaQrcode />
                                    </div>
                                    <input
                                        type="text"
                                        name="item_id"
                                        value={productData.item_id}
                                        onChange={handleInputChange}
                                        placeholder="Item ID ..."
                                        className="block w-full p-4 ps-10 text-sm bg-glassl dark:bg-glassd backdrop-blur-md rounded-lg focus:ring-transparent border-transparent focus:border-transparent dark:placeholder-gray-200 dark:text-white dark:focus:ring-transparent dark:focus:border-transparent"
                                        required
                                    />
                                </div>
                            </div>
                            <div className='flex w-full items-center flex-wrap md:flex-nowrap gap-2'>
                                <div className="relative flex gap-2 bg rounded-xl items-center p-2 w-full">
                                    <div className="absolute z-10 inset-y-0 start-0 flex items-center ps-3 ml-2 pointer-events-none">
                                        <FaTag />
                                    </div>
                                    <input
                                        type="text"
                                        name="title"
                                        value={productData.title}
                                        onChange={handleInputChange}
                                        placeholder="Title ..."
                                        className="block w-full p-4 ps-10 text-sm bg-glassl dark:bg-glassd backdrop-blur-md rounded-lg focus:ring-transparent border-transparent focus:border-transparent dark:placeholder-gray-200 dark:text-white dark:focus:ring-transparent dark:focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div className="relative flex gap-2 bg rounded-xl items-center p-2 w-full">
                                    <div className="absolute z-10 inset-y-0 start-0 flex items-center ps-3 ml-2 pointer-events-none">
                                        <FaBox />
                                    </div>
                                    <input
                                        type="number"
                                        name="stock"
                                        min="0"
                                        max="999"
                                        value={productData.stock}
                                        onChange={handleInputChange}
                                        placeholder="Stock ..."
                                        className="block w-full p-4 ps-10 text-sm bg-glassl dark:bg-glassd backdrop-blur-md rounded-lg focus:ring-transparent border-transparent focus:border-transparent dark:placeholder-gray-200 dark:text-white dark:focus:ring-transparent dark:focus:border-transparent"
                                        required
                                    />
                                </div>
                            </div>
                            <div className='flex w-full items-center flex-wrap md:flex-nowrap gap-2'>
                                <div className="relative flex gap-2 bg rounded-xl items-center p-2 w-full">
                                    <div className="absolute z-10 inset-y-0 start-0 flex items-center ps-3 ml-2 pointer-events-none">
                                        <FaListUl />
                                    </div>
                                    <input
                                        type="text"
                                        name="category"
                                        value={productData.category}
                                        onChange={handleInputChange}
                                        placeholder="Category ..."
                                        className="block w-full p-4 ps-10 text-sm bg-glassl dark:bg-glassd backdrop-blur-md rounded-lg focus:ring-transparent border-transparent focus:border-transparent dark:placeholder-gray-200 dark:text-white dark:focus:ring-transparent dark:focus:border-transparent"
                                        required
                                    />
                                </div>
                                <div className="relative flex gap-2 bg rounded-xl items-center p-2 w-full">
                                    <div className="absolute z-10 inset-y-0 start-0 flex items-center ps-3 ml-2 pointer-events-none">
                                        <FaTag />
                                    </div>
                                    <input
                                        type="text"
                                        name="brand"
                                        value={productData.brand}
                                        onChange={handleInputChange}
                                        placeholder="Brand ..."
                                        className="block w-full p-4 ps-10 text-sm bg-glassl dark:bg-glassd backdrop-blur-md rounded-lg focus:ring-transparent border-transparent focus:border-transparent dark:placeholder-gray-200 dark:text-white dark:focus:ring-transparent dark:focus:border-transparent"
                                        required
                                    />
                                </div>
                            </div>
                            <div className='flex w-full items-center flex-wrap md:flex-nowrap gap-2'>
                                <div className="relative flex gap-2 bg rounded-xl items-center p-2 w-full">
                                    <div className="absolute z-10 inset-y-0 start-0 flex items-center ps-3 ml-2 pointer-events-none">
                                        <FaDollarSign />
                                    </div>
                                    <input
                                        type="number"
                                        min="5"
                                        step="0.99"
                                        name="price"
                                        value={productData.price}
                                        onChange={handleInputChange}
                                        placeholder="Price ..."
                                        className="block w-full p-4 ps-10 text-sm bg-glassl dark:bg-glassd backdrop-blur-md rounded-lg focus:ring-transparent border-transparent focus:border-transparent dark:placeholder-gray-200 dark:text-white dark:focus:ring-transparent dark:focus:border-transparent"
                                        required
                                    />
                                </div>
                                <div className="relative flex gap-2 bg rounded-xl items-center p-2 w-full">
                                    <div className="absolute z-10 inset-y-0 start-0 flex items-center ps-3 ml-2 pointer-events-none">
                                        <FaPercent />
                                    </div>
                                    <input
                                        type="number"
                                        min="0"
                                        max="100"
                                        step="1"
                                        name="discount_percentage"
                                        value={productData.discount_percentage}
                                        onChange={handleInputChange}
                                        placeholder="Discount Percentage ..."
                                        className="block w-full p-4 ps-10 text-sm bg-glassl dark:bg-glassd backdrop-blur-md rounded-lg focus:ring-transparent border-transparent focus:border-transparent dark:placeholder-gray-200 dark:text-white dark:focus:ring-transparent dark:focus:border-transparent"
                                    />
                                </div>
                            </div>
                            <div className='flex w-full items-center flex-wrap md:flex-nowrap gap-2'>
                                <div className="relative flex gap-2 bg rounded-xl items-center p-2 w-full overflow-hidden">
                                    <div className="absolute z-10 inset-y-0 start-0 flex items-center ps-3 ml-2 pointer-events-none">
                                        <FaAlignLeft />
                                    </div>
                                    <textarea
                                        type="text"
                                        name="description"
                                        value={productData.description}
                                        onChange={handleInputChange}
                                        placeholder="Description ..."
                                        className="block w-full p-4 ps-10 text-sm bg-glassl h-[54px] dark:bg-glassd backdrop-blur-md rounded-lg focus:ring-transparent border-transparent focus:border-transparent dark:placeholder-gray-200 dark:text-white dark:focus:ring-transparent dark:focus:border-transparent"
                                        required
                                    ></textarea>
                                </div>
                                <TagCloud
                                    icon={FaImage}
                                    placeholder="Add Image URLs, min 4..."
                                    limit={6}
                                    initialTags={imageTags}
                                    onTagsChange={setImageTags}
                                />
                            </div>
                            <div className='flex w-full items-center flex-wrap md:flex-nowrap gap-2'>
                                <TagCloud
                                    icon={FaRegCalendar}
                                    placeholder="Add Keywords..."
                                    limit={5}
                                    initialTags={keywordTags}
                                    onTagsChange={setKeywordTags}
                                />
                                <div className='flex justify-evenly gap-2 w-full items-center'>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            name="featured"
                                            checked={productData.featured}
                                            onChange={handleInputChange}
                                            className="form-checkbox h-5 w-5 text-orange-600 dark:text-orange-400 transition duration-150 ease-in-out"
                                        />
                                        <label htmlFor="featured" className="ml-2 block text-sm leading-5 text-gray-900 dark:text-white">
                                            Featured
                                        </label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            name="visible"
                                            checked={productData.visible}
                                            onChange={handleInputChange}
                                            className="form-checkbox h-5 w-5 text-orange-600 dark:text-orange-400 transition duration-150 ease-in-out"
                                        />
                                        <label htmlFor="visible" className="ml-2 block text-sm leading-5 text-gray-900 dark:text-white">
                                            Visible
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className='w-full flex justify-center'>
                                <Button type="submit" styleClass="px-6 py-2 rounded-lg font-bold w-full flex justify-center items-center h-12"
                                    disabled={isLoading}
                                    text={`${actionType === 'Update' ? 'Update' : 'Add'} Product`}
                                >

                                </Button>
                            </div>
                        </form>
                        {toast.show && (
                            <Toast
                                type={toast.type}
                                message={toast.message}
                                onClose={handleCloseToast}
                            />
                        )}
                    </div>
                </div>



            )}
        </>
    );
};

export default ProductsDetailsForm;
