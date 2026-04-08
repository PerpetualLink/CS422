import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
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
                {/* <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Methods" {...a11yProps(0)} />
                    <Tab label="Paths" {...a11yProps(1)} />
                </Tabs> */}
            </Box>
            <BuyingOptions value={value} index={0}>
                <ResponsiveGrid items={[
                    "Factors",
                    "Traditional",
                    "FHA",
                    "Cash",
                    `Down Payment`,`3–20%`,`3.5%`,`100%`,
                    `Credit Score `,`~620+`,`~580+`,`Not required`,
                    `Closing Speed`,`Medium 30-45 days`,`Slow 45-60 days`,`Fast 7-14 days`,
                    `Monthly Payment`,`High`,`Moderate`,`Lowest`,
                    `Condition`,`Standard`,`Strict`,`Buyers Choice`,
                    `Barrier to Entry`,`Moderate(Credit/Cash)`,`Low(Credit/Cash)`,`High(Full Capital)`,

                    ]} />
                <ResponsiveGrid items={["Factors","Real Estate Agent","Tax Auction","Home Owner",
                    "Information Transparency",`High`,`Limited`,`Varies`,
                    `Closing Speed`,`30-45 days`,`1 day (3-6 weeks)`,`30-60 days`,
                    `Price Leverage`,`Moderate`,`None`,`Moderate`,
                    `Condition`,`Often negotiable`,`As is`,`Highly negotiable`,
                    `Title Safety`,`Safe`,`Dangerous`,`Safe but manual`,
                    `Financing Options`,`Flexible`,`Cash only`,`Flexible`]} />
            </BuyingOptions>
            <BuyingOptions value={value} index={1}>

            </BuyingOptions>
        </Box>
    );
}
