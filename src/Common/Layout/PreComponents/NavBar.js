// NavBar.js
import React from 'react';
import NavItems from './NavItems'; // Ensure this path is correct

const NavBar = React.memo(({ routes }) => {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md p-4">
      <ul className="flex space-x-4">
        {routes.map((route, index) => (
          <NavItems
            key={index}
            label={route.label}
            link={route.path}
            closeMenu={() => {}}
          />
        ))}
      </ul>
    </nav>
  );
});

export default NavBar;
