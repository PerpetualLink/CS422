import { useState, useCallback } from "react";

function fmt(value) {
  return value.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export default function HomeSavingsCalculator({ onClose }) {
  const [homePrice, setHomePrice] = useState(300000);
  const [downPercent, setDownPercent] = useState(20);
  const [pmi, setPmi] = useState(false);
  const [saved, setSaved] = useState(20000);
  const [pos, setPos] = useState({ x: window.innerWidth / 2 - 220, y: 100 });

  const onMouseDown = useCallback((e) => {
    if (e.target.tagName === "INPUT") return;
    const startX = e.clientX - pos.x;
    const startY = e.clientY - pos.y;
    const onMouseMove = (e) => setPos({ x: e.clientX - startX, y: e.clientY - startY });
    const onMouseUp = () => { document.removeEventListener("mousemove", onMouseMove); document.removeEventListener("mouseup", onMouseUp); };
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  }, [pos]);

  const downPayment = homePrice * (downPercent / 100);
  const closingCosts = homePrice * 0.03;
  const pmiBuffer = pmi ? 2000 : 0;
  const recommendedSavings = downPayment + closingCosts + 5000 + pmiBuffer;
  const percent = Math.min(saved / homePrice, 1) * 100;
  const targetPercent = (recommendedSavings / homePrice) * 100;

  const ratio = saved / recommendedSavings;
  const barColor = ratio < 0.5 ? "#E5484D" : ratio < 1 ? "#F5A524" : "#22C55E";

  return (
    <div onMouseDown={onMouseDown} style={{ position: "fixed", left: pos.x, top: pos.y, zIndex: 1000, cursor: "grab", userSelect: "none" }}>
      <div style={s.wrapper}>
        <button onClick={onClose} style={s.closeBtn}>✕</button>

        <div>
          <label style={s.label}>Amount Saved</label>
          <input type="number" value={saved} onChange={(e) => setSaved(Number(e.target.value))} style={{ ...s.input, marginBottom: 14 }} />
          <div style={{ position: "relative" }}>
            <div style={s.barBg}>
              <div style={{ ...s.barFill, width: percent + "%", background: barColor }} />
              <div style={{ ...s.targetMarker, left: targetPercent + "%" }} />
            </div>
          </div>
          <div style={s.labels}><span>$0</span><span>{fmt(homePrice)}</span></div>
          <div style={s.targetLabel}>Recommended: {fmt(recommendedSavings)}</div>
        </div>

        <div>
          <h2 style={{ marginBottom: 16 }}>Home Savings Calculator</h2>

          <label style={s.label}>House Price</label>
          <input type="number" value={homePrice} onChange={(e) => setHomePrice(Number(e.target.value))} style={s.input} />

          <label style={s.label}>Down Payment %</label>
          <input type="number" value={downPercent} onChange={(e) => setDownPercent(Number(e.target.value))} style={s.input} />

          <label style={s.label}>PMI Required?</label>
          <div style={{ display: "flex", gap: 16, marginTop: 6 }}>
            <label><input type="radio" checked={!pmi} onChange={() => setPmi(false)} /> No</label>
            <label><input type="radio" checked={pmi} onChange={() => setPmi(true)} /> Yes</label>
          </div>

          <div style={{ marginTop: 16, marginBottom: 12, borderTop: "1px solid #eee" }} />

          <div style={{ fontSize: 14, lineHeight: "22px" }}>
            <p>Down Payment: {fmt(downPayment)}</p>
            <p>Closing Costs (~3%): {fmt(closingCosts)}</p>
            <p>Moving / Repair Buffer: {fmt(5000)}</p>
            {pmi && <p>PMI Cushion: {fmt(pmiBuffer)}</p>}
          </div>

          <div style={{ marginTop: 16, fontWeight: 600, fontSize: 16 }}>
            Recommended Savings:
            <span style={{ display: "block", fontSize: 24, marginTop: 4 }}>{fmt(recommendedSavings)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const s = {
  wrapper: { position: "relative", display: "flex", flexDirection: "column", gap: 16, padding: 16, borderRadius: 14, background: "#fff", boxShadow: "0 8px 32px rgba(0,0,0,0.18)", fontFamily: "Inter", maxWidth: 440 },
  closeBtn: { position: "absolute", top: 8, right: 8, background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "#666", zIndex: 1 },
  label: { fontSize: 14, marginTop: 10 },
  input: { width: "100%", padding: 8, marginTop: 4, borderRadius: 6, border: "1px solid #ccc", boxSizing: "border-box" },
  barBg: { height: 18, borderRadius: 20, background: "#E5E7EB", position: "relative", overflow: "hidden" },
  barFill: { height: "100%", borderRadius: 20, transition: "width 0.4s ease" },
  targetMarker: { position: "absolute", top: -6, width: 3, height: 30, background: "#111" },
  labels: { display: "flex", justifyContent: "space-between", fontSize: 12, marginTop: 6 },
  targetLabel: { textAlign: "center", fontSize: 13, marginTop: 6 },
};
