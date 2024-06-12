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
        className={`block py-2 px-3 rounded ${
          isActive
            ? 'text-orange-700 dark:text-orange-400 bg-glassl dark:bg-glassd shadow-xl dark:shadow-2xl'
            : 'dark:text-white hover:bg-glassl dark:hover:bg-black dark:hover:text-white'
        }`}
        onClick={closeMenu}
      >
        {label}
      </Link>
    </li>
  );
});

export default NavItems;
