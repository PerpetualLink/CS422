import { useState } from "react";
import { Button, Drawer, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./Glossary.scss";

function Glossary() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const glossaryTerms = [
        {
            term: "Contingency",
            definition: "A condition that must be met for a real estate contract to become legally binding. Common contingencies include the home passing inspection, the buyer securing financing, and the appraisal meeting the purchase price."
        },
        {
            term: "FHA Loan",
            definition: "A mortgage insured by the Federal Housing Administration (FHA) and issued by an FHA-approved lender. It's popular with first-time buyers due to its lower credit score and down payment (as low as 3.5%) requirements."
        },
        {
            term: "Private Mortgage Insurance (PMI)",
            definition: "Insurance required by lenders for conventional loans when the down payment is less than 20%. It protects the lender if you default and is an added monthly cost for you."
        },
        {
            term: "Traditional Mortgage",
            definition: "A home loan issued by a bank, credit union, or mortgage lender that is not backed by the government. Borrowers typically qualify based on their credit score, income, debt-to-income ratio, and down payment."
        },
        {
            term: "Cash",
            definition: "A cash purchase means buying a home without taking out a mortgage, paying the full purchase price upfront."
        },
        {
            term: "Real Estate Agent",
            definition: "A real estate agent helps buyers find homes, negotiate offers, and manage paperwork throughout the purchasing process. Agents are licensed professionals who understand the housing market and transaction procedures."
        },
        {
            term: "Tax Auction",
            definition: "A public sale where properties are sold by a government entity because the owner failed to pay property taxes. Investors or buyers can bid on these properties, sometimes at significantly reduced prices."
        },
        {
            term: "Home Owner",
            definition: "A direct purchase from the homeowner (commonly called For Sale By Owner or FSBO) occurs when the seller lists and sells the property without using a real estate agent, negotiating directly with the buyer."
        }
    ];

    return (
        <div className={"container"}>
            <Button 
                className={`glossaryButton ${isDrawerOpen ? "open" : ""}`}
                variant="contained" 
                onClick={() => setIsDrawerOpen(previousState => !previousState)}
            >
                Glossary
            </Button>

            <Drawer
                anchor="right"
                open={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: 400,
                        maxWidth: '90vw',
                        boxSizing: 'border-box',
                    },
                }}
            >
                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "20px 24px",
                    bgcolor: "#f5f5f5",
                    borderBottom: "1px solid #e0e0e0",
                    position: "sticky",
                    top: 0,
                    zIndex: 1
                }}>
                    <Typography variant="h5" sx={{ fontWeight: "bold", color: "#1b1b1b" }}>
                        Glossary
                    </Typography>
                    <IconButton onClick={() => setIsDrawerOpen(false)}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                
                <Box sx={{
                    padding: "24px",
                    overflowY: "auto",
                    flex: 1
                }}>
                    {glossaryTerms.map((item, index) => (
                        <Box key={index} sx={{ marginBottom: "24px" }}>
                            <Typography variant="h6" sx={{ 
                                fontWeight: "bold", 
                                color: "#43A047", 
                                marginBottom: "8px" 
                            }}>
                                {item.term}
                            </Typography>
                            <Typography variant="body2" sx={{ 
                                color: "#555", 
                                lineHeight: 1.6 
                            }}>
                                {item.definition}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Drawer>
        </div>
    );
}

export default Glossary;
