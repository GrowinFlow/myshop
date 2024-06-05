import React from 'react'
import Logo from './PreComponents/Logo'
import NavItems from './PreComponents/NavItems'
import ThemeToggle from '../Theme/ThemeToggle'
import { FaMarsAndVenus } from 'react-icons/fa6'


function Header() {
  return (
    <>


<nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
  <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">

     <Logo color="gray-700" darkColor="white" size="xxl"/>

  </a>
  <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
      <ThemeToggle />
      <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
       <FaMarsAndVenus/>
    </button>
  </div>
  <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">

  <NavItems label="Home" link="/"/>
  <NavItems label="Shop" link="/shop"/>
  <NavItems label="Cart" link="/cart"/>
  <NavItems label="Contact" link="/contact"/>
    </ul>
  </div>
  </div>
</nav>
<br /><br /><br />

    </>
  )
}

export default Header