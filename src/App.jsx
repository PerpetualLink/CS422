import { useState } from "react";
import { Typography } from "@mui/material";
import "./app.scss";
import Home from "./pages/Home";
import GettingStarted from "./pages/GettingStarted";
import BuyingOptions from "./pages/BuyingOptions";
import HiddenCosts from "./pages/HiddenCosts";
import Glossary from "./shared/Glossary";
import { BuyerProfileProvider } from "./shared/BuyerProfileContext";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { pages } from "./shared/navigation";

function App() {
    const [currentRoute, setCurrentRoute] = useState(window.location.pathname);

    return (
    <BuyerProfileProvider>
        <BrowserRouter clasName={"appContainer"}>
            <nav className="navigationBar">
                <Typography
                    className="navLogo"
                >
                    Foundation Labs
                </Typography>
                {pages.map((navItem) => (
                    <Link
                        className={`navButton ${(currentRoute === navItem.route) ? "active" : ""}`}
                        key={navItem.name}
                        onClick={() => setCurrentRoute(navItem.route)}
                        to={navItem.route}
                    >
                        {navItem.name}
                    </Link>
                ))}
                <Glossary />
            </nav>
            
            <Routes>
                <Route path="/CS422/" element={<div className="pageContainer"><Home /> </div>} />
                <Route path="/CS422/GettingStarted" element={<div className="pageContainer"> <GettingStarted /> </div>} />
                <Route path="/CS422/Financing" element={<div className="pageContainer"><BuyingOptions /> </div>} />
                <Route path="/CS422/HiddenCosts" element={<div className="pageContainer"><HiddenCosts /> </div>} />
            </Routes>
        </BrowserRouter>
    </BuyerProfileProvider>
    );
}

export default App;
