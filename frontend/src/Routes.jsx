import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage, Dashboard } from "./webpages";

export const Router = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} exact />
                <Route path="/dashboard" element={<Dashboard />} exact />
            </Routes>
        </BrowserRouter>
    );
}

