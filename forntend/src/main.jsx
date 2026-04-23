import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from './context/AppContext.jsx';


const root = createRoot(document.getElementById('root'));

root.render(
 <AppProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </AppProvider>
 
);