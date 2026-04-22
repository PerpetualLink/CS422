import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { amber, green, grey } from "@mui/material/colors";
import {
    Box,
    Button,
    Card,
    CardContent,
    Collapse,
    Divider,
    Stack,
    Tooltip,
    Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import HomeIcon from "@mui/icons-material/Home";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import { useBuyerProfile } from "../../shared/BuyerProfileContext";
import ComparisonTable from "./ComparisonTable";
import {
    fmt,
    glossary,
    methodColumns,
    methodMeta,
    methodRows,
    pathColumns,
    pathRows,
    computeRecommendation,
    computePathRecommendation,
} from "./recommendationEngine";
import "./BuyingOptions.scss";

function GlossaryTerm({ term, children }) {
    return (
        <Tooltip
            title={
                <Box sx={{ p: 0.5 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5, color: green[200] }}>
                        {term}
                    </Typography>
                    <Typography variant="caption" sx={{ lineHeight: 1.5 }}>
                        {glossary[term]}
                    </Typography>
                </Box>
            }
            arrow
            placement="top"
        >
            <Box component="span" className="glossaryTerm">
                {children ?? term}
            </Box>
        </Tooltip>
    );
}

function ReasonCard({ icon, label, title, body }) {
    return (
        <Card variant="outlined" className="reasonCard">
            <CardContent>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                    {icon}
                    <Typography variant="caption" className="reasonCard__label">
                        {label}
                    </Typography>
                </Stack>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                    {title}
                </Typography>
                <Typography variant="body2" sx={{ color: grey[700], lineHeight: 1.6 }}>
                    {body}
                </Typography>
            </CardContent>
        </Card>
    );
}

function ProfileSummary({ profile, updateProfile, editing, setEditing }) {
    if (editing) {
        const fields = [
            { key: "saved", label: "Saved: $", width: 100 },
            { key: "creditScore", label: "Credit:", width: 70 },
            { key: "homePrice", label: "Target: $", width: 110 },
        ];
        return (
            <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
                {fields.map((f) => (
                    <label key={f.key} style={{ fontSize: 14 }}>
                        {f.label}
                        <input
                            type="number"
                            value={profile[f.key]}
                            onChange={(e) => updateProfile({ [f.key]: Number(e.target.value) })}
                            style={{ width: f.width, marginLeft: 4, padding: "2px 6px" }}
                        />
                    </label>
                ))}
                <Button size="small" onClick={() => setEditing(false)} sx={{ color: green[800], fontWeight: 600 }}>
                    Done
                </Button>
            </Stack>
        );
    }
    return (
        <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
            <Typography variant="body2"><strong>{fmt(profile.saved)}</strong> saved</Typography>
            <Box sx={{ color: grey[400] }}>•</Box>
            <Typography variant="body2">Credit <strong>{profile.creditScore}</strong></Typography>
            <Box sx={{ color: grey[400] }}>•</Box>
            <Typography variant="body2">Target <strong>{fmt(profile.homePrice)}</strong></Typography>
        </Stack>
    );
}

function NumberStat({ label, value, valueColor, caption }) {
    return (
        <Box sx={{ flex: 1 }}>
            <Typography variant="caption" className="numberStat__label">
                {label}
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 700, mt: 0.5, color: valueColor ?? "inherit" }}>
                {value}
            </Typography>
            {caption}
        </Box>
    );
}

