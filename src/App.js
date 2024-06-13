// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './lib/context/LoginContext';
import PrivateRoutes from './Common/Routes/PrivateRoutes';
import LoginPage from './Common/Auth/LoginPage';
import Main from './Common/Layout/Main';
import Header from './Common/Layout/Header';

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
    <div className="bg font-mono">

    <Router>
      <AuthProvider>
      <Header menuOpen={menuOpen} toggleMenu={toggleMenu} closeMenu={closeMenu} />

        <Main>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<PrivateRoutes />} /> {/* Catch all route */}
          </Routes>
        </Main>

      </AuthProvider>
    </Router>
    </div>
    </>
  );
}

export default App;
