import { green, grey } from "@mui/material/colors";
import "./BuyingOptions.scss";
import { Divider, styled, Table, TableBody, TableCell, tableCellClasses, TableHead, TableRow } from '@mui/material';

function BuyingOptions() {
    const methods = {
        Heading: [
            "Factors", "Traditional", "FHA", "CASH"
        ],
        DownPayment: [
            "DownPayment", "3-20%", "3.5%", "100%"
        ],
        CreditScore: [
            "Credit Score", "~620+", "~580+", "Not Requried"
        ],
        ClosingSpeed: [
            "Closing Speed", "Medium 3-45 Days", "Slow 45-60 Days", "Fast 7-13 Days"
        ],
        MonthlyPayment: [
            "Monthly Payment", "High", "Strict", "Buyers Choice"
        ],
        Condition: [
            "Condition", "Standard", "Strict", "Buyers Choice"
        ],
        BarrierToEntry: [
            "Barrier To Entry", "Moderate (Credit/Cash)", "Low (Credit/Cash)", "High (Full Capital)"
        ]
    }

    const paths = {
        Heading: [
            "Factors", "Real Estate Agent", "Tax Auction", "Home Owner"
        ],
        InformationTransparency: [
            "Information Transparency", "High", "Limited", "Varies"
        ],
        ClosingSpeed: [
            "Closing Speed", "30-45 Days", "1 Day (3-6 Weeks)", "30-60 Days"
        ],
        PriceLeverage: [
            "Price Leverage", "Moderate", "None", "Moderate"
        ],
        Condition: [
            "Condition", "Often Negotiable", "As-Is", "Highly Negotiable"
        ],
        TitleSafety: [
            "Title Safety", "Safe", "Risky", "Safe but manual"
        ],
        FinancingOptions: [
            "Financing Options", "Flexible", "Cash Only", "Flexible"
        ]
    }

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: green[50],
            color: theme.palette.common.black,
            fontWeight: 600,
            fontSize: "1rem",
            paddingLeft: "16px",

            '&:hover': {
                backgroundColor: green[100], 
            },
            
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: "1rem",
            paddingLeft: "16px",
            '&:hover': {
                backgroundColor: grey[100], 
            },
        },
    }));
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    return (
        <div className={"container"}>
            <div className={"categoryTitle"}>
                <div>
                    {"Home Buying Methods"}
                </div>
            </div>
            <Table>
                <TableHead>
                    <StyledTableRow>
                        {methods.Heading.map((heading) => (
                            <StyledTableCell>{heading}</StyledTableCell>
                        ))}
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        {methods.DownPayment.map((option) => (
                            <StyledTableCell>{option}</StyledTableCell>
                        ))}
                    </TableRow>
                    <TableRow>
                        {methods.CreditScore.map((option) => (
                            <StyledTableCell>{option}</StyledTableCell>
                        ))}
                    </TableRow>
                    <TableRow>
                        {methods.ClosingSpeed.map((option) => (
                            <StyledTableCell>{option}</StyledTableCell>
                        ))}
                    </TableRow>
                    <TableRow>
                        {methods.MonthlyPayment.map((option) => (
                            <StyledTableCell>{option}</StyledTableCell>
                        ))}
                    </TableRow>
                    <TableRow>
                        {methods.Condition.map((option) => (
                            <StyledTableCell>{option}</StyledTableCell>
                        ))}
                    </TableRow>
                    <TableRow>
                        {methods.BarrierToEntry.map((option) => (
                            <StyledTableCell>{option}</StyledTableCell>
                        ))}
                    </TableRow>
                </TableBody>
            </Table>
            <Divider sx={{ margin: "64px 0", backgroundColor: "green"}}/>
            <div className={"categoryTitle"}>
                <div>
                    {"Home Buying Paths"}
                </div>
            </div>
            <Table>
                <TableHead>
                    <StyledTableRow>
                        {paths.Heading.map((heading) => (
                            <StyledTableCell>{heading}</StyledTableCell>
                        ))}
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        {paths.InformationTransparency.map((option) => (
                            <StyledTableCell>{option}</StyledTableCell>
                        ))}
                    </TableRow>
                    <TableRow>
                        {paths.ClosingSpeed.map((option) => (
                            <StyledTableCell>{option}</StyledTableCell>
                        ))}
                    </TableRow>
                    <TableRow>
                        {paths.PriceLeverage.map((option) => (
                            <StyledTableCell>{option}</StyledTableCell>
                        ))}
                    </TableRow>
                    <TableRow>
                        {paths.Condition.map((option) => (
                            <StyledTableCell>{option}</StyledTableCell>
                        ))}
                    </TableRow>
                    <TableRow>
                        {paths.TitleSafety.map((option) => (
                            <StyledTableCell>{option}</StyledTableCell>
                        ))}
                    </TableRow>
                    <TableRow>
                        {paths.FinancingOptions.map((option) => (
                            <StyledTableCell>{option}</StyledTableCell>
                        ))}
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
}

export default BuyingOptions
