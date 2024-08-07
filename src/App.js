// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoutes from './Common/Routes/PrivateRoutes';
import LoginPage from './Common/Auth/LoginPage';
import RegisterPage from './Common/Auth/RegisterPage';

import Main from './Common/Layout/Main';
import Header from './Common/Layout/Header';
import Footer from './Common/Layout/Footer';
import CustomToast from './Common/Components/Toast';

function App() {
    const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
    <div className="bg font-pop md:font-satoshi 
">


      <Header menuOpen={menuOpen} toggleMenu={toggleMenu} closeMenu={closeMenu} />

        <Main>

        <CustomToast/>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<PrivateRoutes />} /> 
          </Routes>
<Footer />
        </Main>
    
    </div>
    </>   

  );
}

export default App;
