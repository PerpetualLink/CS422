import { useState } from "react";
import { Button, Typography } from "@mui/material";
import "./app.scss";
import Home from "./pages/Home";
import GettingStarted from "./pages/GettingStarted";
import BuyingOptions from "./pages/BuyingOptions";
import HiddenCosts from "./pages/HiddenCosts";

function App () {
    const [currentPage, setCurrentPage] = useState(0);
    return (
        <div>
            <div className={"navigationBar"}>
                <Typography
                    className={"navLogo"}
                    onClick={() => setCurrentPage(0)}
                >
                    {"Foundation Labs"}
                </Typography>
                <Button
                    className={`navigationButton ${currentPage === 0 ? "active" : ""}`}
                    onClick={() => setCurrentPage(0)}
                    variant={"contained"}
                >
                    {"Home"}
                </Button>
                <Button
                    className={`navigationButton ${currentPage === 1 ? "active" : ""}`}
                    onClick={() => setCurrentPage(1)}
                    variant={"contained"}
                >
                    {"Getting Started"}
                </Button>
                <Button
                    className={`navigationButton ${currentPage === 2 ? "active" : ""}`}
                    onClick={() => setCurrentPage(2)}
                    variant={"contained"}
                >
                    {"Buying Options"}
                </Button>
                <Button
                    className={`navigationButton ${currentPage === 3 ? "active" : ""}`}
                    onClick={() => setCurrentPage(3)}
                    variant={"contained"}
                >
                    {"Hidden Costs"}
                </Button>
            </div>
            <div className={"pageContent"}>
                {currentPage === 0 && (
                    <Home onNavigate={setCurrentPage} />
                )}
                {currentPage === 1 && (
                    <GettingStarted />
                )}
                {currentPage === 2 && (
                    <BuyingOptions />
                )}
                {currentPage === 3 && (
                    <HiddenCosts />
                )}
            </div>
        </div>
    );
}

export default App;