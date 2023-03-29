import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage, Dashboard } from "./webpages";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
          <Route path="/" element={<HomePage />} exact />
          <Route path="/dashboard" element={<Dashboard />} exact />
    </Routes>
  </BrowserRouter>
);
