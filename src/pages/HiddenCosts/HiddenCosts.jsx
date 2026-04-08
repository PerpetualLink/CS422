import { useState } from "react";
import { Button, Box, Typography, Card, CardContent} from "@mui/material";

function HiddenCosts() {
    const [activeSection, setActiveSection] = useState("mostCommon");

    const costData = {
        mostCommon: {
            title: "Most Common",
            items: [
                {
                    title: "Closing Costs",
                    description: "Includes lender fees, underwriting, title insurance, attorney fees, etc. Often 2–5% of the home price.",
                    estimate: "$6,000 – $20,000 on a $300k home"
                },
                {
                    title: "Home Inspection",
                    description: "Paid before closing to evaluate the condition of the property.",
                    estimate: "$300 – $600"
                },
                {
                    title: "Appraisal Fee",
                    description: "Required by the lender to confirm the home's value.",
                    estimate: "$400 – $800"
                },
                {
                    title: "Property Taxes",
                    description: "Often due upfront at closing to seed your escrow account.",
                    estimate: "$1000 – $4000 upfront depending on location"
                },
                {
                    title: "Homeowners Insurance",
                    description: "Typically paid in advance at closing.",
                    estimate: "$800 – $2,000"
                },
                {
                    title: "Earnest Money Deposit",
                    description: "Good faith deposit submitted with the offer (credited back at closing).",
                    estimate: "1% – 3% of home price ($3,000 – $9,000 for a $300k home)"
                },
            ]
        },
        common: {
            title: "Common",
            items: [
                {
                    title: "Survey Fees",
                    description: "A property boundary survey required by some lenders or recommended for older properties.",
                    estimate: "$300 – $1000"
                },
                {
                    title: "HOA / Condo Fees",
                    description: "Monthly or annual dues if the property is part of an HOA.",
                    estimate: "$100 – $500 per month"
                },
                {
                    title: "Rate Lock Fees",
                    description: "Some lenders charge a fee to lock in your interest rate for a set time.",
                    estimate: "$0 – $500 depending on lender"
                },
                {
                    title: "Moving Costs",
                    description: "Movers, truck rental, packing supplies etc. Involved in moving to the new house.",
                    estimate: "$500 – $3,000"
                },
                {
                    title: "Needed Repairs",
                    description: "Minor issues identified during the inspection that you choose to fix after closing.",
                    estimate: "$500 – $5,000"
                },
                {
                    title: "Utility Setup / Transfer",
                    description: "Water, electric, gas, internet, etc. Usually a pretty streamlined process.",
                    estimate: "$50 – $300"
                },
            ]
        },
        leastCommon: {
            title: "Least Common",
            items: [
                {
                    title: "Private Road Maintenance Fees",
                    description: "Shared cost for maintaining private roads in some neighborhoods.",
                    estimate: "$200 – $1000 per year"
                },
                {
                    title: "Septic System",
                    description: "Inspection or replacement may be needed for homes not connected to city sewer systems.",
                    estimate: "Inspection: $300-$600 | Replacement: $500-$20,000"
                },
                {
                    title: "Well Water Testing",
                    description: "Required in rural areas with a private well or shared aquifer.",
                    estimate: "$100 – $400"
                },
                {
                    title: "Flood Zone Insurance",
                    description: "Mandatory if the property is in a FEMA flood zone.",
                    estimate: "$700 – $3000 per year"
                },
                {
                    title: "Historic District Compliance",
                    description: "Repairs or renovations must follow strict guidelines in historic areas.",
                    estimate: "$1,000 – $10,000+"
                },
                {
                    title: "Special Assessments",
                    description: "One-time charges from HOAs or municipalities for major projects.",
                    estimate: "$500 – $10,000+"
                },
            ]
        }
    };

    const currentSection = costData[activeSection];

    return (
        <Box sx={{ display: "flex", padding: "20px", maxWidth: "1400px", margin: "0 auto", gap: 3 }}>
            {/* Left Sidebar */}
            <Box sx={{ 
                width: "200px", 
                flexShrink: 0,
                position: "sticky",
                top: 20,
                alignSelf: "flex-start"
            }}>
                <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: "bold", color: "black" }}>
                    Hidden Costs
                </Typography>
                
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                    {Object.keys(costData).map((section) => (
                        <Button
                            key={section}
                            fullWidth
                            variant={activeSection === section ? "contained" : "outlined"}
                            onClick={() => setActiveSection(section)}
                            sx={{
                                justifyContent: "flex-start",
                                fontWeight: "bold",
                                textTransform: "none",
                                fontSize: "1rem",
                                py: 1
                            }}
                        >
                            {section === "mostCommon" ? "Most Common" : 
                             section === "common" ? "Common" : "Least Common"}
                        </Button>
                    ))}
                </Box>
            </Box>

            {/* Right Content */}
            <Box sx={{ flex: 1 }}>
                <Box sx={{ 
                    mb: 3, 
                    p: 3, 
                    backgroundColor: "#e8f5e9", 
                    borderRadius: 2,
                    borderLeft: "4px solid #43A047"
                }}>
                    <Typography variant="subtitle1" sx={{ 
                        fontWeight: "bold", 
                        color: "#43A047", 
                        mb: 1,
                        textTransform: "uppercase",
                        letterSpacing: "1px"
                    }}>
                        What are Hidden Costs?
                    </Typography>
                    <Typography variant="body1" sx={{ 
                        color: "#333", 
                        lineHeight: 1.6 
                    }}>
                        Hidden costs are expenses that aren't included in the purchase price of a home but are required to complete the transaction or maintain the property. These can include closing costs, inspection fees, insurance, property taxes, and unexpected repairs. Being aware of these costs helps you budget more accurately and avoid financial surprises during your home buying journey.
                    </Typography>
                </Box>
                <Box sx={{ p: 3, backgroundColor: "#f5f5f5", borderRadius: 2 }}>
                    <Typography variant="h4" gutterBottom sx={{ color: "black", fontWeight: "bold", mb: 3 }}>
                        {currentSection.title}
                    </Typography>
                    
                    <Box sx={{ 
                        display: "grid", 
                        gridTemplateColumns: "repeat(3, 1fr)", 
                        gap: 2
                    }}>
                        {currentSection.items.map((item, index) => (
                            <Card key={index} sx={{ height: "auto", display: "flex", flexDirection: "column" }}>
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: "bold", color: "black" }}>
                                        {item.title}
                                    </Typography>
                                    <Typography variant="body2" sx={{ mb: 2, color: "black" }}>
                                        {item.description}
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontStyle: "italic", fontWeight: "medium", color: "black" }}>
                                        <strong>EST:</strong> {item.estimate}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}


export default HiddenCosts;