// NavItems.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavItems = React.memo(({ label, link, closeMenu }) => {
  const location = useLocation();
  const isActive = location.pathname === link;

  return (
    <li>
      <Link
        to={link}
        className={`block py-1 px-3 md:px-1 ${
          isActive
            ? 'text-orange-700 dark:text-orange-400 border-orange-700 dark:border-orange-400 border-b-2 pt-2 bg-glassl dark:bg-glassd md:bg-transparent dark:md:bg-transparent shadow-xl dark:shadow-2xl'
            : 'dark:text-white hover:bg-glassl dark:hover:bg-black md:hover:bg-transparent dark:md:hover:bg-transparent dark:hover:text-white trans-ani border-b-2 border-transparent hover:border-black dark:hover:border-white delay-100 pt-2 flex flex-nowrap'
        }`}
        onClick={closeMenu}
      >
 <span className='overflow-none text-ellipsis line-clamp-1'>       
  {label}
  </span>
      </Link>
    </li>
  );
});

export default NavItems;
