import { useState, useCallback } from "react";
import { useBuyerProfile } from "./BuyerProfileContext";
import { Button, Checkbox, FormControl, FormControlLabel, FormLabel, InputAdornment, InputLabel, LinearProgress, OutlinedInput, Radio, RadioGroup, Typography } from "@mui/material";
import GlossaryTerm from "../pages/BuyingOptions/GlossaryTerm";

function fmt(value) {
  return value.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export default function HomeSavingsCalculator({ onClose, isDraggable = true }) {
  // Hook into the shared buyer profile. Every edit flows through updateProfile
  // so the Financing page sees the same values.
  const { profile, updateProfile } = useBuyerProfile();
  const { homePrice, downPercent, pmi, saved, creditScore } = profile;

  const downPayment = homePrice * (downPercent / 100);
  const closingCosts = homePrice * 0.03;
  const pmiBuffer = pmi ? 2000 : 0;
  const recommendedSavings = downPayment + closingCosts + 5000 + pmiBuffer;
  const percent = Math.min(saved / homePrice, 1) * 100;
  const targetPercent = (recommendedSavings / homePrice) * 100;

  const ratio = saved / recommendedSavings;
  const barColor = ratio < 0.5 ? "#E5484D" : ratio < 1 ? "#F5A524" : "#22C55E";

  const styles = {
  arrowDown: { borderLeft: "7px solid transparent", borderRight: "7px solid transparent", borderTop: "7px solid #000", height: 0, marginLeft: "-5.5px", width: 0 },
  arrowUp: { borderBottom: "7px solid #000", borderLeft: "7px solid transparent", borderRight: "7px solid transparent", height: 0, marginLeft: "-5.5px", width: 0 },
  currentLabel: { left: `calc(392px * ${percent / 100})`, position: "relative", width: "fit-content" },
  goalLine: { background: "black", height: "16px", left: `calc(392px * ${(targetPercent > 100) ? 1 : targetPercent / 100})`, marginTop: "-31px", position: "relative", width: "2px" },
  goalLabels: { display: "flex", fontFamily: "Roboto, san-serif", fontSize: 12, justifyContent: "space-between", margin: "0 -10px 0" },
  label: { fontFamily: "Roboto, san-serif", fontSize: 14, marginTop: 10 },
  targetLabel: { left: `calc(392px * ${(targetPercent > 100) ? 1 : targetPercent / 100})`, position: "relative", top: "15px" },
  title: { fontSize: "1.2rem", fontWeight: "bold", textAlign: "center" },
  wrapper: { position: "relative", display: "flex", flexDirection: "column", gap: 16, padding: 16, borderRadius: 14, background: "#fff", boxShadow: "0 8px 32px rgba(0,0,0,0.18)", fontFamily: "Inter", maxWidth: 440 },
};

  return (
    <div>
      <div style={styles.wrapper}>
        <div>
          <Typography style={styles.title}>
            {"Savings Calculator"}
          </Typography>
          <div style={{ padding: "24px", marginBottom: "12px" }}>
            <LinearProgress
              sx={{
                borderRadius: "999px",
                height: "16px",
              }}
              value={percent}
              variant={"determinate"}
            />
            <div style={styles.goalLabels}><span>{"$0"}</span><span>{fmt(homePrice)}</span></div>
            <div
              style={styles.goalLine}
            />
            <div style={styles.targetLabel} >
              <div style={styles.arrowUp} />
              <div
                style={{
                  fontFamily: "Roboto, san-serif",
                  marginLeft: "-50px"
                }}
              >
                {`Recommended: ${fmt(recommendedSavings)}`}
              </div>
            </div>
          </div>

          <FormControl fullWidth sx={{ marginBottom: "16px"}}>
            <InputLabel sx={{ fontWeight: "bold"}}>
              {"Amount Saved"}
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              label="Amount Saved"
              onChange={(e) => updateProfile({ saved: Number(e.target.value) })}
              type={"number"}
              value={saved}
            />
          </FormControl>

          <FormControl fullWidth sx={{ marginBottom: "16px"}}>
            <InputLabel sx={{ fontWeight: "bold"}}>
              {"House Price"}
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              label="House Price"
              onChange={(e) => updateProfile({ homePrice: Number(e.target.value) })}
              type={"number"}
              value={homePrice}
            />
          </FormControl>

          <FormControl sx={{ margin: "0 16px 16px 0", width: "122px"}}>
            <InputLabel sx={{ fontWeight: "bold"}}>
              {"Down Payment %"}
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              endAdornment={<InputAdornment position="end">%</InputAdornment>}
              label="Down Payment %"
              type={"number"}
              onChange={(e) => {
                if (e.target.value <= 100 && e.target.value >= 0) {
                  updateProfile({ downPercent: Number(e.target.value) })
                }
              }}
              value={downPercent}
              inputProps={{ min: 0, max: 100 }}
            />
          </FormControl>

          <FormControl sx={{ margin: "0 16px 16px 0", width: "100px" }}>
            <InputLabel sx={{ fontWeight: "bold"}}>
              {"Credit Score"}
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              label="Credit Score"
              inputProps={{ min: 300, max: 850 }}
              onChange={(e) => {
                if (e.target.value >= 0 && e.target.value <= 850) {
                  updateProfile({ creditScore: Number(e.target.value) })
                }
              }}
              type={"number"}
              value={creditScore}
            />
          </FormControl>

          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label"><GlossaryTerm term={"PMI"}>PMI</GlossaryTerm> Required?</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={false}
              name="radio-buttons-group"              
              onChange={(e) => updateProfile({ pmi: e.target.value === "true" })}
              style={{ display: "flex", flexDirection: "row" }}
            >
              <FormControlLabel value={true} control={<Radio />} label="Yes" />
              <FormControlLabel value={false} control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        </div>

        <div>
          <div style={{ marginTop: 4, marginBottom: 12, borderTop: "1px solid #eee" }} />

          <div style={{ fontFamily: "Roboto, san-serif", fontSize: 14, lineHeight: "22px" }}>
            <p>Down Payment: {fmt(downPayment)}</p>
            <p>Closing Costs (~3%): {fmt(closingCosts)}</p>
            <p>Moving / Repair Buffer: {fmt(5000)}</p>
            {pmi && <p>PMI Cushion: {fmt(pmiBuffer)}</p>}
          </div>

          <div style={{ fontFamily: "Roboto", marginTop: 16, fontWeight: 600, fontSize: 16 }}>
            Recommended Savings:
            <span style={{ display: "block", fontSize: 24, marginTop: 4 }}>
              {fmt(recommendedSavings)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}