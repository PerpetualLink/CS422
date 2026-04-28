export function fmt(value) {
    return value.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    });
}

export const methodMeta = {
    FHA: { label: "FHA Loan", timeToClose: "45-60 days" },
    Conventional: { label: "Conventional Mortgage", timeToClose: "30-45 days" },
    Cash: { label: "Cash Purchase", timeToClose: "7-14 days" },
};

export function computeRecommendation(profile) {
    const { homePrice, saved, creditScore } = profile;

    const fhaDown = homePrice * 0.035;
    const conventionalComfortable = homePrice * 0.1;

    if (saved >= homePrice) {
        return {
            method: "Cash",
            confidence: "strong",
            reason: `You have ${fmt(saved)} saved — enough to cover the full ${fmt(homePrice)} target price. A cash purchase means no mortgage, no PMI, and the fastest possible close.`,
        };
    }

    if (creditScore < 620 && creditScore >= 580 && saved >= fhaDown) {
        return {
            method: "FHA",
            confidence: "strong",
            reason: `Your credit score of ${creditScore} is below the typical 620 threshold for conventional mortgage loans, but qualifies for FHA. You'd need about ${fmt(fhaDown)} down.`,
        };
    }

    if (creditScore >= 620 && saved < conventionalComfortable && saved >= fhaDown) {
        return {
            method: "FHA",
            confidence: "strong",
            reason: `Your credit qualifies for conventional mortgage, but FHA's 3.5% down (~${fmt(fhaDown)}) is more achievable than a comfortable 10% conventional down payment (~${fmt(conventionalComfortable)}).`,
        };
    }

    if (creditScore >= 620 && saved >= conventionalComfortable) {
        return {
            method: "Conventional",
            confidence: "strong",
            reason: `With a ${creditScore} credit score and ${fmt(saved)} saved, you qualify for a conventional mortgage loan and can put down enough to minimize (or avoid) PMI.`,
        };
    }

    if (saved < fhaDown) {
        return {
            method: "FHA",
            confidence: "warning",
            reason: `You'd need about ${fmt(fhaDown)} for an FHA down payment. You're currently ${fmt(fhaDown - saved)} short — consider adjusting your target price or continuing to save before buying.`,
        };
    }

    if (creditScore < 580) {
        return {
            method: "FHA",
            confidence: "warning",
            reason: `Your credit score of ${creditScore} is below FHA's typical 580 minimum. Focus on improving your credit before applying — even small increases can dramatically change your options.`,
        };
    }

    return {
        method: "FHA",
        confidence: "moderate",
        reason: "FHA is typically the most accessible path for first-time buyers.",
    };
}

export function computePathRecommendation() {
    return {
        path: "Real Estate Agent",
        reason: "For a first-time buyer, an agent provides the protections, transparency, and guidance that matter most — negotiation help, inspection contingencies, and legally required disclosures.",
    };
}

export const methodColumns = ["Conventional", "FHA", "Cash"];

export const methodRows = [
    {
        label: "Best for",
        isItalic: true,
        values: {
            Conventional: "Steady income, decent credit, not rushed",
            FHA: "First-time buyers, lower credit, smaller savings",
            Cash: "You have the full amount saved (rare)",
        },
    },
    { label: "Down payment", values: { Conventional: "3-20%", FHA: "3.5%", Cash: "100%" } },
    { label: "Credit score", values: { Conventional: "620+", FHA: "580+", Cash: "Not required" } },
    { label: "Closing speed", values: { Conventional: "30-45 days", FHA: "45-60 days", Cash: "7-14 days" } },
    {
        label: "Ongoing cost",
        values: {
            Conventional: "Mortgage + possible PMI",
            FHA: "Mortgage + PMI (permanent)",
            Cash: "Just taxes + insurance",
        },
    },
    {
        label: "Property condition",
        values: {
            Conventional: "Standard appraisal",
            FHA: "Strict — must meet FHA standards",
            Cash: "Buyer's choice",
        },
    },
    { label: "Barrier to entry", values: { Conventional: "Moderate", FHA: "Low", Cash: "Very high" } },
];

export const pathColumns = ["Real Estate Agent", "Tax Auction", "Home Owner"];

export const pathRows = [
    {
        label: "Best for",
        isItalic: true,
        values: {
            "Real Estate Agent": "First-time buyers who want guidance and protection",
            "Tax Auction": "Experienced buyers with cash and risk tolerance",
            "Home Owner": "Buyers willing to handle paperwork themselves",
        },
    },
    {
        label: "Information transparency",
        values: {
            "Real Estate Agent": "High — disclosures required",
            "Tax Auction": "Limited — often 'as-is'",
            "Home Owner": "Varies widely",
        },
    },
    {
        label: "Timeline",
        values: {
            "Real Estate Agent": "30-45 days to close",
            "Tax Auction": "Auction: 1 day · Close: 3-6 weeks",
            "Home Owner": "30-60 days",
        },
    },
    {
        label: "Price negotiation",
        values: {
            "Real Estate Agent": "Moderate — agent negotiates",
            "Tax Auction": "None — highest bid wins",
            "Home Owner": "Moderate — direct with owner",
        },
    },
    {
        label: "Risk level for first-time buyer",
        values: {
            "Real Estate Agent": "Low",
            "Tax Auction": "Very high",
            "Home Owner": "Moderate",
        },
    },
];
