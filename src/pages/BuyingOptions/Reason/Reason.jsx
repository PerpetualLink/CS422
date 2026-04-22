import { Card, CardContent, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import "./Reason.scss";

function Reason({ body, icon, label, title }) {
    return (
        <Card variant="outlined" className="reason">
            <CardContent>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                    {icon}
                    <Typography variant="caption" className="label">
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

export default Reason;