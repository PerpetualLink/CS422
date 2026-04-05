import { useState } from "react";
import { Button, Box, Typography, Card, CardContent} from "@mui/material";

function HiddenCosts() {
    const [activeSection, setActiveSection] = useState("mostCommon");

    const sections = {
        mostCommon: (
            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}>
                {/* Closing Costs */}
                <Card sx={{ height: "auto", display: "flex", flexDirection: "column" }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: "bold", color: "black" }}>
                            Closing Costs
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 2, color: "black" }}>
                            Includes lender fees, underwriting, title insurance, attorney fees, etc. Often 2–5% of the home price.
                        </Typography>
                        <Typography variant="body2" sx={{ fontStyle: "italic", fontWeight: "medium", color: "black" }}>
                            <strong>EST:</strong> $6,000 – $20,000 on a $300k home
                        </Typography>
                    </CardContent>
                </Card>

                {/* Home Inspection */}
                <Card sx={{ height: "auto", display: "flex", flexDirection: "column" }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: "bold", color: "black" }}>
                            Home Inspection
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 2, color: "black" }}>
                            Paid before closing to evaluate the condition of the property.
                        </Typography>
                        <Typography variant="body2" sx={{ fontStyle: "italic", fontWeight: "medium", color: "black" }}>
                            <strong>EST:</strong> $300 – $600
                        </Typography>
                    </CardContent>
                </Card>

                {/* Appraisal Fee */}
                <Card sx={{ height: "auto", display: "flex", flexDirection: "column" }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: "bold", color: "black" }}>
                            Appraisal Fee
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 2, color: "black" }}>
                            Required by the lender to confirm the home's value.
                        </Typography>
                        <Typography variant="body2" sx={{ fontStyle: "italic", fontWeight: "medium", color: "black" }}>
                            <strong>EST:</strong> $400 – $800
                        </Typography>
                    </CardContent>
                </Card>

                {/* Property Taxes */}
                <Card sx={{ height: "auto", display: "flex", flexDirection: "column" }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: "bold", color: "black" }}>
                            Property Taxes
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 2, color: "black" }}>
                            Often due upfront at closing to seed your escrow account.
                        </Typography>
                        <Typography variant="body2" sx={{ fontStyle: "italic", fontWeight: "medium", color: "black" }}>
                            <strong>EST:</strong> $1000 – $4000 upfront depending on location
                        </Typography>
                    </CardContent>
                </Card>

                {/* Homeowners Insurance */}
                <Card sx={{ height: "auto", display: "flex", flexDirection: "column" }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: "bold", color: "black" }}>
                            Homeowners Insurance
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 2, color: "black" }}>
                            Typically paid in advance at closing.
                        </Typography>
                        <Typography variant="body2" sx={{ fontStyle: "italic", fontWeight: "medium", color: "black" }}>
                            <strong>EST:</strong> $800 – $2,000
                        </Typography>
                    </CardContent>
                </Card>

                {/* Earnest Money Deposit */}
                <Card sx={{ height: "auto", display: "flex", flexDirection: "column" }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: "bold", color: "black" }}>
                            Earnest Money Deposit
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 2, color: "black" }}>
                            Good faith deposit submitted with the offer (credited back at closing).
                        </Typography>
                        <Typography variant="body2" sx={{ fontStyle: "italic", fontWeight: "medium", color: "black" }}>
                            <strong>EST:</strong> 1% – 3% of home price ($3,000 – $9,000 for a $300k home)
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        ),
        common: (
            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}>
                {/* Survey Fees */}
                <Card sx={{ height: "auto", display: "flex", flexDirection: "column" }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: "bold", color: "black" }}>
                            Survey Fees
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 2, color: "black" }}>
                            A property boundary survey required by some lenders or recommended for older properties.
                        </Typography>
                        <Typography variant="body2" sx={{ fontStyle: "italic", fontWeight: "medium", color: "black" }}>
                            <strong>EST:</strong> $300 – $1000
                        </Typography>
                    </CardContent>
                </Card>

                {/* HOA / Condo Fees */}
                <Card sx={{ height: "auto", display: "flex", flexDirection: "column" }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: "bold", color: "black" }}>
                            HOA / Condo Fees
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 2, color: "black" }}>
                            Monthly or annual dues if the property is part of an HOA.
                        </Typography>
                        <Typography variant="body2" sx={{ fontStyle: "italic", fontWeight: "medium", color: "black" }}>
                            <strong>EST:</strong> $100 – $500 per month
                        </Typography>
                    </CardContent>
                </Card>

                {/* Rate Lock Fees */}
                <Card sx={{ height: "auto", display: "flex", flexDirection: "column" }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: "bold", color: "black" }}>
                            Rate Lock Fees
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 2, color: "black" }}>
                            Some lenders charge a fee to lock in your interest rate for a set time.
                        </Typography>
                        <Typography variant="body2" sx={{ fontStyle: "italic", fontWeight: "medium", color: "black" }}>
                            <strong>EST:</strong> $0 – $500 depending on lender
                        </Typography>
                    </CardContent>
                </Card>

                {/* Moving Costs */}
                <Card sx={{ height: "auto", display: "flex", flexDirection: "column" }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: "bold", color: "black" }}>
                            Moving Costs
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 2, color: "black" }}>
                            Movers, truck rental, packing supplies etc. Involved in moving to the new house.
                        </Typography>
                        <Typography variant="body2" sx={{ fontStyle: "italic", fontWeight: "medium", color: "black" }}>
                            <strong>EST:</strong> $500 – $3,000
                        </Typography>
                    </CardContent>
                </Card>

                {/* Needed Repairs */}
                <Card sx={{ height: "auto", display: "flex", flexDirection: "column" }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: "bold", color: "black" }}>
                            Needed Repairs
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 2, color: "black" }}>
                            Minor issues identified during the inspection that you choose to fix after closing.
                        </Typography>
                        <Typography variant="body2" sx={{ fontStyle: "italic", fontWeight: "medium", color: "black" }}>
                            <strong>EST:</strong> $500 – $5,000
                        </Typography>
                    </CardContent>
                </Card>

                {/* Utility Setup / Transfer */}
                <Card sx={{ height: "auto", display: "flex", flexDirection: "column" }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: "bold", color: "black" }}>
                            Utility Setup / Transfer
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 2, color: "black" }}>
                            Water, electric, gas, internet, etc. Usually a pretty streamlined process.
                        </Typography>
                        <Typography variant="body2" sx={{ fontStyle: "italic", fontWeight: "medium", color: "black" }}>
                            <strong>EST:</strong> $50 – $300
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        ),
        leastCommon: (
            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}>
                {/* Private Road Maintenance Fees */}
                <Card sx={{ height: "auto", display: "flex", flexDirection: "column" }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: "bold", color: "black" }}>
                            Private Road Maintenance Fees
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 2, color: "black" }}>
                            Shared cost for maintaining private roads in some neighborhoods.
                        </Typography>
                        <Typography variant="body2" sx={{ fontStyle: "italic", fontWeight: "medium", color: "black" }}>
                            <strong>EST:</strong> $200 – $1000 per year
                        </Typography>
                    </CardContent>
                </Card>

                {/* Septic System */}
                <Card sx={{ height: "auto", display: "flex", flexDirection: "column" }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: "bold", color: "black" }}>
                            Septic System
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 2, color: "black" }}>
                            Inspection or replacement may be needed for homes not connected to city sewer systems.
                        </Typography>
                        <Typography variant="body2" sx={{ fontStyle: "italic", fontWeight: "medium", color: "black" }}>
                            <strong>EST:</strong> Inspection: $300-$600 | Replacement: $500-$20,000
                        </Typography>
                    </CardContent>
                </Card>

                {/* Well Water Testing */}
                <Card sx={{ height: "auto", display: "flex", flexDirection: "column" }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: "bold", color: "black" }}>
                            Well Water Testing
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 2, color: "black" }}>
                            Required in rural areas with a private well or shared aquifer.
                        </Typography>
                        <Typography variant="body2" sx={{ fontStyle: "italic", fontWeight: "medium", color: "black" }}>
                            <strong>EST:</strong> $100 – $400
                        </Typography>
                    </CardContent>
                </Card>

                {/* Flood Zone Insurance */}
                <Card sx={{ height: "auto", display: "flex", flexDirection: "column" }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: "bold", color: "black" }}>
                            Flood Zone Insurance
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 2, color: "black" }}>
                            Mandatory if the property is in a FEMA flood zone.
                        </Typography>
                        <Typography variant="body2" sx={{ fontStyle: "italic", fontWeight: "medium", color: "black" }}>
                            <strong>EST:</strong> $700 – $3000 per year
                        </Typography>
                    </CardContent>
                </Card>

                {/* Historic District Compliance */}
                <Card sx={{ height: "auto", display: "flex", flexDirection: "column" }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: "bold", color: "black" }}>
                            Historic District Compliance
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 2, color: "black" }}>
                            Repairs or renovations must follow strict guidelines in historic areas.
                        </Typography>
                        <Typography variant="body2" sx={{ fontStyle: "italic", fontWeight: "medium", color: "black" }}>
                            <strong>EST:</strong> $1,000 – $10,000+
                        </Typography>
                    </CardContent>
                </Card>

                {/* Special Assessments */}
                <Card sx={{ height: "auto", display: "flex", flexDirection: "column" }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: "bold", color: "black" }}>
                            Special Assessments
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 2, color: "black" }}>
                            One-time charges from HOAs or municipalities for major projects.
                        </Typography>
                        <Typography variant="body2" sx={{ fontStyle: "italic", fontWeight: "medium", color: "black" }}>
                            <strong>EST:</strong> $500 – $10,000+
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        )
    };

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
                    <Button
                        fullWidth
                        variant={activeSection === "mostCommon" ? "contained" : "outlined"}
                        onClick={() => setActiveSection("mostCommon")}
                        sx={{
                            justifyContent: "flex-start",
                            fontWeight: "bold",
                            textTransform: "none",
                            fontSize: "1rem",
                            py: 1
                        }}
                    >
                        Most Common
                    </Button>
                    
                    <Button
                        fullWidth
                        variant={activeSection === "common" ? "contained" : "outlined"}
                        onClick={() => setActiveSection("common")}
                        sx={{
                            justifyContent: "flex-start",
                            fontWeight: "bold",
                            textTransform: "none",
                            fontSize: "1rem",
                            py: 1
                        }}
                    >
                        Common
                    </Button>
                    
                    <Button
                        fullWidth
                        variant={activeSection === "leastCommon" ? "contained" : "outlined"}
                        onClick={() => setActiveSection("leastCommon")}
                        sx={{
                            justifyContent: "flex-start",
                            fontWeight: "bold",
                            textTransform: "none",
                            fontSize: "1rem",
                            py: 1
                        }}
                    >
                        Least Common
                    </Button>
                </Box>
            </Box>

            {/* Right Content */}
            <Box sx={{ flex: 1 }}>
                <Box sx={{ p: 3, backgroundColor: "#f5f5f5", borderRadius: 2 }}>
                    <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", mb: 3, color: "black" }}>
                        {activeSection === "mostCommon" ? "Most Common" : 
                         activeSection === "common" ? "Common" : "Least Common"}
                    </Typography>
                    
                    {sections[activeSection]}
                </Box>
            </Box>
        </Box>
    );
}


export default HiddenCosts;