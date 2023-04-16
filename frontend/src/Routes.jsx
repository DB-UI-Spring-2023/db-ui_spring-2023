import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard } from "./components/Dashboard";

export const Router = () => {

    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Dashboard />} exact />
            {/* <Route path="/home" element={<Dashboard />} exact /> */}
        </Routes>
        </BrowserRouter>
    );
}