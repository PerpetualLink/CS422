import { useState } from "react";
import { Typography } from "@mui/material";
import "./app.scss";
import Home from "./pages/Home";
import GettingStarted from "./pages/GettingStarted";
import BuyingOptions from "./pages/BuyingOptions";
import HiddenCosts from "./pages/HiddenCosts";
import Glossary from "./shared/Glossary";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

const pages = [
    { name: "Home", route: "/CS422/" },
    { name: "Getting Started", route: "/CS422/GettingStarted" },
    { name: "Financing", route: "/CS422/Financing" },
    { name: "Methods of Acquisition", route: "/CS422/MethodsOfAcquisition" },
    { name: "Hidden Costs", route: "/CS422/HiddenCosts" }
];

function App() {
    const [currentRoute, setCurrentRoute] = useState(window.location.pathname);

    return (
        <BrowserRouter>
            <nav className="navigationBar">
                <Typography
                    className="navLogo"
                >
                    Foundation Labs
                </Typography>
                {pages.map((navItem) => (
                    <Link
                        className={`navButton ${(currentRoute === navItem.route) ? "active" : ""}`}
                        onClick={() => setCurrentRoute(navItem.route)}
                        to={navItem.route}
                    >
                        {navItem.name}
                    </Link>
                ))}
            </nav>
            <Glossary />
            
            <Routes>
                <Route path="/CS422/" element={<Home />} />
                <Route path="/CS422/GettingStarted" element={<GettingStarted />} />
                <Route path="/CS422/Financing" element={<BuyingOptions />} />
                <Route path="/CS422/MethodsOfAcquisition" element={<BuyingOptions />} />
                <Route path="/CS422/HiddenCosts" element={<HiddenCosts />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;