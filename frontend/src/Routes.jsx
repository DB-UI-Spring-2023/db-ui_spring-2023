import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage, Dashboard, Listings, ProfilePage } from "./webpages";
import SellerProfilePage from "./webpages/SellerPofilePage"

export const Router = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} exact />
                <Route path="/dashboard" element={<Dashboard />} exact />
                <Route path="/listings" element={<Listings />} exact />
                <Route path="/profile" element={<ProfilePage />} exact />
                <Route path="/seller-profile/:email" element={<SellerProfilePage />} exact />
            </Routes>
        </BrowserRouter>
    );
}

