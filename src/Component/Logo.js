import React from 'react'
import { FaM, FaY, FaS, FaH, FaP, FaO, FaCartFlatbed  } from 'react-icons/fa6'
import { Link } from 'react-router-dom'


function Logo(props) {
  return (
    <>
    <Link to="/">
    <span className={`text-${props.color || "text-black dark:text-white"} dark:text-${props.darkColor} flex items-center font-bold text-${props.size} ${props.style}`}>
  <FaS/><FaCartFlatbed className='animate-bounce themeSpeText'/><FaO/><FaP/>

    </span>
    </Link>
    </>
  )
}

export default Logo