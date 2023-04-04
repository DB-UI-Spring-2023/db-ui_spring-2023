import { HomePage } from "./webpages";
import { Profile } from "./webpages/profile";
import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Rate from "./components/starRateSystem/Rate";
import { useState } from "react";
// import navBar from "./components/navBar";

export const App = () => {
  const [rating, setRating] = useState(0);
  return (
    <>
    {/* <HomePage /> */}
    {/* <Profile /> */}
    {/* <Rate rating={rating} onRating={(rate) => setRating(rate)}/> */}
    <>
        <div>
            <h2>Rate Me</h2>
            <p>Rating component</p>
            <Rate rating={rating} onRating={(rate) => setRating(rate)}/>
            <p>Rating: {rating}</p>
        </div>
        </>
    </>
  );
} 