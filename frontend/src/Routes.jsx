import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage, Dashboard, Listings, ProfilePage, Settings } from "./webpages";

export const Router = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} exact />
                <Route path="/dashboard" element={<Dashboard />} exact />
                <Route path="/listings" element={<Listings />} exact />
                <Route path="/profile" element={<ProfilePage />} exact />
                <Route path="/profile/:email" element={<ProfilePage />} exact />
                <Route path="/settings" element={<Settings />} exact />
            </Routes>
        </BrowserRouter>
    );
}

