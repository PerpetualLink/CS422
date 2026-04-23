import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { amber, green, grey } from "@mui/material/colors";
import { Box, Button, Card, CardContent, Collapse, Divider, Stack, Tooltip, Typography} from "@mui/material";
import { AccountBalanceWallet, CheckCircleOutline, Edit, ExpandMore, ExpandLess, Home, TrendingFlat, WarningAmber } from "@mui/icons-material";
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
    const [editingProfile, setEditingProfile] = useState(false);

    const recommendation = useMemo(() => computeRecommendation(profile), [profile]);
    const pathRec = useMemo(() => computePathRecommendation(profile), [profile]);

    const downPayment = profile.homePrice * 0.035;
    const estMonthly = Math.round(profile.homePrice * 0.965 * 0.0065 + profile.homePrice * 0.001);
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
                        <Box sx={{ color: grey[400] }}>•</Box>
                        <ProfileSummary
                            profile={profile}
                            updateProfile={updateProfile}
                            editing={editingProfile}
                            setEditing={setEditingProfile}
                        />
                    </Stack>
                    {!editingProfile && (
                        <Button
                            size="small"
                            startIcon={<Edit fontSize="small" />}
                            onClick={() => setEditingProfile(true)}
                            sx={{ color: green[800], fontWeight: 600 }}
                        >
                            Edit
                        </Button>
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
                        <Stack direction={{ xs: "column", sm: "row" }} spacing={3} divider={<Divider orientation="vertical" flexItem />}>
                            <NumberStat
                                label="Down payment"
                                value={fmt(downPayment)}
                                caption={<Typography variant="caption" sx={{ color: grey[600] }}>3.5% of target price</Typography>}
                            />
                            <NumberStat
                                label="You have"
                                value={fmt(profile.saved)}
                                valueColor={green[700]}
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
                                caption={<Typography variant="caption" sx={{ color: grey[600] }}>incl. <GlossaryTerm term="PMI" />, tax, ins.</Typography>}
                            />
                            <NumberStat
                                label="Time to close"
                                value={method.timeToClose}
                                caption={<Typography variant="caption" sx={{ color: grey[600] }}>{recommendation.method} typical</Typography>}
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
                                        At 3.5% down, you'd need ~{fmt(downPayment)} — {profile.saved >= downPayment ? "within" : "more than"} your {fmt(profile.saved)} saved.
                                        {" "}Remember to leave room for <GlossaryTerm term="Closing costs">closing costs</GlossaryTerm> (~$5,000-$7,000).
                                    </Typography>
                                </Stack>
                                {recommendation.method === "FHA" && (
                                    <Stack direction="row" spacing={1.5} alignItems="flex-start">
                                        <WarningAmber fontSize="small" sx={{ color: amber[700], mt: 0.25, flexShrink: 0 }} />
                                        <Typography variant="body2" sx={{ color: grey[800], lineHeight: 1.6 }}>
                                            FHA requires <GlossaryTerm term="PMI" /> for the life of the loan. Once you have ~20% equity, you can refinance into a conventional loan to drop it.
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


            <HiddenCosts />
        </Box>
    );
}

export default BuyingOptions;
