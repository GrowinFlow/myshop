import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';

function Main({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div>
      <Header menuOpen={menuOpen} toggleMenu={toggleMenu} closeMenu={closeMenu} />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Main;
