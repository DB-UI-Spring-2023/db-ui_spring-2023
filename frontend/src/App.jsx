import { HomePage} from "./webpages";
import { Profile } from "./webpages/profile";
import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { useState } from "react";
import bookCart from "./components/bookCart";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Search } from "./webpages";
import { BookList } from "./components";

export const App = () => {
  return (
    <>
    {/* <HomePage /> */}
    <Profile />
    {/* <Search /> */}
    {/* <BookList/>
    <BookList/> */}
    {/* <BookList/>
    <BookList/>

    <BookList/> */}
    {/* <bookCart /> */}
    </>
  );
} 