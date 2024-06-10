import React, { useState } from 'react';
import Logo from '../Component/Logo';
import ThemeToggle from '../Theme/ThemeToggle';
import NavItems from './PreComponents/NavItems';
import CartIcon from '../Component/PreComonents/CartIcon';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed w-full z-20 top-0 start-0">
        <div className='container px-4 mx-auto mt-0 pt-0'>

  <div className="themeHeader backdrop-blur-sm color-ani px-4 pb-4">
        <div className=" flex flex-wrap items-center justify-between p-2 color-ani themeGlassBg rounded-b-xl">
          <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
            <Logo color="gray-700" darkColor="white" size="xxl" />
          </a>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <CartIcon/>
            <ThemeToggle />
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 md:hidden  w-8 h-8 justify-center text-sm rounded-lg hover:bg focus:outline-none  focus:ring-2 dark:focus:ring-gray-200  focus:ring-gray-800 hover:shadow-lg themeShadow text-black dark:text-white dark:hover:shadow-md"
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
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-[rgba(255,255,255,0.4)] dark:bg-[rgba(0,0,0,0.5)] md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent md:dark:bg-transparent dark:border-gray-700 gap-2">
              <NavItems label="Home" link="/" closeMenu={closeMenu} />
              <NavItems label="Shop" link="/shop" closeMenu={closeMenu} />
              <NavItems label="Cart" link="/cart" closeMenu={closeMenu} />
              <NavItems label="Contact" link="/contact" closeMenu={closeMenu} />
            </ul>
          </div>
        </div>
  </div>
        </div>
      </nav>
      <br /><br /><br /><br />
    </>
  );
}

export default Header;
