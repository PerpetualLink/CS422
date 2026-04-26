import { Box, Button, FormControl, InputAdornment, InputLabel, OutlinedInput, Stack, TextField, Typography } from "@mui/material";
import { green, grey } from "@mui/material/colors";
import { fmt } from "../recommendationEngine";
import { Circle } from "@mui/icons-material";

const typographyStyling = {
    fontSize: "1rem",
};

function ProfileSummary({ profile, updateProfile, editing }) {
    const handleUpdate = (e, f) => {
        const rawValue = e.target.value.replace(/,/g, '');

        const maxValue = f?.max;

        if (maxValue) {
            if (e.target.value >= 0 && e.target.value <= maxValue) {
                updateProfile({ [f.key]: Number(rawValue) });
            }
        }
        else {
            updateProfile({ [f.key]: Number(rawValue) });
        }
    }

    const fields = [
        { key: "saved", label: "Savings:", icon: "$", width: String(profile.saved).length * 8 + 30 },
        { key: "homePrice", label: "Home Price:", icon: "$", width: String(profile.homePrice).length * 8 + 30 },
        { key: "downPercent", label: "Down Payment:", end: true, icon: "%", max: 100, width: String(profile.downPercent).length * 8 + 20},
        { key: "creditScore", label: "Credit:", max: 850, width: 38 },
    ];
    
    const styles = {
        enabled: { paddingLeft: 4, paddingRight: 0, height: "24px", backgroundColor: "white" },
        disabled: { paddingLeft: 4, paddingRight: 0, height: "24px", backgroundColor: "transparent" }
    }

    return (
        <div style={{ display: "flex", flexGrow: 1, gap: "16px" }}>
            {fields.map((f, index) => (
                <label key={f.key} style={{ display: "flex", fontSize: "1rem" }}>
                    <Typography sx={{ fontSize: "1rem", marginRight: "4px", fontWeight: "bold" }} >{f.label}</Typography>
                    {editing ? (
                        <FormControl>
                            <OutlinedInput
                                startAdornment={((f?.icon) && (!f?.end)) && <InputAdornment position="start" style={{ margin: "unset" }}>{f.icon}</InputAdornment>}
                                endAdornment={(f?.end) && <InputAdornment position="end" style={{ margin: "unset" }}>{f.icon}</InputAdornment>}
                                disabled={!editing}
                                onChange={(e) => handleUpdate(e, f)}
                                inputProps={{ min: 0, max: (f?.max) && 100 }}
                                value={profile[f.key].toLocaleString('en-US')}
                                style={{ 
                                    paddingLeft: 4,
                                    paddingRight: 0,
                                    height: "24px",
                                    width: f.width,
                                    backgroundColor: "white",
                                }}
                                slotProps={{
                                    input: {
                                        style: {
                                            paddingRight: 0,
                                            paddingLeft: 0,                                        
                                        }
                                    }
                                }}
                            />
                        </FormControl>
                    ) : (
                        <div style={{ display: "inline-flex", width: f.width }}>
                            <Typography>{(f?.icon) && (!f?.end) && "$"}</Typography>
                            <Typography>{profile[f.key].toLocaleString('en-US')}</Typography>
                            <Typography>{(f?.end) && "%"}</Typography>
                        </div>
                    )}
                    {(index < 3) && <Circle sx={{ alignSelf: "center", marginLeft: "12px", fontSize: "0.5rem", color: grey[400] }}/>}
                </label>
            ))}
        </div>
    );
}
export default ProfileSummary;