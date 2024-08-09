import React from 'react'
import { FaChevronRight, FaEye, FaEyeSlash, FaFacebook, FaHeart, FaLinkedin, FaPen, FaShare, FaTiktok, FaWhatsapp, FaYoutube } from 'react-icons/fa'
import { FaCartShopping, FaEllipsisVertical, FaTrash } from 'react-icons/fa6'
import CustomTooltip from '../../CustomTooltip'

function GridItem({ id, image, category, title, description, price, discount, visible = false, itemCarts = 0, favItem=true, ...props }) {

    return (
        <>
            <div className="flex h-40 w-96 themeGlassBg rounded-xl p-3 themeText ">
                <div className="group/checkBox  w-full h-full flex gap-2 overflow-hidden group/imageHove border border-orange-700 dark:border-orange-400 p-1 rounded-xl">
                    <div className="img-box h-full w-[40%] rounded-lg overflow-hidden cursor-pointer">
                        <img src={image || `https://placehold.co/150/2fa1a1/00000`} alt="placehplder" className='w-full group-hover/imageHove:scale-125 trans-ani h-full object-cover' />
                    </div>
                    <div className="absolute w-12 h-6 hidden justify-end items-center group-hover/checkBox:flex">
                        <input type="checkbox" name="itemSelect" id="itemSelect" className='focus:ring-0 focus:border-none focus:outline-none' /> <label htmlFor="itemSelect" aria-readonly>
                            <small className='underline themeText select-none'>{id || "#32"}</small>
                            </label> 
                    </div>
                     <div className="w-[59%] grid grid-rows-[30px_,_1fr_,_30px]">

                        <div className="first-row flex justify-between items-center">
                            <spna className="category text-ellipsis overflow-hidden w-[70%]">#<b className='themeSpeText'>{category || "category"}</b></spna>

                            <span className="project-control flex gap-2 items-center">
                                <CustomTooltip
                                    content={<>
                                        <div className="grid grid-rows-3 h-20 w-16 overflow-y-auto border-orange-700 dark:border-orange-400 rounded-md">

                                            <span className="flex justify-center items-center gap-1 w-full  dark:text-blue-400 text-blue-700 hover:bg-blue-500 hover:text-white dark:hover:text-white cursor-pointer h-full px-2 rounded-t-md border-b-[0.5px] overflow-hidden border-orange-700 dark:border-orange-400"><FaPen /><span>Edit</span></span>

                                            <span className="flex justify-center items-center gap-1 w-full  dark:text-purple-400 text-purple-700 hover:bg-purple-500 hover:text-white dark:hover:text-white cursor-pointer h-full px-2 border-b-[0.5px] overflow-hidden border-orange-700 dark:border-orange-400">{visible ? <FaEye /> : <FaEyeSlash />}<span>{visible ? "Show" : "Hide"}</span></span>

                                            <span className="flex justify-center items-center gap-1 w-full  dark:text-red-500 text-red-700 hover:bg-red-500 hover:text-white dark:hover:text-white cursor-pointer h-full px-2 rounded-b-md  overflow-hidden border-orange-700 dark:border-orange-400"><FaTrash /><span>Delete</span></span>


                                        </div>
                                    </>}
                                    position="left_bottom"
                                    trigger="click"
                                    delay={100}
                                >
                                    <div className='edit-hide-delete cursor-pointer border-transparent hover:bg-orange-700 dark:hover:bg-orange-400 themeText p-1 hover:text-white rounded-full text-xs'>
                                        <FaEllipsisVertical />
                                    </div>
                                </CustomTooltip>
                                <div className='project-open cursor-pointer border-transparent hover:bg-orange-700 dark:hover:bg-orange-400 themeText p-1 hover:text-white rounded-full text-xs'>
                                    <FaChevronRight />
                                </div>

                            </span>
                        </div>

                        <div className="second-row">
                            <span className='flex justify-between items-center'>
                                <b className="text-medium capitalize overflow-hidden text-ellipsis w-[70%]">{title || `title`}</b>
                                <spna className="off text-ellipsis overflow-hidden"><b className='themeSpeText'>{discount || `34`}</b>%</spna>
                            </span>

                            <p className='text-xs text-wrap line-clamp-2 text-ellipsis'>
                                {description || ` Lorem ipsum dolor sit   a
                                met consectetur adipisicing elit. Maxime, eligendi?`}
                            </p>
                        </div>

                        <div className="third-row flex justify-between items-center">
                            <spna className="price text-ellipsis overflow-hidden w-[50%]">$<b className='themeSpeText'>{price || `34.5`}</b></spna>

                            <span className="cart-fav-share project-open flex gap-2 items-center">

                            <CustomTooltip
                content={<>
                <div>

                <div className="grid grid-cols-5 h-8 w-60 overflow-y-auto border-orange-700 dark:border-orange-400 rounded-md text-lg">

<span className="flex justify-center items-center gap-1 w-full  dark:text-red-500 text-red-700 hover:bg-red-600 hover:text-white dark:hover:text-white cursor-pointer h-full px-2 rounded-l-md  overflow-hidden border-orange-700 dark:border-orange-400"><FaYoutube /></span>

<span className="flex justify-center items-center gap-1 w-full  dark:text-blue-400 text-blue-700 hover:bg-blue-500 hover:text-white dark:hover:text-white cursor-pointer h-full px-2 border-l-[0.5px] overflow-hidden border-orange-700 dark:border-orange-400"><FaLinkedin/></span>


<span className="flex justify-center items-center gap-1 w-full  dark:text-slate-400 text-slate-700 hover:bg-slate-700 hover:text-white dark:hover:text-white cursor-pointer h-full px-2 border-l-[0.5px] overflow-hidden border-orange-700 dark:border-orange-400"><FaTiktok /></span>


<span className="flex justify-center items-center gap-1 w-full  dark:text-teal-400 text-teal-700 hover:bg-teal-500 hover:text-white dark:hover:text-white cursor-pointer h-full px-2 border-l-[0.5px] overflow-hidden border-orange-700 dark:border-orange-400"><FaWhatsapp /></span>

<span className="flex justify-center items-center gap-1 w-full  dark:text-blue-600 text-blue-800 hover:bg-blue-600 hover:text-white dark:hover:text-white cursor-pointer h-full px-2 rounded-r-md border-l-[0.5px] overflow-hidden border-orange-700 dark:border-orange-400"><FaFacebook /></span>

</div>
                </div>
                </>}
                position="left"
                trigger="click"
                delay={100}
              >
               <div className='fshareav cursor-pointer border-transparent hover:bg-orange-700 dark:hover:bg-orange-400 themeText p-1 hover:text-white rounded-full text-sm'>
                <FaShare />
                </div>
              </CustomTooltip>
                                <div className={`fav cursor-pointer border-transparent hover:bg-orange-700 dark:hover:bg-orange-400 themeText p-1 hover:text-white rounded-full text-xs ${favItem ? "bg-orange-700 dark:bg-orange-400 text-white" : "hover:bg-orange-700 dark:hover:bg-orange-400"}`}>
                                    <FaHeart />
                                </div>

                                <div className={`cart cursor-pointer border-transparent themeText p-1 hover:text-white rounded-full text-xs ${itemCarts > 0 ? "bg-orange-700 dark:bg-orange-400 text-white" : "hover:bg-orange-700 dark:hover:bg-orange-400"}`}>
                                    <FaCartShopping />
                                    {itemCarts > 0 ? <span className="absolute text-[10px] themeGlassBg border-transparent ml-1 h-2 w-2 p-2 font-mono rounded-full flex justify-center items-center" >
                                        <sub className='relative themeText text-medium'>{itemCarts}</sub>
                                    </span> : ""}

                                </div>


                            </span>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default GridItem