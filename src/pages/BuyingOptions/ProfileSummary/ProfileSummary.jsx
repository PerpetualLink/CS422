import { Box, Button, FormControl, InputAdornment, InputLabel, OutlinedInput, Stack, TextField, Typography } from "@mui/material";
import { green, grey } from "@mui/material/colors";
import { fmt } from "../recommendationEngine";

const typographyStyling = {
    fontSize: "1rem",
};

function ProfileSummary({ profile, updateProfile, editing, setEditing }) {
    if (editing) {
        const handleUpdate = (e, f) => {
            const maxValue = f?.max;

            if (maxValue) {
                if (e.target.value >= 0 && e.target.value <= maxValue) {
                    updateProfile({ [f.key]: Number(e.target.value) });
                }
            }
            else {
                updateProfile({ [f.key]: Number(e.target.value) });
            }
        }

        const fields = [
            { key: "saved", label: "Saved:", icon: "$", width: 110 },
            { key: "creditScore", label: "Credit:", max: 850, width: 100 },
            { key: "homePrice", label: "Target:", icon: "$", width: 110 },
            { key: "downPercent", label: "Down Payment:", end: true, icon: "%", max: 100, width: 110 },
        ];
        return (
            <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap" sx={{ flexGrow: 1 }}>
                {fields.map((f) => (
                    <label key={f.key} style={{ display: "flex", fontSize: "1rem" }}>
                        <FormControl>
                            <InputLabel sx={{ fontWeight: "bold"}}>
                                {f.label}
                            </InputLabel>
                            <OutlinedInput
                                startAdornment={((f?.icon) && (!f?.end)) && <InputAdornment position="start" style={{ margin: "unset" }}>{f.icon}</InputAdornment>}
                                endAdornment={(f?.end) && <InputAdornment position="end" style={{ margin: "unset" }}>{f.icon}</InputAdornment>}
                                onChange={(e) => handleUpdate(e, f)}
                                type={"number"}
                                label={f.label}
                                inputProps={{ min: 0, max: (f?.max) && 100 }}
                                value={profile[f.key]}
                                style={{ 
                                    paddingLeft: 4,
                                    height: "40px",
                                    width: f.width,
                                    backgroundColor: "white",
                                }}
                                slotProps={{
                                    input: {
                                        style: {
                                            paddingRight: 0
                                        }
                                    }
                                }}
                            />
                        </FormControl>
                    </label>
                ))}
                <div style={{ flexGrow: 1 }}/>
                <Button size="small" onClick={() => setEditing(false)} sx={{ color: green[800], fontWeight: 600 }}>
                    Done
                </Button>
            </Stack>
        );
    }
    return (
        <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
            <Typography sx={typographyStyling}>Saved <strong>{fmt(profile.saved)}</strong></Typography>
            <Box sx={{ color: grey[400] }}>•</Box>
            <Typography sx={typographyStyling}>Credit <strong>{profile.creditScore}</strong></Typography>
            <Box sx={{ color: grey[400] }}>•</Box>
            <Typography sx={typographyStyling}>Target <strong>{fmt(profile.homePrice)}</strong></Typography>
            <Box sx={{ color: grey[400] }}>•</Box>
            <Typography sx={typographyStyling}>Down Payment <strong>{(profile.downPercent)}%</strong></Typography>
        </Stack>
    );
}
export default ProfileSummary;