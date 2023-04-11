import { HomePage } from "./webpages";
import { Profile } from "./webpages/profile";
import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { useState } from "react";
// import navBar from "./components/navBar";
import bookCart from "./components/bookCart";

export const App = () => {
  const [rating, setRating] = useState(0);
  return (
    <>
    {/* <HomePage /> */}
    <Profile />
    {/* <bookCart /> */}
    </>
  );
} 