import React from 'react';
import ReactDOM from 'react-dom/client';

import ReactDOMServer from 'react-dom/server';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './lib/context/Auth';
import { GetDataProvider } from './lib/context/GetDataContext';
import { SetDataProvider } from './lib/context/SetDataContext';
import { BrowserRouter as Router } from 'react-router-dom';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
    <Router>

    <AuthProvider>
    <GetDataProvider>
      <SetDataProvider>

    <App />

      </SetDataProvider>
    </GetDataProvider>
    </AuthProvider>
    </Router>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
