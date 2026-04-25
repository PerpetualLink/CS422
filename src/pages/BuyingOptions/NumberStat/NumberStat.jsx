import { Box, Button, Switch, Typography } from "@mui/material";
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
                <Button
                    className={`numberStat__label toggle`}
                    style={{
                        color: "black",
                        fontWeight: (!isOn) && "700",
                        height: "20px",
                        padding: "8px",
                        fontSize: "0.7rem",
                        marginRight: "2px",
                        backgroundColor: (!isOn) && "rgba(129,212,250,0.3)"
                    }}
                    onClick={handleToggle}
                >
                    {"Custom"}
                </Button>
                <Button
                    className="numberStat__label toggle"
                    style={{
                        color: "black",
                        fontWeight: (isOn) && "700",
                        height: "20px",
                        padding: "8px",
                        minWidth: "unset",
                        fontSize: "0.7rem",
                        borderRadius: "999px",
                        backgroundColor: (isOn) && "rgba(129,212,250,0.3)"
                    }}
                    onClick={handleToggle}
                >
                    {"FHA"}
                </Button>
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