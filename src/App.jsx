import { useState } from "react";
import { Button } from "@mui/material";
import "./app.scss";
import Home from "./pages/Home";
import GettingStarted from "./pages/GettingStarted";
import BuyingOptions from "./pages/BuyingOptions";
import HiddenCosts from "./pages/HiddenCosts";

function App () {
    const [currentPage, setCurrentPage] = useState(0);
    return (
        <div>
            <div>
                <Button onClick={() => setCurrentPage(0)}>{"Home"}</Button>
                <Button onClick={() => setCurrentPage(1)}>{"Getting Started"}</Button>
                <Button onClick={() => setCurrentPage(2)}>{"Buying Options"}</Button>
                <Button onClick={() => setCurrentPage(3)}>{"Hidden Costs"}</Button>
            </div>
            {currentPage === 0 && (
                <Home />
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
    );
}

export default App;