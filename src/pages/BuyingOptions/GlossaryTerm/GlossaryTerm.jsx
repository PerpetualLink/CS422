import { Box, Tooltip, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import { keywords } from "../../../shared/GlossaryTerms";
import "./GlossaryTerm.scss";


function GlossaryTerm({ term, children }) {
    return (
        <Tooltip
            title={
                <Box sx={{ p: 0.5 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5, color: green[200] }}>
                        {term}
                    </Typography>
                    <Typography variant="caption" sx={{ lineHeight: 1.5 }}>
                        {keywords.find((word) => word.TERM.includes(term)).DEFINITION}
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
    )
}

export default GlossaryTerm;