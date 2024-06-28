// Header.js
import React, { useState, useContext } from 'react';
import { FaCartShopping } from 'react-icons/fa6';
import ThemeToggle from '../../lib/Theme/ThemeToggle';
import Logo from '../../Common/Components/Logo';
import { AuthContext } from '../../lib/context/Auth';
import CartIcon from '../../user/Component/PreComonents/CartIcon'

import { getNavItems } from '../Routes/PrivateRoutes'; // Ensure this path is correct
import NavBar from './PreComponents/NavBar';
import { Link } from 'react-router-dom';
import SearchBar from '../Components/SearchBar';
import UserProfileDropdown from './PreComponents/UserProfileDropdown';
import Button from '../Components/Button';
import { FaSignInAlt } from 'react-icons/fa';


function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useContext(AuthContext);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };
  const handleSearch = (query) => {
    // Perform search functionality here
    console.log('Search query:', query);
  };
  // Get the navigation items based on user role
  const navItems = getNavItems(user);

  return (
    <nav className="fixed w-full z-20 top-0 start-0 ">
      <div className='container px-4 mx-auto mt-0 pt-0'>
        <div className="themeHeader backdrop-blur-sm color-ani px-4 pb-4 flex flex-col gap-1">

          {/* first */}
          <div className="grid grid-cols-6 md:flex flex-nowrap items-center justify-between px-2 color-ani themeGlassBg rounded-b-xl overflow-hidden">

            <div className="hidden md:flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse col-span-2 justify-end">

              <ThemeToggle />
              {user && (user.roles === 'client' || user.roles === 'manager' || user.roles === 'admin') ? (
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
              ) : null}


            </div>
            <div className="hidden md:flex">
              <NavBar routes={navItems} closeMenu={closeMenu} />
            </div>
          </div>


          {/* second  */}
          <div className="grid grid-cols-9  md:grid-cols-8 grid-rows-[_,_1fr] md:grid-rows-1 items-center justify-between p-2 color-ani themeGlassBg rounded-xl gap-2 md:gap-4">

            <span className="flex items-center col-span-2 md:col-span-1 lg:">
              <Logo color="gray-700" darkColor="white" size="xl" />
            </span>

            <div className={`items-center justify-between ${menuOpen ? 'block' : 'block'} w-full md:flex md:w-auto col-span-4 md:col-span-5 ml-4`} id="navbar-sticky">
              <SearchBar styleClass="md:h-auto h-10" onSearch={handleSearch} placeholer="Its Not Work"/>
              
            </div>
            <div className="col-span-1 items-center justify-center themeText hidden md:flex">
            {user && (user.roles === 'client') ? ( <FaCartShopping /> ): " "}
            </div>
   
       
            <div className="md:hidden flex col-span-2 justify-evenly">
  
              <ThemeToggle />
              {user && (user.roles === 'client' || user.roles === 'manager' || user.roles === 'admin') ? (
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
              ) : null}


            </div>

            <div className={` items-center justify-between ${menuOpen ? 'block' : 'hidden'} w-full md:hidden col-span-8`} id="navbar-sticky">
              <NavBar routes={navItems} closeMenu={closeMenu} />
            </div>

            <div className="col-span-1 flex items-center justify-end overflow-hidden order-1">
              {user?
              <UserProfileDropdown />
              :
              <>
              <span className='themeText p-2 bg rounded-xl'>
<Button link="register" icon={<FaSignInAlt/>} styleClass="w-auto"/>
              </span>
              </>
              }
            </div>




          </div>


        </div>
      </div>
    </nav>
  );
}

export default Header;
