import { HomePage } from "./webpages";
import { Profile } from "./webpages/profile";
import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
// import navBar from "./components/navBar";

export const App = () => {

  return (
    <>
    {/* <HomePage /> */}
    <Profile />
    </>
  );
}