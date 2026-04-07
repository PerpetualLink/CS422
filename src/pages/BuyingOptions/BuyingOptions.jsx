import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import '../Home/home.scss';
function BuyingOptions(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}
function BoxBasic({ text }) {
    return (
        //throwing this here until someone makes a dedicated css that I can use
        <Box sx={{
             p: 1, 
            width: '100%', 
            height: '100%',
            transform: 'none',
            whiteSpace: "pre-line",
            borderRadius: "8px",
            boxShadow: 1,

        }}>
            {text}
        </Box>
    );
}
function ResponsiveGrid({ items }) {
    return (
        //same as above throwing this here until css
        <Box sx={{ flexGrow: 1 }}>
                <Grid className = "home-cards" container spacing={3}>
                {items.map((item, index) => (
                    <Grid key={index} size={3}>
                        <BoxBasic text={item} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
BuyingOptions.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Methods" {...a11yProps(0)} />
                    <Tab label="Paths" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <BuyingOptions value={value} index={0}>
                <ResponsiveGrid items={[" ",
                    "Traditional Mortgage",
                    "FHA Loan",
                    "Cash",
                    "Pros",
                    `•Wide availability from many lenders
                    •Potentially lower long-term costs if you put 20% down (avoids PMI)
                    •Flexible loan terms (15-year, 30-year, etc.)
                    •Often faster closing than government-backed loans
                    •Good option for buyers with strong credit`,
                    `•Lower down payment requirements (as low as 3.5%)
                    •More flexible credit score requirements
                    •Easier approval for buyers with limited credit history
                    •Popular for first-time homebuyers`,
                    `•No mortgage payments or interest
                    •Faster closing process
                    •Often stronger negotiating power with sellers
                    •No loan approval or underwriting required
                    •No mortgage-related fees or insurance`,
                    `Cons`,
                    `•Higher credit score requirements (often ~620+ minimum)
                    •May require larger down payments than some programs
                    •PMI required if down payment is under 20%
                    •Stricter financial documentation`,
                    `•Mortgage insurance required for the life of the loan in many cases
                    •Property must meet FHA inspection standards
                    •Loan limits may restrict higher-priced homes
                    •Can be slightly more paperwork and processing`,
                    `•Requires very large upfront savings
                    •Reduces available cash for emergencies or investments
                    •Less leverage compared to financing
                    •Opportunity cost of tying money up in real estate`]} />
            </BuyingOptions>
            <BuyingOptions value={value} index={1}>
                <ResponsiveGrid items={[" ",
                    "Real Estate Agent",
                    "Tax Auction",
                    "Home Owner",
                    "Description",
                    `A real estate agent helps buyers find homes, negotiate offers, and manage paperwork throughout the purchasing process. Agents are licensed professionals who understand the housing market and transaction procedures.`,
                    `A tax auction is a public sale where properties are sold by a government entity because the owner failed to pay property taxes. Investors or buyers can bid on these properties, sometimes at significantly reduced prices.`,
                    `A direct purchase from the homeowner (commonly called For Sale By Owner or FSBO) occurs when the seller lists and sells the property without using a real estate agent, negotiating directly with the buyer.`,
                    `Pros`,
                    `•Professional guidance throughout the buying process
                    •Access to Multiple Listing Service (MLS) properties
                    •Help negotiating price and contingencies
                    •Assistance with inspections, paperwork, and closing
                    •Helpful for first-time buyers`,
                    `•Professional guidance throughout the buying process
                    •Access to Multiple Listing Service (MLS) properties
                    •Help negotiating price and contingencies
                    •Assistance with inspections, paperwork, and closing
                    •Helpful for first-time buyers`,
                    `•Potentially lower overall transaction costs
                    •Direct communication with the seller
                    •Possible flexibility in negotiation terms
                    •Sometimes lower listing price due to no agent commission`,
                    `Cons`,
                    `•Agent commissions are built into the transaction cost
                    •Buyers may rely heavily on agent recommendations
                    •Less direct control over the negotiation process`,
                    `•Limited ability to inspect the property beforehand
                    •Property may have liens, legal issues, or damage
                    •Often requires cash payment
                    •Higher risk than traditional purchases`,
                    `•Seller may lack professional pricing guidance
                    •Buyers may need to manage more paperwork themselves
                    •Negotiations may be less structured
                    •Increased risk of missing legal or procedural details `]} />
            </BuyingOptions>
        </Box>
    );
}
