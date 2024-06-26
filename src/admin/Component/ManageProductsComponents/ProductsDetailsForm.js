import React, { useContext, useEffect, useState } from 'react';
import { FaTag, FaDollarSign, FaAlignLeft, FaPercent, FaBox, FaListUl, FaImage, FaTimes, FaQrcode, FaRegCalendar, FaChevronLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { AdminSideProductContext } from '../../../lib/context/admin/AdminSideProductContext';
import TagCloud from '../../../Common/Components/TagCloud';
import GlassCard from '../../../Common/Components/GlassCard';
import Button from "../../../Common/Components/Button";
import { closeOnKey, showToast } from '../../../lib/helper';

const ProductsDetailsForm = ({ handleCloseOverlay, actionType, setActionType, productIdToEdit }) => {
    const navigate = useNavigate();
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
    const [imageTags, setImageTags] = useState([]);
    const [keywordTags, setKeywordTags] = useState([]);
    const [uniqueCategories, setUniqueCategories] = useState([]);
    const [showOverlay, setShowOverlay] = useState(true);

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
                setImageTags(productToEdit.images || []);
                setKeywordTags(productToEdit.keywords || []);
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
            setImageTags([]);
            setKeywordTags([]);
        }

        if (products && products.length > 0) {
            const categories = products.map(product => product.category);
            const uniqueCategories = [...new Set(categories)];
            setUniqueCategories(uniqueCategories);
        }
    }, [productIdToEdit, products]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProductData(prevProductData => ({
            ...prevProductData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleCategoryFocus = () => {
        setShowCategoryDropdown(true);
        setFilteredCategories(uniqueCategories);
    };

    const handleCategoryChange = (e) => {
        const { value } = e.target;
        setProductData(prevProductData => ({
            ...prevProductData,
            category: value
        }));
    };

    const handleCategorySelect = (category) => {
        setProductData(prevProductData => ({
            ...prevProductData,
            category: category
        }));
        setShowCategoryDropdown(false);
    };

    const handleAddOrUpdateProduct = async (e) => {
        e.preventDefault();
        try {
            if (!productData.item_id) {
                throw new Error('Item ID is required.');
            }

            const updatedProductData = {
                ...productData,
                images: imageTags,
                keywords: keywordTags
            };

            if (productIdToEdit) {
                await updateProduct(productIdToEdit, updatedProductData);
                showToast('Product updated successfully!', 'success');
            } else {
                const isDuplicate = products.some(product => product.title === productData.title);
                if (isDuplicate) {
                    showToast('Product with the same title already exists!', 'error');
                    return;
                }
                await addProduct(updatedProductData);
                showToast('Product added successfully!', 'success');
            }
            setProductIdToEdit(null);
            handleClose();
        } catch (error) {
            console.error("Error in handleAddOrUpdateProduct:", error);
            showToast('Error processing product. Please try again.', 'error');
        }
    };


    const handleClose = () => {
        setProductIdToEdit(null);
        if (typeof handleCloseOverlay === 'function') {
            handleCloseOverlay();
            navigate('/products');
        }
    };

    useEffect(() => {
        const unbindEsc = closeOnKey(handleClose);
        return () => {
          unbindEsc(); 
        }; 
      }, [handleClose]);
    return (
        <>
            {showOverlay && (
                <div className='fixed inset-0 flex flex-col items-center justify-center bg-gray-900 bg-opacity-75 z-[100] rounded-2xl'>
                    <div className="flex flex-col gap-2 z-[9999]">
                        <button
                            className='absolute top-2 right-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white text-xl '
                            onClick={handleClose}
                        >
                            <FaTimes />
                        </button>
                    </div>
                    <GlassCard styleClass="w-full relative top-12">
                        
                    <div className=" w-full flex flex-col gap-4">
                    <div className="themeGlassBg rounded-xl p-6 themeText w-full grid grid-cols-10 items-center">
                <div className="flex flex-col gap-2 justify-start col-span-2">
                  <button
                    className=' top-2 right-2  text-xl'
                    onClick={handleClose}
                  >
                    <FaChevronLeft className='hover:scale-150'/>
                  </button>
                </div>
                <span className='text-2xl font-bold col-span-6 flex justify-center'>{actionType} Product:</span>
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
                                        pattern="[a-zA-Z0-9]+"
  title="Item ID can only contain letters and numbers."
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
                                        pattern="[a-zA-Z0-9]+"
                                        title="Category can only contain letters and numbers."
                                        value={productData.category}
                                        onChange={handleCategoryChange}
                                        onFocus={handleCategoryFocus}
                                        placeholder="Category ..."
                                        className="block w-full p-4 ps-10 text-sm bg-glassl dark:bg-glassd backdrop-blur-md rounded-lg focus:ring-transparent border-transparent focus:border-transparent dark:placeholder-gray-200 dark:text-white dark:focus:ring-transparent dark:focus:border-transparent"
                                        required
                                    />
                                    {showCategoryDropdown && (
                                        <ul className="absolute top-full left-0 w-full bg-white dark:bg-gray-700 shadow-lg max-h-40 overflow-y-auto rounded-md z-20 mt-2">
                                            {filteredCategories.map((category, index) => (
                                                <li
                                                    key={index}
                                                    className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                                                    onClick={() => handleCategorySelect(category)}
                                                >
                                                    {category}
                                                </li>
                                            ))}
                                            {filteredCategories.length === 0 && (
                                                <li className="px-4 py-2 text-gray-500">
                                                    No matching categories found. Press Enter to add "{productData.category}"
                                                </li> 
                                            )}
                                        </ul>
                                    )}
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
                                    icon={FaRegCalendar}
                                    placeholder="Add Keywords..."
                                    limit={4}
                                    initialTags={keywordTags}
                                    onTagsChange={setKeywordTags}
                                />
                            </div>
                            <div className='flex w-full items-center flex-wrap md:flex-nowrap gap-2'>
                            <TagCloud
                                    icon={FaImage}
                                    placeholder="Add Image URLs, min 4..."
                                    limit={6}
                                    initialTags={imageTags}
                                    onTagsChange={setImageTags}
                                />
                                <div className='flex justify-evenly gap-2 w-full items-center'>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            id="featured"

                                            name="featured"
                                            checked={productData.featured}
                                            onChange={handleInputChange}
                                            className="form-checkbox h-5 w-5 text-orange-600 dark:text-orange-400 transition duration-150 ease-in-out"
                                        />
                                        <label htmlFor="featured" className="ml-2 block text-sm leading-5 text-gray-900 dark:text-white font-bold" >
                                            Featured
                                        </label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            id="visible"
                                            name="visible"
                                            checked={productData.visible}
                                            onChange={handleInputChange}
                                            className="form-checkbox h-5 w-5 text-orange-600 dark:text-orange-400 transition duration-150 ease-in-out"
                                        />
                                        <label htmlFor="visible" className="ml-2 block text-sm leading-5 text-gray-900 dark:text-white font-bold">
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
                     

                    </div>
                            </GlassCard>
               </div>



            )}
        </>
    ); 
};

export default ProductsDetailsForm;
