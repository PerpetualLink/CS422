import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { amber, green, grey, red } from "@mui/material/colors";
import { Box, Button, Card, CardContent, Collapse, Divider, Stack, Tooltip, Typography} from "@mui/material";
import { AccountBalanceWallet, CheckCircleOutline, Edit, ExpandMore, ExpandLess, Home, TrendingFlat, WarningAmber, Circle } from "@mui/icons-material";
import { useBuyerProfile } from "../../shared/BuyerProfileContext";
import ComparisonTable from "./ComparisonTable";
import { fmt, methodColumns, methodMeta, methodRows, pathColumns, pathRows, computeRecommendation, computePathRecommendation } from "./recommendationEngine";
import GlossaryTerm from "./GlossaryTerm";
import NumberStat from "./NumberStat";
import ProfileSummary from "./ProfileSummary";
import Reason from "./Reason";
import HiddenCosts from "../HiddenCosts";
import "./BuyingOptions.scss";

function BuyingOptions() {
    const navigate = useNavigate();
    const { profile, updateProfile } = useBuyerProfile();
    const [showWhy, setShowWhy] = useState(true);
    const [useCustom, setUseCustom] = useState(false);
    const [editingProfile, setEditingProfile] = useState(false);

    const [tempProfile, setTempProfile] = useState({...profile});
    let tempSet = false;

    useEffect(() => {
        if (!editingProfile && !tempSet) {
            setTempProfile({...profile});
            console.log(tempProfile)
            tempSet = true;
        }
    }, [profile]);

    const handleCancel = () => {
        updateProfile({...tempProfile});
        setEditingProfile(false);
        tempSet = false;
    }

    const recommendation = useMemo(() => computeRecommendation(profile), [profile]);
    const pathRec = useMemo(() => computePathRecommendation(profile), [profile]);

    const downPercent = (useCustom) ? profile.downPercent : 3.5;
    const downPayment = profile.homePrice * downPercent / 100;
    const avgPmiCost = (downPercent < 20 ) ? profile.homePrice * (0.01 / 12) : 0; // If less than 20% down payment then it's required, but if not then it is generally about 1% annually.
    const avgPropertyTax = profile.homePrice * (0.011 / 12) // 1.1% is the low national average for annual tax rate.
    const avgHomeInsurance = 2400 / 12; // 2400 per year is the national average
    const loanAmount = profile.homePrice * ((100 - downPercent) / 100); // Calculate remaining home price which would then be the theoretical loan amount.
    const avgLoanInterestRate = 0.06 / 12 // average mortgage regardless of FHA or Conventional is around 6% annually
    const amortizationCalc = loanAmount * avgLoanInterestRate * (Math.pow((1 + avgLoanInterestRate), 360) / (Math.pow((1 + avgLoanInterestRate), 360) - 1));
    const estMonthly = Math.round(amortizationCalc + avgPmiCost + avgPropertyTax + avgHomeInsurance);
    const method = methodMeta[recommendation.method];

    const typographyStling = {
        fontSize: "1rem"
    }

    return (
        <Box className="financingContainer">
            <Box sx={{ mb: 5 }}>
                <Typography variant="h3" sx={{ fontWeight: 700, color: grey[900], lineHeight: 1.15, mb: 1.5 }}>
                    How will you pay for it?
                </Typography>
                <Typography variant="h6" sx={{ color: grey[600], fontWeight: 400 }}>
                    There's no single right answer — the best path depends on your savings,
                    credit, and timeline. Here's what we recommend for <em>you</em>.
                </Typography>
            </Box>

            <Card elevation={3} className="recommendationCard">
                <Box className="profileBar">
                    <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap" sx={{ display: "flex", flexGrow: 1 }}>
                        <Typography variant="caption" className="eyebrow">
                            Based on what you told us
                        </Typography>
                        <Circle sx={{ color: grey[400], fontSize: "0.5rem" }} />
                        <ProfileSummary
                            profile={profile}
                            updateProfile={updateProfile}
                            editing={editingProfile}
                        />
                    </Stack>
                    {!editingProfile ? (
                        <Button
                            size="small"
                            startIcon={<Edit fontSize="small" />}
                            onClick={() => setEditingProfile(true)}
                            sx={{ color: green[800], fontWeight: 600 }}
                        >
                            Edit
                        </Button>
                    ) : (
                        <>
                        <Button
                            size="small"
                            onClick={handleCancel}
                            sx={{ color: green[800], fontWeight: 600 }}
                        >
                            Cancel
                        </Button>
                        <Button
                            size="small"
                            onClick={() => setEditingProfile(false)}
                            sx={{ color: green[800], fontWeight: 600 }}
                        >
                            Done
                        </Button>
                    </>
                    )}
                </Box>

                <CardContent sx={{ p: 5 }}>
                    <Typography variant="overline" sx={{ color: grey[600], fontSize: "1rem", fontWeight: 600, letterSpacing: 2 }}>
                        Our recommendation
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: grey[900], mt: 1, mb: 3, lineHeight: 1.2 }}>
                        Start with an <GlossaryTerm term={method.label}>{method.label}</GlossaryTerm>
                        {" · "}work with a {pathRec.path.toLowerCase()}
                    </Typography>

                    <Stack direction={{ xs: "column", md: "row" }} spacing={3} sx={{ mb: 4 }}>
                        <Reason
                            icon={<AccountBalanceWallet fontSize="small" sx={{ color: green[700] }} />}
                            label="Financing Method"
                            title={method.label}
                            body={recommendation.reason}
                        />
                        <Reason
                            icon={<Home fontSize="small" sx={{ color: green[700] }} />}
                            label="Acquisition Path"
                            title={pathRec.path}
                            body={pathRec.reason}
                        />
                    </Stack>

                    <Box sx={{ borderTop: `1px solid ${grey[200]}`, pt: 3 }}>
                        <Typography variant="overline" sx={{ color: grey[600], fontSize: "1rem", fontWeight: 600, letterSpacing: 2, mb: 2, display: "block" }}>
                            What this looks like for you
                        </Typography>
                        <Stack direction={{ xs: "column", sm: "row" }} spacing={3} divider={<Divider orientation="vertical" flexItem />} >
                            <NumberStat
                                label="Down payment"
                                value={fmt(downPayment)}
                                caption={<Typography variant="caption" sx={{ color: grey[600], flexGrow: 1 }}>{`${downPercent}% of home price `}</Typography>}
                                onToggle={setUseCustom}
                                toggle={true}
                            />
                            <NumberStat
                                label="You Saved"
                                value={fmt(profile.saved)}
                                valueColor={(profile.saved < downPayment) ? red[700] : green[700]}
                                caption={
                                    <Stack direction="row" spacing={0.5} alignItems="center">
                                        {profile.saved >= downPayment ? (
                                            <>
                                                <CheckCircleOutline fontSize="inherit" sx={{ color: green[700] }} />
                                                <Typography variant="caption" sx={{ color: green[700] }}>Enough for down payment</Typography>
                                            </>
                                        ) : (
                                            <>
                                                <WarningAmber fontSize="inherit" sx={{ color: amber[800] }} />
                                                <Typography variant="caption" sx={{ color: amber[800] }}>{fmt(downPayment - profile.saved)} short</Typography>
                                            </>
                                        )}
                                    </Stack>
                                }
                            />
                            <NumberStat
                                label="Est. monthly payment"
                                value={`~${fmt(estMonthly)}`}
                                caption={<Typography variant="caption" sx={{ color: grey[600] }}>incl. <GlossaryTerm term="Amortization" />, <GlossaryTerm term="PMI" />, <GlossaryTerm term="Property Taxes" />, <GlossaryTerm term="Homeowner Insurance" /></Typography>}
                            />
                            <NumberStat
                                label="Average Time to close"
                                value={method.timeToClose}
                                caption={<Typography variant="caption" sx={{ color: grey[600] }}>{recommendation.method} typical</Typography>}
                            />
                            <NumberStat
                                label="Total Cost of Loan"
                                value={`${fmt(amortizationCalc * 360)}`}
                                caption={<Typography variant="caption" sx={{ color: grey[600] }}>{"For a 30 year mortgage at 6% interest"}</Typography>}
                            />
                        </Stack>
                    </Box>

                    <Button
                        onClick={() => setShowWhy(!showWhy)}
                        startIcon={showWhy ? <ExpandLess /> : <ExpandMore />}
                        sx={{ mt: 3, color: green[800], fontWeight: 600, textTransform: "none" }}
                    >
                        Why we recommended this
                    </Button>
                    <Collapse in={showWhy}>
                        <Box className={`reasoningPanel ${(profile.creditScore > 620 && profile.saved >= downPayment && recommendation.method !== "FHA") ? "noWarnings" : ""}`}>
                            <Stack spacing={1.5}>
                                <Stack direction="row" spacing={1.5} alignItems="flex-start">
                                    {(profile.creditScore < 620) ? (
                                        <WarningAmber fontSize="small" sx={{ color: amber[700], mt: 0.25, flexShrink: 0 }} />
                                    ): (
                                        <CheckCircleOutline fontSize="small" sx={{ color: green[700], mt: 0.25, flexShrink: 0 }} />
                                    )}
                                    <Typography variant="body2" sx={{ color: grey[800], lineHeight: 1.6 }}>
                                        Your credit score of <strong>{profile.creditScore}</strong>
                                        {profile.creditScore < 620
                                            ? " is below the typical 620 threshold for conventional loans — FHA accepts down to 580."
                                            : " qualifies for both conventional and FHA loans."}
                                    </Typography>
                                </Stack>
                                <Stack direction="row" spacing={1.5} alignItems="flex-start">
                                    {(profile.saved >= downPayment) ? (
                                        <CheckCircleOutline fontSize="small" sx={{ color: green[700], mt: 0.25, flexShrink: 0 }} />
                                    ) : (
                                        <WarningAmber fontSize="small" sx={{ color: amber[700], mt: 0.25, flexShrink: 0 }} />
                                    )
                                    }
                                    <Typography variant="body2" sx={{ color: grey[800], lineHeight: 1.6 }}>
                                        At {downPercent}% down, you'd need ~{fmt(downPayment)} — {profile.saved >= downPayment ? "within" : "more than"} your {fmt(profile.saved)} saved.
                                        {" "}Remember to leave room for <GlossaryTerm term="Closing costs">closing costs</GlossaryTerm> (~$5,000-$7,000).
                                    </Typography>
                                </Stack>
                                {recommendation.method === "FHA" && (
                                    <Stack direction="row" spacing={1.5} alignItems="flex-start">
                                        <WarningAmber fontSize="small" sx={{ color: amber[700], mt: 0.25, flexShrink: 0 }} />
                                        <Typography variant="body2" sx={{ color: grey[800], lineHeight: 1.6 }}>
                                            FHA requires <GlossaryTerm term="PMI" /> for the life of the loan. Once you have ~20% equity, you can <GlossaryTerm term="Refinancing">refinance</GlossaryTerm> into a conventional loan to drop it.
                                        </Typography>
                                    </Stack>
                                )}
                            </Stack>
                        </Box>
                    </Collapse>
                </CardContent>
            </Card>

            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                <Box className="compareDivider__line" />
                <Typography variant="overline" sx={{ color: grey[600], letterSpacing: 2, fontWeight: 600, fontSize: "1rem" }}>
                    Compare all options
                </Typography>
                <Box className="compareDivider__line" />
            </Stack>

            <Typography variant="body2" sx={{ color: grey[600], mb: 3, fontSize: "1rem" }}>
                Want to see the full picture? Here's how every financing method and acquisition path compares. Your recommended options are highlighted.
            </Typography>

                <ComparisonTable
                    title="Financing Methods"
                    description="How you'll actually pay for the home."
                    columns={methodColumns}
                    rows={methodRows}
                    recommended={recommendation.method}
                />
                <ComparisonTable
                    title="Acquisition Paths"
                    description="How you'll find and close on the home."
                    columns={pathColumns}
                    rows={pathRows}
                    recommended={pathRec.path}
                />

            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                <Box className="compareDivider__line" />
                <Typography variant="overline" sx={{ color: grey[600], letterSpacing: 2, fontWeight: 600, fontSize: "1rem" }}>
                    Hidden Costs
                </Typography>
                <Box className="compareDivider__line" />
            </Stack>

            <Typography variant="body2" sx={{ color: grey[600], mb: 3, fontSize: "1rem" }}>
                Hidden costs are expenses that can arise as part of the home buying process that go beyond the initial list price. These include closing costs, inspection fees, insurance, property taxes, and unexpected repairs.
                Being aware of these costs helps you budget more accurately and avoid financial surprises during your home buying journey.
            </Typography>

            <HiddenCosts />
        </Box>
    );
}

export default BuyingOptions;
