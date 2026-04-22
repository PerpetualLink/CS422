import { Box, Typography } from "@mui/material";
import "./NumberStat.scss";

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

export default NumberStat;