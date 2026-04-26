import { Box, Switch, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import "./NumberStat.scss";
import { useState } from "react";

function NumberStat({ altCaption, altValue, label, value, valueColor, caption, onToggle, toggle }) {
    const [isOn, setIsOn] = useState(true);

    const handleToggle = () => {
        setIsOn((prev) => !prev);
        onToggle((prev) => !prev);
    }

    return (
        <Box sx={{ flex: 1 }}>
            <div
                style={{
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "row",
                    flexGrow: 1,
                    // justifyContent: "center"
                }}
            >
            <Typography
                className="numberStat__label"
                variant="caption"
                sx={{ flexGrow: 1}}
            >
                {label}
            </Typography>
            {(toggle) && (
            <div
                style={{
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "row",
                    // justifyContent: "center"
                }}
            >
                <ToggleButtonGroup onClick={handleToggle}>
                    <ToggleButton
                        className={`numberStat__label toggle`}
                        selected={!isOn}
                        style={{
                            color: "black",
                            fontWeight: (!isOn) && "700",
                            height: "20px",
                            padding: "8px",
                            fontSize: "0.7rem",
                            backgroundColor: (!isOn) ? "#80CBC4" : "#FAFAFA"
                        }}
                    >
                        {"Custom"}
                    </ToggleButton>
                    <ToggleButton
                        className="numberStat__label toggle"
                        selected={isOn}
                        style={{
                            color: "black",
                            fontWeight: (isOn) && "700",
                            height: "20px",
                            padding: "8px",
                            fontSize: "0.7rem",
                            backgroundColor: (isOn) ? "#80CBC4" : "#FAFAFA"
                        }}
                    >
                        {"FHA"}
                    </ToggleButton>
                </ToggleButtonGroup>
                </div>
            )}
            </div>
            <Typography
                variant="h5"
                sx={{
                    color: valueColor ?? "inherit",
                    fontWeight: 700,
                    mt: 0.5
                }}
            >
                {value}
            </Typography>
            <div
                style={{
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "row",
                    // justifyContent: "center"
                }}
            >
            {caption}
            </div>
        </Box>
    );
}

export default NumberStat;