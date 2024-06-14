// NavBar.js
import React from 'react';
import NavItems from './NavItems'; // Ensure this path is correct

const NavBar = React.memo(({ routes, closeMenu }) => {
  return (
    <nav>
        <ul className="block md:flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-[rgba(255,255,255,0.4)] dark:bg-[rgba(0,0,0,0.5)] md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent md:dark:bg-transparent dark:border-gray-700 gap-2 flex-nowrap">
          
        {routes.map((route, index) => (
          <NavItems
            key={index}
            label={route.label}
            link={route.path}
            closeMenu={closeMenu}
          />
        ))}
      </ul>
    </nav>
  );
});

export default NavBar;

