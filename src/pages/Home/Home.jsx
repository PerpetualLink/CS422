import { Box, Typography, Card, CardContent, CardActionArea } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import "./home.scss";

const featureCards = [
    {
        icon: <MenuBookIcon sx={{ fontSize: 48, color: "#43A047" }} />,
        title: "Getting Started",
        description:
            "New to home buying? Learn the essential steps — from checking your credit score to getting pre-approved for a mortgage.",
        cta: "Start Here",
        page: 1,
    },
    {
        icon: <AccountBalanceIcon sx={{ fontSize: 48, color: "#43A047" }} />,
        title: "Buying Options",
        description:
            "Explore loan types, down payment strategies, and financing programs designed to help first-time buyers get into a home.",
        cta: "Explore Options",
        page: 2,
    },
    {
        icon: <ReceiptLongIcon sx={{ fontSize: 48, color: "#43A047" }} />,
        title: "Hidden Costs",
        description:
            "The purchase price is just the beginning. Discover the fees and expenses that catch many buyers off guard.",
        cta: "See the Full Picture",
        page: 3,
    },
    {
        icon: <HomeIcon sx={{ fontSize: 48, color: "#43A047" }} />,
        title: "By the Numbers",
        description: "Key stats every first-time buyer should know.",
        page: null,
        stats: true,
    },
];

const keyStats = [
    { value: "3–20%", label: "Down payment range" },
    { value: "620+", label: "Credit score needed" },
    { value: "2–5%", label: "Typical closing costs" },
    { value: "43%", label: "Max debt-to-income ratio" },
];

function Home({ onNavigate }) {
    return (
        <Box className="home-page">
            {/* Hero Section */}
            <Box className="home-hero">
                <Typography variant="h3" component="h1" className="home-hero__title">
                    Welcome to <span className="home-hero__brand">Foundation Labs</span>
                </Typography>
                <Typography variant="h6" className="home-hero__subtitle">
                    Your guide to buying your first home.
                </Typography>
            </Box>

            {/* Feature Cards */}
            <Box className="home-cards">
                {featureCards.map((card) =>
                    card.stats ? (
                        <Card key={card.title} className="home-card home-card--stats" elevation={3}>
                            <CardContent className="home-card__content">
                                {card.icon}
                                <Typography variant="h5" className="home-card__title" sx={{ fontSize: "1.75rem", fontWeight: 700 }}>
                                    {card.title}
                                </Typography>
                                <Typography variant="body1" className="home-card__desc" sx={{ fontSize: "1.2rem", color: "#555" }}>
                                    {card.description}
                                </Typography>
                                <Box className="home-stats">
                                    {keyStats.map((stat) => (
                                        <Box key={stat.label} className="home-stats__row">
                                            <Typography variant="body1" className="home-stats__value" sx={{ fontSize: "1.4rem", fontWeight: 700, color: "#43A047" }}>
                                                {stat.value}
                                            </Typography>
                                            <Typography variant="body2" className="home-stats__label" sx={{ fontSize: "1.1rem", color: "#555" }}>
                                                {stat.label}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>
                            </CardContent>
                        </Card>
                    ) : (
                        <Card key={card.title} className="home-card" elevation={3}>
                            <CardActionArea
                                className="home-card__action"
                                onClick={() => onNavigate && onNavigate(card.page)}
                            >
                                <CardContent className="home-card__content">
                                    {card.icon}
                                    <Typography variant="h5" className="home-card__title" sx={{ fontSize: "1.75rem", fontWeight: 700 }}>
                                        {card.title}
                                    </Typography>
                                    <Typography variant="body1" className="home-card__desc" sx={{ fontSize: "1.2rem", color: "#555", lineHeight: 1.6 }}>
                                        {card.description}
                                    </Typography>
                                    <Typography variant="body1" className="home-card__cta" sx={{ fontSize: "1.2rem", fontWeight: 700, color: "#43A047" }}>
                                        {card.cta} →
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    )
                )}
            </Box>
        </Box>
    );
}

export default Home;
