import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './lib/context/LoginContext';
import PrivateRoutes from './Common/Routes/PrivateRoutes';
import LoginPage from './Common/Auth/LoginPage';
import Main from './Common/Layout/Main';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Main>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={<PrivateRoutes />} />
          </Routes>
        </Main>
      </AuthProvider>
    </Router>
  );
}

export default App;
