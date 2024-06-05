import React from 'react'
import { FaShopware, FaM, FaY, FaS, FaH, FaP  } from 'react-icons/fa6'


function Logo(props) {
  return (
    <>
    <span className={`text-${props.color} dark:text-${props.darkColor} flex items-center font-bold text-${props.size}`}>
    <FaM/><FaY/>-<FaS/><FaH/><FaShopware className='animate-spin'/> <FaP/>

    </span>
    </>
  )
}

export default Logo