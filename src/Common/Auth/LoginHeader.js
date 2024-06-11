import React, { useState } from 'react'
import Logo from '../Components/Logo'
import GlassCard from '../Components/GlassCard'
import ThemeToggle from '../../lib/Theme/ThemeToggle'
import CartIcon from '../../user/Component/PreComonents/CartIcon'
import NavItems from '../Layout/PreComponents/NavItems'
import { Link } from 'react-router-dom'


function LoginHeader() {
  
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
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <Logo color="gray-700" darkColor="white" size="xxl" />
          </Link>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <CartIcon/>
            <ThemeToggle />
           
          </div>
   
        </div>
  </div>
        </div>
      </nav>

      <br /><br /><br /><br />
 

    </>
  )
}

export default LoginHeader