import React from 'react'
import { FaShopware } from 'react-icons/fa'


function Logo(props) {
  return (
    <>
    <span className={`text-${props.color} dark:text-${props.darkColor} flex items-center font-bold text-${props.size}`}>
        SH<FaShopware />P

    </span>
    </>
  )
}

export default Logo