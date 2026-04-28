import { amber, green, grey, red } from "@mui/material/colors";
import {
    Box,
    Card,
    Chip,
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableHead,
    TableRow,
    Typography,
    styled,
} from "@mui/material";
import GlossaryTerm from "./GlossaryTerm";

const StyledCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: green[50],
        fontWeight: 600,
        fontSize: "1rem",
        paddingLeft: 16,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: "0.95rem",
        paddingLeft: 16,
    },
}));

const HighlightedHeader = styled(TableCell)(() => ({
    backgroundColor: green[100],
    color: green[900],
    fontWeight: 700,
    fontSize: "1rem",
    paddingLeft: 16,
}));

const HighlightedBody = styled(TableCell)(() => ({
    backgroundColor: green[50],
    fontSize: "0.95rem",
    paddingLeft: 16,
}));

const riskColor = (value) => {
    if (value === "Low") return green[800];
    if (value === "Very high") return red[700];
    if (value === "Moderate") return amber[800];
    return "inherit";
};

function ComparisonTable({ title, description, columns, rows, recommended }) {
    return (
        <Box sx={{ mb: 6 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
                {title}
            </Typography>
            <Typography variant="body2" sx={{ color: grey[600], mb: 2 }}>
                {description}
            </Typography>
            <Card variant="outlined">
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledCell>Factor</StyledCell>
                            {columns.map((col) => {
                                const HeaderCell = col === recommended ? HighlightedHeader : StyledCell;
                                return (
                                    <HeaderCell key={col}>
                                        {<GlossaryTerm term={col}>{col}</GlossaryTerm>}
                                        {col === recommended && (
                                            <Chip
                                                label="Recommended"
                                                size="small"
                                                sx={{
                                                    backgroundColor: green[700],
                                                    color: "white",
                                                    fontSize: "0.7rem",
                                                    height: 20,
                                                    ml: 1,
                                                }}
                                            />
                                        )}
                                    </HeaderCell>
                                );
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => {
                            const isRiskRow = row.label === "Risk level for first-time buyer";
                            return (
                                <TableRow key={row.label}>
                                    <StyledCell
                                        sx={{
                                            fontWeight: 500,
                                            color: row.isItalic ? grey[600] : "inherit",
                                            textTransform: row.isItalic ? "uppercase" : "none",
                                            fontSize: row.isItalic ? "0.75rem" : "0.95rem",
                                            letterSpacing: row.isItalic ? 1 : 0,
                                        }}
                                    >
                                        {row.label}
                                    </StyledCell>
                                    {columns.map((col) => {
                                        const Cell = col === recommended ? HighlightedBody : StyledCell;
                                        const value = row.values[col];
                                        return (
                                            <Cell
                                                key={col}
                                                sx={{
                                                    fontStyle: row.isItalic ? "italic" : "normal",
                                                    fontWeight:
                                                        (col === recommended && !row.isItalic) || isRiskRow
                                                            ? 600
                                                            : 400,
                                                    color: isRiskRow ? riskColor(value) : "inherit",
                                                }}
                                            >
                                                {value}
                                            </Cell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Card>
        </Box>
    );
}

export default ComparisonTable;
