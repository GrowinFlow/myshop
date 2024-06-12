// Header.js
import React, { useState, useContext } from 'react';
import { FaCartShopping } from 'react-icons/fa6';
import ThemeToggle from '../../lib/Theme/ThemeToggle';
import Logo from '../../Common/Components/Logo';
import { AuthContext } from '../../lib/context/LoginContext';
import CartIcon from '../../user/Component/PreComonents/CartIcon'

import { getNavItems } from '../Routes/PrivateRoutes'; // Ensure this path is correct
import NavBar from './PreComponents/NavBar';
import { Link } from 'react-router-dom';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useContext(AuthContext);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // Get the navigation items based on user role
  const navItems = getNavItems(user);

  return (
    <nav className="fixed w-full z-20 top-0 start-0">
      <div className='container px-4 mx-auto mt-0 pt-0'>
        <div className="themeHeader backdrop-blur-sm color-ani px-4 pb-4">
          <div className="flex flex-wrap items-center justify-between p-2 color-ani themeGlassBg rounded-b-xl">
            <span className="flex items-center space-x-3 rtl:space-x-reverse">
              <Logo color="gray-700" darkColor="white" size="xxl" />
            </span>
            <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {user && user.roles === 'user' && (
              <CartIcon/>
            )}
              <ThemeToggle />
              <button
                data-collapse-toggle="navbar-sticky"
                type="button"
                className="inline-flex items-center p-2 md:hidden w-8 h-8 justify-center text-sm rounded-lg hover:bg focus:outline-none focus:ring-2 dark:focus:ring-gray-200 focus:ring-gray-800 hover:shadow-lg themeShadow text-black dark:text-white dark:hover:shadow-md"
                aria-controls="navbar-sticky"
                aria-expanded={menuOpen}
                onClick={toggleMenu}
              >
                <span className="sr-only">Open main menu</span>
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                  <path className="stroke-black dark:stroke-white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                </svg>
              </button>
            </div>
            <div className={`items-center justify-between ${menuOpen ? 'block' : 'hidden'} w-full md:flex md:w-auto md:order-1`} id="navbar-sticky">
              <NavBar routes={navItems} closeMenu={closeMenu} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
