import { useState } from "react";
import { Button, Typography } from "@mui/material";
import "./app.scss";
import Home from "./pages/Home";
import GettingStarted from "./pages/GettingStarted";
import BuyingOptions from "./pages/BuyingOptions";
import HiddenCosts from "./pages/HiddenCosts";

const pages = [
    { label: "Home", component: Home },
    { label: "Getting Started", component: GettingStarted },
    { label: "Buying Options", component: BuyingOptions },
    { label: "Hidden Costs", component: HiddenCosts },
];

function App() {
    const [currentPage, setCurrentPage] = useState(0);
    const PageComponent = pages[currentPage].component;

    return (
        <div>
            <nav className="navigationBar">
                <Typography
                    className="navLogo"
                    onClick={() => setCurrentPage(0)}
                >
                    Foundation Labs
                </Typography>
                {pages.map((page, index) => (
                    <Button
                        key={page.label}
                        className={`navigationButton ${currentPage === index ? "active" : ""}`}
                        onClick={() => setCurrentPage(index)}
                        variant="contained"
                    >
                        {page.label}
                    </Button>
                ))}
            </nav>
            <div className="pageContent">
                <PageComponent
                    {...(currentPage === 0 ? { onNavigate: setCurrentPage } : {})}
                />
            </div>
        </div>
    );
}

export default App;