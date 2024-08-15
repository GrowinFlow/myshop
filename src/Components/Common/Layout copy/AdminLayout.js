import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import Header from './Header'
import Footer from './Footer'
import Main from './Main'

import PrivateRoutes from '../../../Routes/PrivateRoutes';
import LoginPage from '../../../Routes/CommonRoutes/Auth/LoginPage';
import RegisterPage from '../../../Routes/CommonRoutes/Auth/RegisterPage'; 
RegisterPage
function AdminLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  
  const toggleMenu = () => {
      setMenuOpen(!menuOpen);
  };
  
    const closeMenu = () => {
      setMenuOpen(false);
    };
  return (
      <>
 <Header menuOpen={menuOpen} toggleMenu={toggleMenu} closeMenu={closeMenu} />

<Main>

  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="*" element={<PrivateRoutes />} /> 
  </Routes>
  
</Main>
<Footer />
    </>
  )
}

export default AdminLayout