import React from 'react'
import { FaShopware, FaM, FaY, FaS, FaH, FaP  } from 'react-icons/fa6'
import { Link } from 'react-router-dom'


function Logo(props) {
  return (
    <>
    <Link to="/">
    <span className={`text-${props.color} dark:text-${props.darkColor} flex items-center font-bold text-${props.size}`}>
    <FaM/><FaY/>-<FaS/><FaH/><FaShopware className='animate-spin themeSpeText'/> <FaP/>

    </span>
    </Link>
    </>
  )
}

export default Logo