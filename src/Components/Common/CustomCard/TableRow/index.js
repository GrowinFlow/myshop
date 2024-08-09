import React from 'react'
import CustomTooltip from '../../CustomTooltip'
import { FaChevronRight, FaEye, FaEyeSlash, FaFacebook, FaHeart, FaLinkedin, FaPen, FaShare, FaTiktok, FaWhatsapp, FaYoutube } from 'react-icons/fa'
import { FaCartShopping, FaEllipsisVertical, FaTrash } from 'react-icons/fa6'


function TableRow({ id, image, category, title, description, price, discount, visible = true, itemCarts = 3, favItem = false, ...props }) {
  return (
    <>
      <tr className='themeGlassBg rounded-lg p-2 themeText h-20 w-full flex justify-center items-center '>

        <span className="items-center grid grid-cols-[68px_,_80px_,_1fr_,_100px_,_60px_,_60px_,_100px_,_50px] rounded-lg p-1 overflow-hidden group/imageHove group/checkBox border border-orange-700 dark:border-orange-400 h-full w-full">

          <td className="flex justify-start">
            <div className="img-box h-12 w-16 rounded-lg overflow-hidden cursor-pointer">
              <img src={image || `https://placehold.co/150/2fa1a1/00000`} alt="placehplder" className='w-full group-hover/imageHove:scale-125 trans-ani h-full object-cover' />
            </div>
            <div className="absolute w-12 h-6 hidden justify-end items-center group-hover/checkBox:flex">
              <input type="checkbox" name="itemSelect" id="itemSelect" className='focus:ring-0 focus:border-none focus:outline-none' />
              <label htmlFor="itemSelect" aria-readonly>
                <small className='underline themeText select-none'>{id || "#32"}</small>
              </label>
            </div>
          </td>

          <td className="title ml-1">
            <b className="text-medium capitalize text-ellipsis overflow-hidden lg:w-16 md:w-12 w-8 text-nowrap">{title || `title`}</b>
          </td>

          <td className="description text-ellipsis overflow-hidden w-[90%] text-nowrap">
            {description || ` Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur cumque libero rem illo nisi architecto impedit vel dicta quaerat ipsam?`}
          </td>

          <td className="price w-[90%] text-nowrap">
            <spna className="category text-ellipsis overflow-hidden">#<b className='themeSpeText'>{category || "category"}</b></spna>
          </td>

          <td className="price  w-[90%] text-nowrap">
            <spna className="price text-ellipsis overflow-hidden w-[50%]">$<b className='themeSpeText'>{price || `34.5`}</b></spna>
          </td>

          <td className="discount  w-[90%] text-nowrap">
            <spna className="discount text-ellipsis overflow-hidden"><b className='themeSpeText'>{discount || `41`}</b>%</spna>
          </td>

          <td className="edit-hide-delete">
            <span className="edit-hide-delete project-open flex gap-2 items-center justify-evenly">

              <CustomTooltip
                content={<>
                  <div className="grid grid-cols-5 h-12 w-60 overflow-y-auto border-orange-700 dark:border-orange-400 rounded-md text-lg">

                    <span className="flex justify-center items-center gap-1 w-full  dark:text-red-500 text-red-700 hover:bg-red-600 hover:text-white dark:hover:text-white cursor-pointer h-full px-2 rounded-l-md  overflow-hidden border-orange-700 dark:border-orange-400"><FaYoutube /></span>

                    <span className="flex justify-center items-center gap-1 w-full  dark:text-blue-400 text-blue-700 hover:bg-blue-500 hover:text-white dark:hover:text-white cursor-pointer h-full px-2 border-l-[0.5px] overflow-hidden border-orange-700 dark:border-orange-400"><FaLinkedin /></span>


                    <span className="flex justify-center items-center gap-1 w-full  dark:text-slate-400 text-slate-700 hover:bg-slate-700 hover:text-white dark:hover:text-white cursor-pointer h-full px-2 border-l-[0.5px] overflow-hidden border-orange-700 dark:border-orange-400"><FaTiktok /></span>


                    <span className="flex justify-center items-center gap-1 w-full  dark:text-teal-400 text-teal-700 hover:bg-teal-500 hover:text-white dark:hover:text-white cursor-pointer h-full px-2 border-l-[0.5px] overflow-hidden border-orange-700 dark:border-orange-400"><FaWhatsapp /></span>

                    <span className="flex justify-center items-center gap-1 w-full  dark:text-blue-600 text-blue-800 hover:bg-blue-600 hover:text-white dark:hover:text-white cursor-pointer h-full px-2 rounded-r-md border-l-[0.5px] overflow-hidden border-orange-700 dark:border-orange-400"><FaFacebook /></span>

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

              <div className={`fav cursor-pointer border-transparent hover:bg-orange-700 dark:hover:bg-orange-400 themeText p-1 hover:text-white rounded-full text-sm ${favItem ? "bg-orange-700 dark:bg-orange-400 text-white" : "hover:bg-orange-700 dark:hover:bg-orange-400"}`}>
                <FaHeart />
              </div>

              <div className={`cart cursor-pointer border-transparent themeText p-1 hover:text-white rounded-full text-sm ${itemCarts > 0 ? "bg-orange-700 dark:bg-orange-400 text-white" : "hover:bg-orange-700 dark:hover:bg-orange-400"}`}>
                <FaCartShopping />
                {itemCarts > 0 ? <span className="absolute text-[10px] themeGlassBg border-transparent ml-1 h-2 w-2 p-2 font-mono rounded-full flex justify-center items-center" >
                  <sub className='relative themeText text-medium'>{itemCarts}</sub>
                </span> : ""}

              </div>

            </span>
          </td>


          <td className="projectControl flex justify-evenly items-center">

            <span className="project-control flex gap-2 items-center h-full">
              <CustomTooltip
                content={<>
                  <div className="grid grid-cols-3 h-12 w-60 overflow-y-auto border-orange-700 dark:border-orange-400 rounded-md">

                    <span className="flex justify-center items-center gap-1 w-full  dark:text-red-500 text-red-700 hover:bg-red-500 hover:text-white dark:hover:text-white cursor-pointer h-full px-2 rounded-l-md  overflow-hidden border-orange-700 dark:border-orange-400"><FaTrash /><span>Delete</span></span>

                    <span className="flex justify-center items-center gap-1 w-full  dark:text-purple-400 text-purple-700 hover:bg-purple-500 hover:text-white dark:hover:text-white cursor-pointer h-full px-2 border-l-[0.5px] overflow-hidden border-orange-700 dark:border-orange-400">{visible ? <FaEye /> : <FaEyeSlash />}<span>{visible ? "Show" : "Hide"}</span></span>


                    <span className="flex justify-center items-center gap-1 w-full  dark:text-blue-400 text-blue-700 hover:bg-blue-500 hover:text-white dark:hover:text-white cursor-pointer h-full px-2 rounded-r-md border-l-[0.5px] overflow-hidden border-orange-700 dark:border-orange-400"><FaPen /><span>Edit</span></span>

                  </div>
                </>}
                position="left"
                trigger="click"
                delay={100}
              >
                <div className='edit-hide-delete cursor-pointer border-transparent hover:bg-orange-700 dark:hover:bg-orange-400 themeText p-1 hover:text-white rounded-full text-sm'>
                  <FaEllipsisVertical />
                </div>
              </CustomTooltip>
              <div className='project-open cursor-pointer border-transparent hover:bg-orange-700 dark:hover:bg-orange-400 themeText p-1 hover:text-white rounded-full text-sm'>
                <FaChevronRight />
              </div>

            </span>
          </td>

        </span>
      </tr>

    </>
  )
}

export default TableRow 