import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage, Dashboard } from "./webpages";
import { Listings, Settings } from "../src/components";

export const Router = () => {

    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePage />} exact />
            <Route path="/dashboard" element={<Dashboard />} exact />
            <Route path="/listings" element={<Listings />} exact />
            <Route path="/settings" element={<Settings />} exact />
        </Routes>
        </BrowserRouter>
    );
}

