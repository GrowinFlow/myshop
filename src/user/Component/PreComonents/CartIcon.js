import React from 'react'
import { FaCartShopping } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

function CartIcon() {
  return (
    <>

     <button
              type="button"
              className="inline-flex items-center p-2 md:hidden  w-8 h-8 justify-center text-sm rounded-lg text-black dark:text-white "
            >
    <Link to="/cart">
              <FaCartShopping className='text-lg'/>
              <small className=' absolute'>
                <span className='relative -top-[9px] text-[10px] bg-orange-700 dark:bg-orange-400 p-1 rounded-full text-white -right-3'>{14}</span>
              </small>
    </Link>
            </button>
    </>
  )
}

export default CartIcon 