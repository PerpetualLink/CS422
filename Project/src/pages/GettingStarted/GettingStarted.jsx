import { useState } from "react";
import { Button, Card, CardContent, Box } from "@mui/material";
import "./GettingStarted.scss";

function GettingStarted() {
    const [showDetails, setShowDetails] = useState(false);

    const summaryText = "For many first-time buyers, understanding how much you can afford is crucial. This involves knowing your savings, the down payment requirements, and ongoing homeownership costs. Buyers should aim for 20% down to avoid private mortgage insurance (PMI).";

    const detailedText = "For many first-time buyers, the first and most important question is \"Can you afford a home?\" Answering this goes beyond simply looking at a home's listing price—it means understanding how much you have saved and whether your finances can comfortably support the upfront and ongoing costs of homeownership. Ideally, buyers should aim to have savings for a down payment, closing costs, and an emergency cushion. A common guideline is to save 20% of the home's purchase price for a down payment to avoid private mortgage insurance (PMI). For example, on a $300,000 home, this would mean about $60,000 for the down payment alone. However, many buyers purchase with 3–10% down, which could mean saving $9,000–$30,000 for the same home. In addition to the down payment, buyers should plan for closing costs (typically 2–5% of the home price)—about $6,000–$15,000 on a $300,000 home—as well as maintaining 3–6 months of emergency savings after the purchase. Understanding these numbers early helps buyers set realistic savings goals and determine whether they are financially ready to begin the homebuying process.";

    return (
        <div className="gettingStartedContainer">
            <div className="leftSection">
                <Card className="contentCard">
                    <CardContent>
                        <h1 className="pageTitle">Can you afford a home?</h1>
                        <p className="summaryText">
                            {summaryText}
                        </p>
                        <Button
                            onClick={() => setShowDetails(!showDetails)}
                            variant="outlined"
                            size="small"
                            className="toggleButton"
                        >
                            {showDetails ? "Show Less" : "See More Details"}
                        </Button>
                        {showDetails && (
                            <p className="detailedText">
                                {detailedText}
                            </p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default GettingStarted;