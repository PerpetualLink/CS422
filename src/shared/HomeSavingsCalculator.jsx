import { useState, useCallback, useEffect } from "react";
import { useBuyerProfile } from "./BuyerProfileContext";
import { Button, Checkbox, FormControl, FormControlLabel, FormLabel, InputAdornment, InputLabel, LinearProgress, OutlinedInput, Radio, RadioGroup, Typography } from "@mui/material";
import GlossaryTerm from "../pages/BuyingOptions/GlossaryTerm";
import "./HomeSavingsCalculator.scss";
import { PieChart } from "@mui/x-charts";
import { green, grey } from "@mui/material/colors";

function fmt(value) {
  return value.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export default function HomeSavingsCalculator({ onClose, isDraggable = true }) {
  // Hook into the shared buyer profile. Every edit flows through updateProfile
  // so the Financing page sees the same values.
  const { profile, updateProfile } = useBuyerProfile();
  const { monthlySave, homePrice, downPercent, pmi, saved, creditScore } = profile;

  const [savingsField, setSavingsField] = useState(saved);
  const [homePriceField, setHomePriceField] = useState(homePrice);
  const [downPaymentField, setDownPaymentField] = useState(downPercent);

  const downPayment = homePrice * (downPercent / 100);
  const closingCosts = homePrice * 0.03;
  const pmiBuffer = pmi ? homePrice * 0.015 : 0;
  const recommendedSavings = downPayment + closingCosts + 5000 + pmiBuffer;
  const percent = Math.min(saved / homePrice, 1) * 100;
  const targetPercent = (saved / recommendedSavings) * 100;
  const [monthlySavings, setMonthlySavings] = useState(monthlySave);
  const monthsToGoal = (((recommendedSavings - saved) / monthlySavings) > 0) ? ((recommendedSavings - saved) / monthlySavings) : 0;

  const ratio = saved / recommendedSavings;
  const barColor = "good";

  const [data, setData] = useState([
    { id: 0, label: 'Closing Costs', value: homePrice * 0.03, color: '#00C49F' },
    { id: 1, label: 'Down Payment', value: downPayment, color: '#29B6F6' },
    { id: 2, label: 'Moving Buffer', value: 5000, color: '#FFD54F' },
  ]);

  useEffect(() => {
    let newData = [...data];

    newData[0].value = homePrice * 0.03;
    newData[1].value = downPayment;

    if (pmi) {
      if (newData.filter((item) => item.id === 3).length === 0) {
        newData.push({ id: 3, label: 'PMI', value: pmiBuffer, color: '#E57373' });
      }
      else {
        newData[3].value = pmiBuffer;
      }
    }
    else {
      newData = newData.filter((item) => item.id !== 3);
    }

    setData(newData);
  }, [downPayment, homePrice, pmi]);

  const settings = {
    margin: { right: 5 },
    width: 250,
    height: 250,
  };

  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  });

  const abbreviationFormatter = new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  });

  const renderLabel = (dataPoint) => {
    if ((dataPoint.endAngle - dataPoint.startAngle) >= 0.7) {
      return currencyFormatter.format(dataPoint.value);
    }
    else if ((dataPoint.endAngle - dataPoint.startAngle) >= 0.39) {
        return  new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          notation: 'compact',
          maximumFractionDigits: 1,
        }).format(dataPoint.value);
    }
  }

  const styles = {
  arrowDown: { borderLeft: "7px solid transparent", borderRight: "7px solid transparent", borderTop: "7px solid #000", height: 0, marginLeft: "-5.5px", width: 0 },
  arrowUp: { borderBottom: "7px solid #000", borderLeft: "7px solid transparent", borderRight: "7px solid transparent", height: 0, marginLeft: "-5.5px", width: 0 },
  currentLabel: { left: `calc(360px * ${percent / 100})`, position: "relative", width: "fit-content" },
  editContainer: { padding: "16px 16px 0" },
  goalLine: { background: "black", height: "20px", left: `calc(360px * ${(targetPercent > 100) ? 1 : targetPercent / 100})`, marginTop: "-38.5px", position: "relative", width: "2px", transition: "left 450ms ease-in-out" },
  goalLabels: { display: "flex", fontFamily: "Roboto, san-serif", fontSize: "0.9rem", justifyContent: "space-between", margin: "0 -10px 0" },
  label: { fontFamily: "Roboto, san-serif", fontSize: 14, marginTop: 10 },
  resultContainer: { padding: "0 0 16px 0" },
  targetLabel: { left: `calc(360px * ${(targetPercent > 100) ? 1 : targetPercent / 100})`, position: "relative", top: "15px", transition: "left 400ms ease-in-out" },
  title: { fontSize: "1.4rem", fontWeight: "bold", textAlign: "center", marginBottom: "8px" },
  wrapper: { position: "relative", display: "flex", flexDirection: "column", gap: 16, borderRadius: 14, background: "#fff", boxShadow: "0 8px 32px rgba(0,0,0,0.18)", fontFamily: "Inter", maxWidth: 440 },
};

  return (
    <div>
      <div style={styles.wrapper}>
        <div style={styles.editContainer}>
          <Typography style={styles.title}>
            {"Savings Calculator"}
          </Typography>
          <div style={{ padding: "18px 24px 24px", marginBottom: "12px" }}>
            <LinearProgress
              classes={{
                bar1: barColor
              }}
              value={(saved/recommendedSavings * 100 <= 100) ? saved/recommendedSavings * 100 : 100 }
              variant={"determinate"}
            />
            <div style={{ fontFamily: "Roboto, san-serif", position: "absolute", top: "60px", fontSize: "0.9rem", left: "32px" }}>{`${(saved/recommendedSavings * 100).toFixed(0)}% to Goal`}</div>
            <div style={{ fontFamily: "Roboto, san-serif", position: "absolute", top: "60px", fontSize: "0.9rem", right: "32px" }}>{fmt(recommendedSavings)}</div>
            <div style={styles.goalLabels}><span>{"$0"}</span></div>
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
                {`Current: ${fmt(saved)}`}
              </div>
            </div>
          </div>

          <FormControl sx={{ margin: "0 4px 16px 0", width: "calc(50% - 8px)"}}>
            <InputLabel sx={{ fontWeight: "bold"}}>
              {"Current Savings"}
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              label="Current Savings"
              onChange={(e) => {
                const rawValue = e.target.value.replace(/,/g, '');

                updateProfile({ saved: Number(rawValue) });
                setSavingsField(Number(rawValue));
              }}
              value={savingsField.toLocaleString('en-US')}
            />
          </FormControl>

          <FormControl sx={{ margin: "0 0 16px 4px", width: "calc(50% - 8px)"}}>
            <InputLabel sx={{ fontWeight: "bold"}}>
              {"House Price"}
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              label="House Price"
              onChange={(e) => {
                const rawValue = e.target.value.replace(/,/g, '');
                
                updateProfile({ homePrice: Number(rawValue) })
                setHomePriceField(Number(rawValue));
              }}
              value={homePriceField.toLocaleString('en-US')}
            />
          </FormControl>

          <FormControl sx={{ margin: "0 16px 0 0", flexDirection: "row", gap: 2 }}>
            <InputLabel sx={{ fontWeight: "bold"}}>
              {"Down Payment %"}
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              endAdornment={<InputAdornment position="end">%</InputAdornment>}
              label="Down Payment %"
              type={"number"}
              onChange={(e) => {
                const rawValue = e.target.value.replace(/,/g, '');

                if(rawValue <= 100 && rawValue >= 0) {
                  updateProfile({ downPercent: Number(rawValue) })
                  setDownPaymentField(Number(rawValue));
                }
                else if (rawValue > 100) {
                  updateProfile({ downPercent: 100 })
                  setDownPaymentField(100);
                }
                else {
                  updateProfile({ downPercent: 0 })
                  setDownPaymentField(0);
                }
              }}
              sx={{ width: "122px" }}
              value={downPaymentField.toLocaleString('en-US')}
              inputProps={{ max: 100 }}
            />
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              value={downPaymentField}
              name="radio-buttons-group"              
              onChange={(e) => {
                if (e.target.value <= 100) {
                  updateProfile({
                    downPercent: Number(e.target.value),
                    pmi: e.target.value < 20
                  })
                  setDownPaymentField(e.target.value)
                }
              }}
              style={{ display: "flex", flexDirection: "row" }}
            >
              <FormControlLabel value={3.5} control={<Radio />} label="3.5%" />
              <FormControlLabel value={10} control={<Radio />} label="10%" />
              <FormControlLabel value={20} control={<Radio />} label="20%" />
            </RadioGroup>
          </FormControl>
          <Typography variant="caption" sx={{ paddingLeft: "12px", fontSize: "0.95rem", fontStyle: "italic", color: grey[700] }}>{fmt(downPayment)}</Typography>
        </div>

        <div style={styles.resultContainer}>
          <FormControl sx={{ position: "absolute", top: "345px", left: "20px"}}>
            <FormLabel id="demo-radio-buttons-group-label"><GlossaryTerm term={"PMI"}>PMI</GlossaryTerm> First Year Required?</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              value={pmi}
              name="radio-buttons-group"              
              style={{ display: "flex", flexDirection: "column" }}
            >
              <FormControlLabel disabled={!pmi} value={true} control={<Radio />} label="Yes" />
              <FormControlLabel disabled={pmi} value={false} control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          <div style={{ marginTop: 4, marginBottom: 12, borderTop: "1px solid #eee" }} />
          <PieChart
            series={[{
              innerRadius: 50,
              outerRadius: 120,
              data,
              paddingAngle: 2,
              arcLabel: (item) => renderLabel(item),
              valueFormatter: (item) => currencyFormatter.format(item.value)
           }]}
            {...settings}
            sx={{
              fontFamily: "Roboto, san-serif",
              margin: "38px 0 0 70px",
              paddingLeft: 1.5
            }}
            
          />

          <div style={{ display: "flex", flexDirection: "row", fontFamily: "Roboto", paddingLeft: "16px", marginTop: 16 }}>
            <span style={{ display: "block", fontSize: "1.2rem", marginTop: 4, marginRight: "8px" }}>
              Total Cash Needed:
            </span>
            <span style={{ display: "block", fontSize: "1.2rem", marginTop: 4, fontWeight: "bold" }}>
              {fmt(recommendedSavings)}
            </span>
          </div>
          <div style={{ margin: "12px 24px 12px", borderTop: "1px solid #BDBDBD" }} />
          <div style={{ display: "flex", flexDirection: "column", fontFamily: "Roboto", paddingLeft: "16px", gap: 16 }}>
            <div style={{ display: "flex" }}>
              <span style={{ display: "block", fontSize: "1.2rem", marginTop: 4, marginRight: "8px" }}>
                Remaining to Save:
              </span>
              <span style={{ display: "block", fontSize: "1.2rem", marginTop: 4, fontWeight: "bold" }}>
                {(recommendedSavings - saved > 0) ? fmt(recommendedSavings - saved) : "$0"}
              </span>
            </div>
            <FormControl sx={{ flexDirection: "row", margin: "0 4px 16px 0" }}>
              <InputLabel sx={{ fontWeight: "bold"}}>
                {"Monthly Savings"}
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                startAdornment={<InputAdornment sx={{ marginRight: 0 }} position="start">$</InputAdornment>}
                endAdornment={<InputAdornment sx={{ marginRight: 0 }} position="start">/Month</InputAdornment>}
                label="Monthly Savings"
                onChange={(e) => {
                  const rawValue = e.target.value.replace(/,/g, '');
                  
                  updateProfile({ monthlySave: Number(rawValue) });
                  setMonthlySavings(Number(rawValue));
                }}
                inputProps={{
                  style: {
                    textAlign: "end",
                    marginRight: "2px"
                  }
                }}
                sx={{ textAlign: "end", width: "140px"}}
                value={monthlySavings.toLocaleString('en-US')}
              />
              <div style={{ alignSelf: "center", height: "32px", marginLeft: "16px", display: "flex", borderRadius: "8px" }}>
                {monthsToGoal !== 0 ? (
                  <Typography sx={{ fontSize: "1.4rem", margin: "0 8px", alignContent: "end"}} >
                    Goal in <strong>{abbreviationFormatter.format(monthsToGoal).toLocaleString('en-US')}</strong> months!
                  </Typography>
                ) : (
                  <Typography sx={{ fontSize: "1.4rem", margin: "0 8px", alignContent: "end"}} >
                    Goal Reached!
                  </Typography>
                )}
              </div>
            </FormControl>
          </div>

        </div>
      </div>
    </div>
  );
}