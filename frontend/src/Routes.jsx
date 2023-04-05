import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage, Dashboard } from "./webpages";

const AppRoutes = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" component={<HomePage />}  />
                <Route path="/dashboard" element={<Dashboard />}  />
            </Routes>
        </BrowserRouter>
    );
}
export default AppRoutes;
