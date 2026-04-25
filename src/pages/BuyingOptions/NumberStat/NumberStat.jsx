import { Box, Button, Switch, Typography } from "@mui/material";
import "./NumberStat.scss";
import { useState } from "react";

function NumberStat({ altCaption, altValue, label, value, valueColor, caption, toggle }) {
    const [isOn, setIsOn] = useState(true);

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
                    onClick={() => setIsOn((prev) => !prev)}
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
                    onClick={() => setIsOn((prev) => !prev)}
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
                {(!isOn) ? altValue : value}
            </Typography>
            <div
                style={{
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "row",
                    // justifyContent: "center"
                }}
            >
            {(!isOn) ? altCaption : caption}
            </div>
        </Box>
    );
}

export default NumberStat;