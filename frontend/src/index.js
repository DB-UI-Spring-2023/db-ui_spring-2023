import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import AppRoutes from './Routes';
import { BrowserRouter, Route, Routes } from "react-router-dom";


ReactDOM.createRoot(
document.getElementById('root')).render(
  <ChakraProvider>
    <BrowserRouter>
      <App>
        <AppRoutes />
      </App>
    </BrowserRouter>
  </ChakraProvider>
);
