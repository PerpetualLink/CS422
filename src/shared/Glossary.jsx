import { useEffect, useState } from "react";
import { Button, Drawer, Box, Typography, IconButton, InputAdornment, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { keywords } from "./GlossaryTerms.js";
import "./Glossary.scss";
import { Search } from "@mui/icons-material";

function Glossary() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [searchWord, setSearchWord] = useState("");
    const [wordList, setWordList] = useState(keywords);

    useEffect(() => {
        if (searchWord) {
            const newWordList = keywords.filter((word) => word.TERM.includes(searchWord));

            if (newWordList.length > 0) {
                setWordList(newWordList);
            }
        }
        else if (wordList !== keywords) {
            setWordList(keywords);
        }
    }, [keywords, searchWord, wordList])

    return (
        <div className={"container"}>
            <Button
                className="glossaryButton"
                variant="contained"
                startIcon={<MenuBookIcon />}
                onClick={() => setIsDrawerOpen(prev => !prev)}
            >
                {"Glossary"}
            </Button>

            <Drawer
                anchor="right"
                open={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: 400,
                        maxWidth: '90vw',
                        boxSizing: 'border-box',
                    },
                }}
            >
                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "20px 24px",
                    bgcolor: "#f5f5f5",
                    borderBottom: "1px solid #e0e0e0",
                    position: "sticky",
                    top: 0,
                    zIndex: 1
                }}>
                    <Typography variant="h5" sx={{ fontWeight: "bold", color: "#1b1b1b" }}>
                        {"Glossary"}
                    </Typography>
                    <IconButton onClick={() => setIsDrawerOpen(false)}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <TextField
                    onChange={(e) => setSearchWord(e.target.value)}
                    placeholder={"Search for a term..."}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position={"start"}>
                                    <Search />
                                </InputAdornment>
                            )
                        }
                    }}
                    sx={{
                        borderBottom: "1px solid lightgrey",
                        padding: "16px 16px 8px"
                    }}
                    value={searchWord}
                    variant={"outlined"}
                />
                <Box sx={{
                    padding: "8px 24px 24px",
                    overflowY: "auto",
                    flex: 1
                }}>
                    {wordList.map((item, index) => (
                        <Box key={index} sx={{ marginBottom: "24px" }}>
                            <Typography variant="h6" sx={{ 
                                fontWeight: "bold", 
                                color: "#43A047", 
                                marginBottom: "8px" 
                            }}>
                                {item.TERM}
                            </Typography>
                            <Typography variant="body2" sx={{ 
                                color: "#555", 
                                lineHeight: 1.6 
                            }}>
                                {item.DEFINITION}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Drawer>
        </div>
    );
}

export default Glossary;
