// Header.js
import React, { useState, useContext } from 'react';
import { FaCartShopping } from 'react-icons/fa6';
import ThemeToggle from '../../../lib/Theme/ThemeToggle';
import Logo from '../../Common/CustomMIniComponents/Logo';

import { getNavItems } from '../../../Routes/PrivateRoutes'; // Ensure this path is correct
import NavBar from './PreComponents/NavBar';


function Header() {
  const [menuOpen, setMenuOpen] = useState(false);


  const closeMenu = () => {
    setMenuOpen(false);
  };

const navItems = getNavItems()
  return (
    <nav className="sticky top-0 w-full z-20 start-0 ">
      <div className='w-full px-4 mx-auto mt-0 pt-0 '>
        <div className="themeHeader backdrop-blur-sm color-ani px-4 pb-4 flex flex-col gap-1">
 
                <div className="flex flex-nowrap items-center justify-between p-2 color-ani themeGlassBg rounded-b-xl overflow-hidden">
                <span>
              <Logo color="gray-700" darkColor="white" size="xl" />
            </span>
 
              <ThemeToggle />
          </div>
          <div className="flex overflow-x-auto themeGlassBg rounded-xl justify-center items-center px-12 md:px-6 lg:px-0">
               
               <NavBar routes={navItems} closeMenu={closeMenu} />
           </div>




        </div>
      </div>
    </nav>
  );
}

export default Header;
