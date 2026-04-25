import { useState } from "react";
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, TextField, InputAdornment } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Search } from "@mui/icons-material";
import GlossaryTerm from "../BuyingOptions/GlossaryTerm";
import { keywords } from "../../shared/GlossaryTerms";

function HiddenCosts() {
    const [searchTerm, setSearchTerm] = useState("");

    // Create a map of glossary terms for quick lookup
    const glossaryMap = new Map();
    keywords.forEach(term => {
        glossaryMap.set(term.TERM.toLowerCase(), term.TERM);
    });

    // Function to check if a title should be wrapped as a glossary term
    const renderTitle = (title) => {
        const matchingTerm = glossaryMap.get(title.toLowerCase());
        if (matchingTerm) {
            return (
            <Typography component="span" sx={{ fontWeight: "bold", color: "#1b1b1b", display: "inline" }}>
                <GlossaryTerm term={matchingTerm}>{title}</GlossaryTerm>
            </Typography>
            );
        }
        return <Typography sx={{ fontWeight: "bold", color: "#1b1b1b", display: "inline" }}>{title}</Typography>;
    };

    const costData = {
        mostCommon: {
            title: "Most Common",
            items: [
                {
                    title: "Closing Costs",
                    description: "Closing costs are fees and expenses you pay when you finalize (close) your mortgage. They include lender charges like origination fees and discount points, third-party services such as appraisals, title searches, and credit reports, plus government recording fees and transfer taxes. You might also prepay property taxes and homeowners insurance into an escrow account. These costs typically add 2-5% to your loan amount. For a $300,000 home, that's $6,000 to $15,000. Many first-time buyers are surprised by these costs because they focus only on the down payment. Some programs allow sellers to contribute to closing costs, and certain loans roll them into the mortgage, but that increases your monthly payment and total interest.",
                    estimate: "$6,000 – $20,000 on a $300k home"
                },
                {
                    title: "Home Inspection",
                    description: "A home inspection is a thorough evaluation of a property's condition, typically conducted by a licensed inspector after an offer is accepted but before closing. The inspector examines the roof, foundation, electrical systems, plumbing, HVAC, appliances, windows, and more. They look for safety hazards, code violations, water damage, pest infestations, and structural issues. While not legally required, most lenders strongly recommend it. A good inspection can uncover problems like mold, faulty wiring, a failing furnace, or a leaky roof that could cost thousands to repair. You can use the report to negotiate repairs, request a price reduction, or even back out of the deal entirely. Considering the average home buyer stays in their home for 10-13 years, a $400 inspection is a small investment to avoid a $10,000 surprise.",
                    estimate: "$300 – $600"
                },
                {
                    title: "Appraisal Fee",
                    description: "An appraisal is an independent professional assessment of the home's fair market value, ordered by your lender to ensure they're not lending more than the property is worth. A licensed appraiser visits the property, measures its square footage, evaluates its condition and features, and compares it to similar homes that recently sold nearby (comparables or 'comps'). If the appraisal comes in lower than your offer price, the lender will only approve a loan based on the lower amount. You'll then need to negotiate with the seller to lower the price, pay the difference in cash, or walk away. Appraisals also protect you from overpaying. For FHA and USDA loans, the appraisal includes additional safety and property condition requirements that can affect approval.",
                    estimate: "$400 – $800"
                },
                {
                    title: "Property Taxes",
                    description: "Property taxes are annual taxes levied by local governments (county, city, school district) based on your home's assessed value. When you buy a home, you may need to pay several months of property taxes upfront at closing to fund your escrow account. The exact amount depends on your local tax rate and the home's value. Some areas have property tax rates under 1%, while others exceed 2.5%. Your lender will collect 1/12 of your annual tax bill with each mortgage payment and pay the county when taxes are due. Property taxes can increase over time as your home's value rises or if local tax rates change. Always check the tax history before buying—some homes have unusually low taxes due to exemptions that won't transfer to you, or high taxes from special assessments.",
                    estimate: "$1000 – $4000 upfront depending on location"
                },
                {
                    title: "Homeowners Insurance",
                    description: "Homeowners insurance protects you financially if your home is damaged by covered perils like fire, windstorms, hail, lightning, theft, or vandalism. It also provides liability coverage if someone is injured on your property. Most lenders require you to purchase a policy before closing and pay the first year's premium upfront. Premiums vary based on your home's age, construction materials, location (especially flood or fire zones), coverage amount, and deductible. You'll also pay into an escrow account monthly so the lender can renew the policy annually. Don't confuse this with mortgage insurance (PMI), which protects the lender, not you. Shop around for quotes—prices can vary by hundreds of dollars for similar coverage.",
                    estimate: "$800 – $2,000"
                },
                {
                    title: "Earnest Money Deposit",
                    description: "An earnest money deposit is a 'good faith' payment you make when submitting an offer to show the seller you're serious about buying their home. The amount is typically 1-3% of the purchase price and is held in a neutral escrow account, not given directly to the seller. If your offer is accepted and you follow the contract terms, the money is credited toward your down payment or closing costs at closing. However, if you back out for reasons not covered by contingencies (like getting cold feet), the seller may keep the deposit as compensation for taking their home off the market. Make sure your contract includes contingencies for inspection, financing, and appraisal—these protect your deposit if problems arise. For a $300,000 home, a 2% deposit is $6,000, which is significant money at stake.",
                    estimate: "1% – 3% of home price ($3,000 – $9,000 for a $300k home)"
                },
            ]
        },
        common: {
            title: "Common",
            items: [
                {
                    title: "Survey Fees",
                    description: "A land survey identifies your property's exact boundaries, dimensions, and legal descriptions. It shows where your land ends and your neighbor's begins, and identifies any easements (rights for others to use part of your property, like utility companies), encroachments (when a neighbor's fence or driveway crosses onto your land), or setbacks (required distances between buildings and property lines). While not always required by lenders, surveys are highly recommended for older properties or irregular lots where boundaries may be unclear. Some lenders accept a 'location drawing' instead, which is cheaper but less detailed. A survey can prevent expensive legal disputes with neighbors who might claim your new fence is on their land. If a property has been recently surveyed, you might reuse that document instead of paying for a new one.",
                    estimate: "$300 – $1000"
                },
                {
                    title: "HOA / Condo Fees",
                    description: "If you buy a home in a planned community, condominium, or townhouse development, you'll likely pay monthly or quarterly Homeowners Association (HOA) fees. These fees cover shared expenses like landscaping, snow removal, trash collection, pool maintenance, clubhouse upkeep, and building insurance for common areas. In condos, fees often include water, sewer, and exterior building maintenance. HOA fees vary widely—from $100/month for basic neighborhoods to $500+/month for luxury buildings with amenities. Before buying, review the HOA's financial health, rules (like pet restrictions or rental bans), and whether they've issued 'special assessments' (unexpected fees for major repairs). Some HOAs have low fees but poor reserves, meaning you could be hit with a $5,000 special assessment when the roof needs replacement.",
                    estimate: "$100 – $500 per month"
                },
                {
                    title: "Rate Lock Fees",
                    description: "When you apply for a mortgage, you can 'lock' your interest rate to protect against market increases while your loan is processed. Locks typically last 30-60 days. Some lenders charge a fee to lock your rate, especially for longer lock periods (e.g., 90 days for new construction). This fee might be flat ($500) or a percentage of your loan amount. If rates drop after you lock, you usually can't get the lower rate unless you pay for a 'float down' option. Some lenders offer free locks but charge higher rates. Ask your lender about their lock policies—some will let you lock after you're approved at no charge. The fee is often refundable if you close the loan, but not if you walk away. With rates fluctuating, locking protects you from sudden increases that could add $100+ to your monthly payment.",
                    estimate: "$0 – $500 depending on lender"
                },
                {
                    title: "Home Warranty",
                    description: "A home warranty is a service contract that covers the repair or replacement of major home systems and appliances when they break down due to normal wear and tear. This typically includes items like HVAC systems, water heaters, electrical systems, plumbing, dishwashers, ovens/ranges, refrigerators, and sometimes washers/dryers. Unlike homeowners insurance (which covers damage from events like fire or storms), a home warranty covers mechanical failure. Many buyers request a seller-paid home warranty as a negotiation tool, especially for older homes. Policies usually last one year and require a service call fee ($75-$125) each time a technician visits. While warranties don't cover everything (pre-existing conditions, improper installation, or lack of maintenance), they can provide peace of mind for first-time buyers who don't have a large emergency fund. Read the fine print carefully—some policies have coverage caps and exclusions. If you're buying a home with older appliances or HVAC, a warranty can be a smart investment, especially in the first year when you're still building your savings.",
                    estimate: "$400 – $800 per year (often negotiable for seller to pay)"
                },
                {
                    title: "Moving Costs",
                    description: "Moving costs are often underestimated by first-time buyers. Professional movers charge by weight and distance—local moves average $500-$2,000, while long-distance moves can exceed $5,000. DIY moves require truck rental ($100-$500/day), fuel, insurance, and equipment like dollies and pads. You'll also need packing supplies: boxes ($1-3 each), tape, bubble wrap, and specialty containers for TVs or artwork. Other moving expenses include cleaning your old rental (to get your security deposit back), appliance installation at the new home, changing your address (postal service charges a small fee), and taking time off work. Don't forget tips for movers (typically 15-20% of the total). To save money, declutter before packing—every box you don't move saves time and money.",
                    estimate: "$500 – $3,000"
                },
                {
                    title: "Needed Repairs",
                    description: "After your home inspection, you'll likely discover issues that need attention—even in well-maintained homes. These can range from minor fixes (leaky faucets, broken outlets, loose railings) to major concerns (old HVAC systems, aging roofs, foundation cracks). You have three options: ask the seller to repair issues before closing, request a credit at closing so you can fix them yourself, or negotiate a lower price. Some buyers budget $1,000-$5,000 for immediate repairs after moving in. Common post-closing surprises include: replacing old appliances ($500-$2,000 each), repainting ($1,000-$4,000 for a whole house), replacing carpets ($1,500-$4,000), or addressing pest issues ($300-$1,500). Always get quotes before closing so you know what you're taking on. A home warranty ($400-$600/year) can cover some unexpected repairs in the first year.",
                    estimate: "$500 – $5,000"
                },
                {
                    title: "Utility Setup / Transfer",
                    description: "Setting up utilities at your new home involves several potential fees. Electric, gas, water, sewer, and trash services may charge connection or transfer fees ($25-$100 each). You might need deposits if you have poor credit or are a first-time customer—some utilities require $200-$400 deposits that are refundable after 12 months of on-time payments. Internet and cable providers often charge installation fees ($50-$150) unless you sign a contract. Don't forget to factor in that your first bills may be higher than expected due to partial-month charges and setup fees. Some services (like trash or water) might be included in your property taxes or HOA fees—check before you pay twice. Start transfers 1-2 weeks before moving to ensure services are active when you arrive.",
                    estimate: "$50 – $300"
                },
            ]
        },
        leastCommon: {
            title: "Least Common",
            items: [
                {
                    title: "Private Road Maintenance Fees",
                    description: "Some neighborhoods, especially rural areas or subdivisions, have private roads not maintained by the city or county. Homeowners in these communities share responsibility for road maintenance—plowing snow, filling potholes, repaving, and repairing drainage. These fees may be collected monthly, annually, or as needed through a road association. Fees vary widely: $200-$1,000+ per year depending on road length, usage, and local conditions. Before buying, ask about the road maintenance agreement—some are informal ('we all pitch in when needed') while others are legally binding with enforcement powers. Also check if the roads meet local standards for emergency vehicle access. Poorly maintained roads can affect property values and your ability to get financing, as some lenders require road maintenance agreements.",
                    estimate: "$200 – $1000 per year"
                },
                {
                    title: "Septic System",
                    description: "If your home isn't connected to a municipal sewer system, you have a private septic system that treats wastewater on your property. Before buying, you'll need a septic inspection ($300-$600) to ensure the tank and drain field are functioning properly. A failing system is a major expense—replacing a septic tank costs $3,000-$10,000, while a new drain field can run $5,000-$20,000 or more. Annual maintenance includes pumping the tank every 3-5 years ($300-$500) to remove solid waste that can clog the system. You'll also need to be careful what goes down drains (no harsh chemicals, grease, or non-biodegradable items). Some areas require septic permits and regular inspections. A failed septic system can make a home uninhabitable and is very expensive to fix, so always get a professional inspection before buying.",
                    estimate: "Inspection: $300-$600 | Replacement: $500-$20,000"
                },
                {
                    title: "Well Water Testing",
                    description: "Homes without public water service use private wells. Before buying, you should test the well water for bacteria, nitrates, heavy metals, and other contaminants. Basic tests cost $100-$200, but comprehensive tests for pesticides, radon, or industrial chemicals can reach $400+. If problems are found, you may need to install water treatment systems ($500-$5,000) or even drill a new well ($5,000-$15,000). Well flow rate testing checks if the well produces enough water for household needs—low flow may require a new pump ($1,000-$3,000) or drilling deeper. Annual maintenance includes water testing and pump inspection. Unlike city water, you're responsible for everything from the well to your tap. Some lenders require well certification before approving loans, especially for FHA or VA mortgages.",
                    estimate: "$100 – $400"
                },
                {
                    title: "Flood Zone Insurance",
                    description: "If your property is in a FEMA-designated flood zone (especially high-risk Zones A or V), your lender will require flood insurance. This is separate from standard homeowners insurance and covers flood damage from heavy rain, storm surges, or overflowing rivers. Flood insurance costs vary dramatically: low-risk zones might pay $500-$1,000/year, while high-risk coastal properties can pay $3,000-$10,000+/year. Even homes outside mapped flood zones can flood—about 25% of flood claims come from moderate-to-low risk areas. Check flood maps carefully and consider insurance even if not required. FEMA updates maps periodically, so a property not in a flood zone today could be rezoned tomorrow. The National Flood Insurance Program (NFIP) offers coverage, but private insurers may have better rates.",
                    estimate: "$700 – $3000 per year"
                },
                {
                    title: "Historic District Compliance",
                    description: "Homes in designated historic districts must follow strict guidelines for exterior changes, including paint colors, roofing materials, windows, doors, and landscaping. Before buying, review the local preservation commission's rules—violations can result in fines or orders to undo work. Getting approval for changes takes time and may require professional architects familiar with historic standards. Renovations often cost more because you need specialized materials and craftspeople (e.g., custom wood windows instead of vinyl replacements). Some districts offer tax credits for approved renovations, which can offset costs. Even routine maintenance like roof replacement might require approval. These rules protect neighborhood character but add complexity and expense to homeownership. Always review the design guidelines before buying in a historic area.",
                    estimate: "$1,000 – $10,000+"
                },
                {
                    title: "Special Assessments",
                    description: "Special assessments are unexpected, one-time charges from your HOA or municipality for major capital improvements not covered by regular budgets. Examples include replacing all roofs in a condo building ($10,000+ per unit), repaving private roads ($2,000-$5,000 per home), upgrading sewer systems, or adding new amenities like a pool. Special assessments can be triggered by deferred maintenance, inadequate reserve funds, or emergencies (e.g., storm damage). Before buying, review HOA meeting minutes and financial statements to spot potential assessments. Ask about the reserve study—this shows if the HOA is saving enough for future repairs. A healthy HOA has 50-100% of its annual budget in reserves. Low fees often mean low reserves, increasing your risk of surprise bills. Some assessments can be paid over time, but others require immediate lump sums.",
                    estimate: "$500 – $10,000+"
                },
            ]
        }
    };

    // Filter function to search across all sections
    const getFilteredData = () => {
        if (!searchTerm.trim()) {
            return costData;
        }

        const searchLower = searchTerm.toLowerCase();
        const filtered = {};

        Object.keys(costData).forEach((sectionKey) => {
            const section = costData[sectionKey];
            const filteredItems = section.items.filter((item) => 
                item.title.toLowerCase().includes(searchLower) || 
                item.description.toLowerCase().includes(searchLower) ||
                item.estimate.toLowerCase().includes(searchLower)
            );
            
            if (filteredItems.length > 0) {
                filtered[sectionKey] = {
                    ...section,
                    items: filteredItems
                };
            }
        });

        return filtered;
    };

    const displayData = searchTerm ? getFilteredData() : costData;

    const totalResults = Object.values(displayData).reduce((total, section) => total + section.items.length, 0);

    // Reusable table component
    const CostTable = ({ title, items }) => (
        <Box sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom sx={{ color: "black", fontWeight: "bold", mb: 3 }}>
                {title}
            </Typography>
            
            <Box sx={{ width: "100%" }}>
                {/* Table Header */}
                <Box sx={{ 
                    display: "grid", 
                    gridTemplateColumns: "2fr 3fr 2fr", 
                    gap: 2, 
                    p: 2, 
                    bgcolor: "#66BB6A", 
                    color: "white", 
                    fontWeight: "bold",
                    borderRadius: "8px 8px 0 0",
                    borderBottom: "2px solid #43A047"
                }}>
                    <Typography sx={{ fontWeight: "bold" }}>Cost Type</Typography>
                    <Typography sx={{ fontWeight: "bold" }}>Description</Typography>
                    <Typography sx={{ fontWeight: "bold" }}>Estimated Cost</Typography>
                </Box>
                
                {/* Accordion Rows */}
                {items.map((item, index) => (
                    <Accordion 
                        key={index} 
                        sx={{ 
                            boxShadow: "none", 
                            border: "1px solid #e0e0e0",
                            borderTop: index === 0 ? "none" : "1px solid #e0e0e0",
                            '&:before': { display: 'none' }
                        }}
                        disableGutters={true}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            sx={{
                                '& .MuiAccordionSummary-content': {
                                    display: "grid",
                                    gridTemplateColumns: "2fr 3fr 2fr",
                                    gap: 2,
                                    alignItems: "center"
                                }
                            }}
                        >
                            <Box sx={{ fontWeight: "bold", color: "#1b1b1b" }}>
                                {renderTitle(item.title)}
                            </Box>
                            <Typography sx={{ color: "#1b1b1b" }}>
                                {item.description.length > 80 ? `${item.description.substring(0, 80)}...` : item.description}
                            </Typography>
                            <Typography sx={{ color: "#1b1b1b", fontWeight: "medium" }}>
                                {item.estimate}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ 
                            bgcolor: "#fafafa",
                            borderTop: "1px solid #e0e0e0"
                        }}>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                <Box>
                                    <Typography variant="subtitle2" sx={{ fontWeight: "bold", color: "#43A047", mb: 1 }}>
                                        Full Description:
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: "#333", lineHeight: 1.6 }}>
                                        {item.description}
                                    </Typography>
                                </Box>
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Box>
        </Box>
    );

    return (
        <Box sx={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
            {/* Search Bar */}
            <Box sx={{ mb: 3, display: "flex", justifyContent: "flex-end" }}>
                <TextField
                    placeholder="Search for a cost..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    variant="outlined"
                    size="small"
                    sx={{ 
                        width: "300px",
                        backgroundColor: "white",
                        borderRadius: 1
                    }}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search sx={{ color: "#666" }} />
                                </InputAdornment>
                            ),
                        },
                    }}
                />
            </Box>

            {/* Search Results Summary */}
            {searchTerm && (
                <Typography sx={{ mb: 2, color: "#666", fontStyle: "italic" }}>
                    Found {totalResults} result(s) for "{searchTerm}"
                </Typography>
            )}

            {/* All Three Tables */}
            {Object.keys(displayData).map((sectionKey) => (
                <CostTable 
                    key={sectionKey}
                    title={displayData[sectionKey].title} 
                    items={displayData[sectionKey].items} 
                />
            ))}

            {/* No Results Message */}
            {searchTerm && totalResults === 0 && (
                <Box sx={{ 
                    textAlign: "center", 
                    py: 8, 
                    backgroundColor: "#f5f5f5", 
                    borderRadius: 2 
                }}>
                    <Typography variant="h6" sx={{ color: "#666" }}>
                        No results found for "{searchTerm}"
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#999", mt: 1 }}>
                        Try searching for "closing", "inspection", "insurance", or "taxes"
                    </Typography>
                </Box>
            )}
        </Box>
    );
}

export default HiddenCosts;