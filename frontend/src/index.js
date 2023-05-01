import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import theme from "./theme";
import { CartProvider } from "./CartContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CartProvider>
    <ChakraProvider them={theme}>
      <App />
    </ChakraProvider>
  </CartProvider>
);
