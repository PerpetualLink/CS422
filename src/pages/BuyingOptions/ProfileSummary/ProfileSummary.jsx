import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { green, grey } from "@mui/material/colors";
import { fmt } from "../recommendationEngine";

const typographyStyling = {
    fontSize: "1rem",
};

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
                    <label key={f.key} style={{ display: "flex", fontSize: "1rem" }}>
                        <div style={{ alignContent: "center"}}>
                            {f.label}
                        </div>
                        <TextField
                            type={"number"}
                            value={profile[f.key]}
                            onChange={(e) => updateProfile({ [f.key]: Number(e.target.value) })}
                            style={{ 
                                marginLeft: "1px",
                                padding: "2px 6px",
                                width: f.width
                            }}
                            sx={{
                                "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
                                display: "none",
                                },
                                "& input[type=number]": {
                                MozAppearance: "textfield",
                                }
                            }}
                            slotProps={{
                                input: {
                                    sx: {
                                        backgroundColor: "white",
                                        height: "24px"
                                    }
                                }
                            }}
                        />
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
        </Stack>
    );
}
export default ProfileSummary;