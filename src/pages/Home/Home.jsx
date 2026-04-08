import { useState } from "react";
import { Box, Typography, Card, CardContent, CardActionArea } from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import CalculateIcon from "@mui/icons-material/Calculate";
import HomeSavingsCalculator from "../../shared/HomeSavingsCalculator";
import "./home.scss";

const iconStyle = { fontSize: 48, color: "#43A047" };

const featureCards = [
    { icon: <MenuBookIcon sx={iconStyle} />, title: "Getting Started", description: "New to home buying? Learn the essential steps — from checking your credit score to getting pre-approved for a mortgage.", cta: "Start Here", page: 1 },
    { icon: <AccountBalanceIcon sx={iconStyle} />, title: "Buying Options", description: "Explore loan types, down payment strategies, and financing programs designed to help first-time buyers get into a home.", cta: "Explore Options", page: 2 },
    { icon: <ReceiptLongIcon sx={iconStyle} />, title: "Hidden Costs", description: "The purchase price is just the beginning. Discover the fees and expenses that catch many buyers off guard.", cta: "See the Full Picture", page: 3 },
    { icon: <CalculateIcon sx={iconStyle} />, title: "Savings Calculator", description: "Find out how much you need to save for your first home — down payment, closing costs, and more.", cta: "Open Calculator", action: "calc" },
];

function Home({ onNavigate }) {
    const [calcOpen, setCalcOpen] = useState(false);

    const handleClick = (card) => {
        if (card.action === "calc") setCalcOpen(true);
        else onNavigate?.(card.page);
    };

    return (
        <Box className="home-page">
            <Box className="home-hero">
                <Typography variant="h3" component="h1" className="home-hero__title">
                    Welcome to <span className="home-hero__brand">Foundation Labs</span>
                </Typography>
                <Typography variant="h6" className="home-hero__subtitle">
                    Your guide to buying your first home.
                </Typography>
            </Box>

            <Box className="home-cards">
                {featureCards.map((card) => (
                    <Card key={card.title} className="home-card" elevation={3}>
                        <CardActionArea className="home-card__action" onClick={() => handleClick(card)}>
                            <CardContent className="home-card__content">
                                {card.icon}
                                <Typography variant="h5" className="home-card__title">{card.title}</Typography>
                                <Typography variant="body1" className="home-card__desc">{card.description}</Typography>
                                <Typography variant="body1" className="home-card__cta">{card.cta} →</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))}
            </Box>

            {calcOpen && <HomeSavingsCalculator onClose={() => setCalcOpen(false)} />}
        </Box>
    );
}

export default Home;
