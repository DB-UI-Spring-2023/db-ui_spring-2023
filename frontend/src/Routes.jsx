import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard } from "./components/Dashboard";
import { Listings } from "./components/Listings";
import { Settings } from "./components/Settings";

export const Router = () => {

    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Dashboard />} exact />
            <Route path="/listings" element={<Listings />} exact />
            <Route path="/settings" element={<Settings />} exact />
        </Routes>
        </BrowserRouter>
    );
}