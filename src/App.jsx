import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import "./app.scss";
import Home from "./pages/Home";
import GettingStarted from "./pages/GettingStarted";
import BuyingOptions from "./pages/BuyingOptions";
import HiddenCosts from "./pages/HiddenCosts";
import Glossary from "./shared/Glossary";
import { BuyerProfileProvider, useBuyerProfile } from "./shared/BuyerProfileContext";
import { BrowserRouter, Link, Route, Routes, ScrollRestoration } from "react-router-dom";
import { pages } from "./shared/navigation";
import Nav from "./shared/Nav";

function App() {
    return (
    <BuyerProfileProvider>
        <BrowserRouter>
            <Nav />
            <Routes>
                <Route path="/CS422/" element={<div className="pageContainer"> <GettingStarted /> </div>} />
                <Route path="/CS422/Financing" element={<div className="pageContainer"><BuyingOptions /> </div>} />
            </Routes>
        </BrowserRouter>
    </BuyerProfileProvider>
    );
}

export default App;