function BuyingOptions() {
    const navigate = useNavigate();
    const { profile, updateProfile } = useBuyerProfile();
    const [showFullComparison, setShowFullComparison] = useState(false);
    const [showWhy, setShowWhy] = useState(true);
    const [editingProfile, setEditingProfile] = useState(false);

    const recommendation = useMemo(() => computeRecommendation(profile), [profile]);
    const pathRec = useMemo(() => computePathRecommendation(profile), [profile]);

    const downPayment = profile.homePrice * 0.035;
    const estMonthly = Math.round(profile.homePrice * 0.965 * 0.0065 + profile.homePrice * 0.001);
    const method = methodMeta[recommendation.method];

    return (
        <Box className="financingContainer">
            <Box sx={{ mb: 5 }}>
                <Typography variant="overline" className="financingContainer__eyebrow">
                    Financing
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 700, color: grey[900], lineHeight: 1.15, mb: 1.5 }}>
                    How will you pay for it?
                </Typography>
                <Typography variant="h6" sx={{ color: grey[600], maxWidth: 720, fontWeight: 400 }}>
                    There's no single right answer — the best path depends on your savings,
                    credit, and timeline. Here's what we recommend for <em>you</em>.
                </Typography>
            </Box>

            <Card elevation={3} className="recommendationCard">
                <Box className="recommendationCard__profileBar">
                    <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
                        <Typography variant="caption" className="recommendationCard__eyebrow">
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
                            startIcon={<EditIcon fontSize="small" />}
                            onClick={() => setEditingProfile(true)}
                            sx={{ color: green[800], fontWeight: 600 }}
                        >
                            Edit
                        </Button>
                    )}
                </Box>

                <CardContent sx={{ p: 5 }}>
                    <Typography variant="overline" sx={{ color: grey[600], fontWeight: 600, letterSpacing: 2 }}>
                        Our recommendation
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: grey[900], mt: 1, mb: 3, lineHeight: 1.2 }}>
                        Start with an <GlossaryTerm term="FHA">{method.label.toLowerCase()}</GlossaryTerm>
                        {" · "}work with a {pathRec.path.toLowerCase()}
                    </Typography>

                    <Stack direction={{ xs: "column", md: "row" }} spacing={3} sx={{ mb: 4 }}>
                        <ReasonCard
                            icon={<AccountBalanceWalletIcon fontSize="small" sx={{ color: green[700] }} />}
                            label="Financing Method"
                            title={method.label}
                            body={recommendation.reason}
                        />
                        <ReasonCard
                            icon={<HomeIcon fontSize="small" sx={{ color: green[700] }} />}
                            label="Acquisition Path"
                            title={pathRec.path}
                            body={pathRec.reason}
                        />
                    </Stack>

                    <Box sx={{ borderTop: `1px solid ${grey[200]}`, pt: 3 }}>
                        <Typography variant="overline" sx={{ color: grey[600], fontWeight: 600, letterSpacing: 2, mb: 2, display: "block" }}>
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
                                                <CheckCircleOutlineIcon fontSize="inherit" sx={{ color: green[700] }} />
                                                <Typography variant="caption" sx={{ color: green[700] }}>Enough for down payment</Typography>
                                            </>
                                        ) : (
                                            <>
                                                <WarningAmberIcon fontSize="inherit" sx={{ color: amber[800] }} />
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
                        startIcon={showWhy ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        sx={{ mt: 3, color: green[800], fontWeight: 600, textTransform: "none" }}
                    >
                        Why we recommended this
                    </Button>
                    <Collapse in={showWhy}>
                        <Box className="reasoningPanel">
                            <Stack spacing={1.5}>
                                <Stack direction="row" spacing={1.5} alignItems="flex-start">
                                    <CheckCircleOutlineIcon fontSize="small" sx={{ color: green[700], mt: 0.25, flexShrink: 0 }} />
                                    <Typography variant="body2" sx={{ color: grey[800], lineHeight: 1.6 }}>
                                        Your credit score of <strong>{profile.creditScore}</strong>
                                        {profile.creditScore < 620
                                            ? " is below the typical 620 threshold for conventional loans — FHA accepts down to 580."
                                            : " qualifies for both conventional and FHA loans."}
                                    </Typography>
                                </Stack>
                                <Stack direction="row" spacing={1.5} alignItems="flex-start">
                                    <CheckCircleOutlineIcon fontSize="small" sx={{ color: green[700], mt: 0.25, flexShrink: 0 }} />
                                    <Typography variant="body2" sx={{ color: grey[800], lineHeight: 1.6 }}>
                                        At 3.5% down, you'd need ~{fmt(downPayment)} — {profile.saved >= downPayment ? "within" : "more than"} your {fmt(profile.saved)} saved.
                                        {" "}Remember to leave room for <GlossaryTerm term="Closing costs">closing costs</GlossaryTerm> (~$5,000-$7,000).
                                    </Typography>
                                </Stack>
                                {recommendation.method === "FHA" && (
                                    <Stack direction="row" spacing={1.5} alignItems="flex-start">
                                        <WarningAmberIcon fontSize="small" sx={{ color: amber[700], mt: 0.25, flexShrink: 0 }} />
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
                <Typography variant="overline" sx={{ color: grey[600], letterSpacing: 2, fontWeight: 600 }}>
                    Compare all options
                </Typography>
                <Box className="compareDivider__line" />
            </Stack>

            <Typography variant="body2" sx={{ color: grey[600], mb: 3, maxWidth: 720 }}>
                Want to see the full picture? Here's how every financing method and acquisition path compares. Your recommended options are highlighted.
            </Typography>

            <Button
                onClick={() => setShowFullComparison(!showFullComparison)}
                startIcon={showFullComparison ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                sx={{ mb: 4, color: green[800], fontWeight: 600, textTransform: "none" }}
            >
                {showFullComparison ? "Hide" : "Show"} full comparison tables
            </Button>

            <Collapse in={showFullComparison}>
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
            </Collapse>

            <Card variant="outlined" className="nextStepCard">
                <CardContent>
                    <Typography variant="overline" sx={{ color: grey[600], letterSpacing: 2, fontWeight: 600 }}>
                        Next step
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        Understand the hidden costs
                    </Typography>
                    <Typography variant="body2" sx={{ color: grey[600], mt: 0.5 }}>
                        Closing costs, PMI, inspections, and escrow — what your down payment doesn't cover.
                    </Typography>
                </CardContent>
                <Button
                    variant="contained"
                    size="large"
                    endIcon={<TrendingFlatIcon />}
                    onClick={() => navigate("/CS422/HiddenCosts")}
                    className="nextStepCard__cta"
                >
                    Continue
                </Button>
            </Card>
        </Box>
    );
}

export default BuyingOptions;
