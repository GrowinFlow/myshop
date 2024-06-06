import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function NavItems({ label, link, closeMenu }) {
  const location = useLocation();
  const isActive = location.pathname === link;

  return (
    <li>
      <Link
        to={link}
        className={`block py-2 px-3 rounded ${
          isActive 
            ? 'text-orange-700 dark:text-orange-400 bg-glassl bg-whit dark:bg-glassd md:bg-transparent md:p-0 shadow-xl dark:shadow-2xl md:shadow-none md:dark:shadow-none dark:md:bg-transparent' 
            : 'md:p-0 md:dark:hover:text-orange-400 md:bg-transparent dark:text-white hover:bg-glassl dark:hover:bg-black dark:hover:text-white md:dark:hover:bg-transparent md:dark:bg-transparent dark:border-gray-700 hover:shadow-xl dark:hover:shadow-2xl'
        } hover:bg-gray-100 md:hover:bg-transparent md:shadow-transparent md:bg-transparent`}
        onClick={closeMenu}
      >
        {label}
      </Link>
    </li>
  );
}

export default NavItems;
