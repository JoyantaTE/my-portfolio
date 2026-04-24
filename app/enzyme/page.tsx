"use client";
import { useState } from "react";

const enzymes = [
  {
    name: "Cellulase (Acid)",
    type: "Cellulase",
    pH: "4.5 – 5.5",
    temp: "45 – 55°C",
    time: "30 – 60 min",
    action: "Breaks down cellulose fibrils aggressively. Produces strong bio-stoning effect with high backstaining risk.",
    bestFor: "Heavy stonewash effect on denim",
    cost: 3,
    effectiveness: 95,
    backstaining: "High",
    fabricDamage: "Moderate–High",
    color: "#1a4a7a",
    icon: "⬡",
    pros: ["Strongest bio-stoning effect", "Very cost effective", "Fast processing time"],
    cons: ["High backstaining risk", "Fabric damage if overdosed", "Needs careful pH control"],
  },
  {
    name: "Cellulase (Neutral)",
    type: "Cellulase",
    pH: "6.0 – 7.0",
    temp: "50 – 60°C",
    time: "45 – 60 min",
    action: "Gentler cellulose hydrolysis. Lower backstaining compared to acid cellulase. Good surface modification.",
    bestFor: "Balanced bio-polish & stonewash",
    cost: 2,
    effectiveness: 80,
    backstaining: "Moderate",
    fabricDamage: "Low–Moderate",
    color: "#1a6a4a",
    icon: "◈",
    pros: ["Lower backstaining", "Less fabric damage", "Wider pH tolerance"],
    cons: ["Less dramatic stonewash", "Slightly higher cost", "Longer processing time"],
  },
  {
    name: "Cellulase (Bio-Polish)",
    type: "Cellulase",
    pH: "5.5 – 7.0",
    temp: "50 – 60°C",
    time: "20 – 40 min",
    action: "Removes surface fuzz and pills from fabric. Produces smooth, clean surface without heavy stonewash effect.",
    bestFor: "Surface finishing & anti-pilling",
    cost: 2,
    effectiveness: 70,
    backstaining: "Low",
    fabricDamage: "Very Low",
    color: "#4a1a7a",
    icon: "◎",
    pros: ["Excellent surface smoothness", "Minimal backstaining", "Low fabric damage"],
    cons: ["No stonewash effect", "Limited to surface treatment", "Requires good agitation"],
  },
  {
    name: "Laccase",
    type: "Oxidoreductase",
    pH: "4.0 – 6.0",
    temp: "40 – 60°C",
    time: "30 – 90 min",
    action: "Oxidizes indigo dye molecules on denim surface. Replaces traditional bleaching. Eco-friendly alternative to KMnO₄.",
    bestFor: "Indigo decolorization on denim",
    cost: 4,
    effectiveness: 85,
    backstaining: "Very Low",
    fabricDamage: "Very Low",
    color: "#7a3a1a",
    icon: "◇",
    pros: ["Eco-friendly bleaching alternative", "No harsh chemicals", "Excellent color variation"],
    cons: ["Higher cost", "Needs mediator compounds", "Sensitive to temperature"],
  },
  {
    name: "Amylase",
    type: "Hydrolase",
    pH: "5.5 – 7.0",
    temp: "60 – 70°C",
    time: "15 – 30 min",
    action: "Breaks down starch-based sizing agents from woven fabrics. Essential desizing step before further wet processing.",
    bestFor: "Desizing of woven fabrics",
    cost: 1,
    effectiveness: 98,
    backstaining: "None",
    fabricDamage: "None",
    color: "#5a1a1a",
    icon: "⬟",
    pros: ["Highly effective desizing", "Very low cost", "No fabric damage", "Fast action"],
    cons: ["Only for desizing — no other effect", "Requires warm water", "Starch residue testing needed"],
  },
  {
    name: "Protease",
    type: "Hydrolase",
    pH: "7.0 – 9.0",
    temp: "40 – 60°C",
    time: "30 – 60 min",
    action: "Breaks down protein-based impurities and wool/silk fibres. Used for degumming silk and surface modification of wool.",
    bestFor: "Wool softening & silk degumming",
    cost: 3,
    effectiveness: 88,
    backstaining: "None",
    fabricDamage: "Moderate if overdosed",
    color: "#1a5a5a",
    icon: "⬢",
    pros: ["Excellent for protein fibres", "Improves hand feel", "Replaces harsh chemical scouring"],
    cons: ["Not suitable for cotton alone", "Overdose causes fibre damage", "Higher pH requirement"],
  },
  {
    name: "Pectinase",
    type: "Hydrolase",
    pH: "4.0 – 6.0",
    temp: "40 – 55°C",
    time: "30 – 60 min",
    action: "Removes pectin from cotton fibre walls. Improves absorbency as a bio-scouring alternative to NaOH scouring.",
    bestFor: "Bio-scouring of cotton",
    cost: 3,
    effectiveness: 82,
    backstaining: "None",
    fabricDamage: "Very Low",
    color: "#2a5a1a",
    icon: "⬠",
    pros: ["Eco-friendly scouring", "Excellent absorbency improvement", "Low water & energy use"],
    cons: ["Slower than NaOH scouring", "Higher cost than chemical scouring", "Needs careful temperature control"],
  },
  {
    name: "Catalase",
    type: "Oxidoreductase",
    pH: "6.0 – 8.0",
    temp: "20 – 40°C",
    time: "10 – 20 min",
    action: "Breaks down residual hydrogen peroxide after bleaching. Eliminates need for hot water rinsing — saves water and energy.",
    bestFor: "H₂O₂ neutralization after bleaching",
    cost: 2,
    effectiveness: 99,
    backstaining: "None",
    fabricDamage: "None",
    color: "#4a4a1a",
    icon: "◉",
    pros: ["Eliminates peroxide residue", "Saves water & energy", "Very fast action", "Enables immediate dyeing"],
    cons: ["Only for peroxide removal", "Temperature sensitive", "Needs monitoring"],
  },
];

const factors = [
  { factor: "pH", desc: "Most critical parameter. Each enzyme has an optimal pH range — deviation by even 0.5 units can reduce activity by 30–50%.", icon: "⚗️" },
  { factor: "Temperature", desc: "Higher temp increases reaction rate up to the optimum. Above optimum causes enzyme denaturation and complete loss of activity.", icon: "🌡️" },
  { factor: "Time", desc: "Longer time increases effect but risks fabric damage. Optimum time varies per enzyme type and desired effect.", icon: "⏱️" },
  { factor: "Liquor Ratio", desc: "Affects enzyme concentration per gram of fabric. Standard ratio 1:10 to 1:40 depending on machine type.", icon: "💧" },
  { factor: "Agitation", desc: "Mechanical action helps enzyme penetrate fabric structure. Insufficient agitation leads to uneven results.", icon: "🔄" },
  { factor: "Enzyme Concentration", desc: "Higher dosage increases effect but raises cost and damage risk. Optimal dosage must be determined through trials.", icon: "🧪" },
  { factor: "Fabric Type & GSM", desc: "Heavier GSM fabrics need longer treatment. Fabric construction affects enzyme accessibility to fibres.", icon: "👕" },
  { factor: "Backstaining Prevention", desc: "Anti-backstaining agents must be added with cellulase enzymes to prevent redeposition of indigo dye.", icon: "🛡️" },
];
export default function Enzyme() {
  const [active, setActive] = useState(0);
  const [view, setView] = useState<"cards" | "table">("cards");

  return (
    <div>
      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #0d1520 0%, #1a2a4a 50%, #0d1520 100%)", padding: "5rem 2rem", borderBottom: "1px solid rgba(196,98,45,0.2)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ color: "#C4622D", fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1rem", fontWeight: 500 }}>
            Technical Reference
          </p>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#F0EDE8", lineHeight: 1.1, marginBottom: "1.5rem", maxWidth: 700 }}>
            Enzyme Washing in Textile Processing
          </h1>
          <p style={{ color: "rgba(220,215,205,0.65)", fontSize: "1rem", lineHeight: 1.8, maxWidth: 650, marginBottom: "2rem" }}>
            A comprehensive guide to all major textile enzymes — their mechanisms, process parameters, cost implications, and best-use cases in garment washing and finishing.
          </p>
          <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
            {[
              { num: "8", label: "Enzyme Types" },
              { num: "6", label: "Key Process Factors" },
              { num: "5+", label: "Years Field Experience" },
            ].map((s) => (
              <div key={s.label} style={{ borderLeft: "2px solid #C4622D", paddingLeft: "1rem" }}>
                <p style={{ fontFamily: "Georgia,serif", fontSize: "1.8rem", color: "#C4622D", lineHeight: 1 }}>{s.num}</p>
                <p style={{ fontSize: "0.8rem", color: "#A0A0A0", marginTop: "0.25rem" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* View Toggle + Enzyme Display */}
      <section style={{ background: "#111820", padding: "4rem 2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2.5rem", flexWrap: "wrap", gap: "1rem" }}>
            <p style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#666" }}>
              Enzyme Comparison
            </p>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {(["cards", "table"] as const).map((v) => (
                <button key={v} onClick={() => setView(v)} style={{ padding: "0.5rem 1.25rem", background: view === v ? "#C4622D" : "rgba(255,255,255,0.05)", border: view === v ? "1px solid #C4622D" : "1px solid rgba(255,255,255,0.1)", color: view === v ? "white" : "#A0A0A0", fontSize: "0.8rem", cursor: "pointer", fontFamily: "sans-serif", letterSpacing: "0.04em", textTransform: "capitalize" }}>
                  {v === "cards" ? "Visual Cards" : "Comparison Table"}
                </button>
              ))}
            </div>
          </div>

          {/* CARDS VIEW */}
          {view === "cards" && (
            <div>
              {/* Enzyme selector */}
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "2rem" }}>
                {enzymes.map((e, i) => (
                  <button key={e.name} onClick={() => setActive(i)} style={{ padding: "0.5rem 1rem", background: active === i ? e.color : "rgba(255,255,255,0.04)", border: active === i ? `1px solid ${e.color}` : "1px solid rgba(255,255,255,0.08)", color: active === i ? "white" : "#A0A0A0", fontSize: "0.8rem", cursor: "pointer", fontFamily: "sans-serif" }}>
                    {e.icon} {e.name}
                  </button>
                ))}
              </div>

              {/* Active enzyme detail */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", alignItems: "start" }}>
                <div>
                  <div style={{ background: enzymes[active].color + "22", border: `1px solid ${enzymes[active].color}44`, padding: "2rem", marginBottom: "1.5rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                      <span style={{ fontSize: "2rem" }}>{enzymes[active].icon}</span>
                      <div>
                        <h2 style={{ fontFamily: "Georgia,serif", fontSize: "1.5rem", color: "#F0EDE8", lineHeight: 1.2 }}>{enzymes[active].name}</h2>
                        <p style={{ fontSize: "0.8rem", color: "#A0A0A0", marginTop: "0.2rem" }}>{enzymes[active].type}</p>
                      </div>
                    </div>
                    <p style={{ color: "rgba(220,215,205,0.75)", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                      {enzymes[active].action}
                    </p>
                    <div style={{ background: "rgba(196,98,45,0.1)", border: "1px solid rgba(196,98,45,0.2)", padding: "0.75rem 1rem" }}>
                      <p style={{ fontSize: "0.7rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#C4622D", marginBottom: "0.25rem" }}>Best For</p>
                      <p style={{ fontSize: "0.9rem", color: "#E8E3DC" }}>{enzymes[active].bestFor}</p>
                    </div>
                  </div>

                  {/* Process Parameters */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                    {[
                      { label: "pH Range", value: enzymes[active].pH },
                      { label: "Temperature", value: enzymes[active].temp },
                      { label: "Time", value: enzymes[active].time },
                      { label: "Backstaining", value: enzymes[active].backstaining },
                      { label: "Fabric Damage", value: enzymes[active].fabricDamage },
                      { label: "Relative Cost", value: "★".repeat(enzymes[active].cost) + "☆".repeat(4 - enzymes[active].cost) },
                    ].map((p) => (
                      <div key={p.label} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", padding: "0.875rem" }}>
                        <p style={{ fontSize: "0.65rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#666", marginBottom: "0.3rem" }}>{p.label}</p>
                        <p style={{ fontSize: "0.9rem", color: "#E8E3DC" }}>{p.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pros Cons + Effectiveness */}
                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                  {/* Effectiveness bar */}
                  <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", padding: "1.5rem" }}>
                    <p style={{ fontSize: "0.7rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#666", marginBottom: "1rem" }}>Effectiveness Score</p>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                      <div style={{ flex: 1, background: "rgba(255,255,255,0.06)", height: 10 }}>
                        <div style={{ width: `${enzymes[active].effectiveness}%`, height: "100%", background: `linear-gradient(90deg, ${enzymes[active].color}, #C4622D)`, transition: "width 0.6s ease" }} />
                      </div>
                      <span style={{ fontSize: "1.2rem", color: "#C4622D", fontFamily: "Georgia,serif", minWidth: 45 }}>{enzymes[active].effectiveness}%</span>
                    </div>
                  </div>

                  {/* Pros */}
                  <div style={{ background: "rgba(40,100,60,0.1)", border: "1px solid rgba(40,100,60,0.2)", padding: "1.5rem" }}>
                    <p style={{ fontSize: "0.7rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#3d8a5a", marginBottom: "1rem" }}>Advantages</p>
                    {enzymes[active].pros.map((p) => (
                      <div key={p} style={{ display: "flex", gap: "0.75rem", marginBottom: "0.6rem" }}>
                        <span style={{ color: "#3d8a5a", fontSize: "0.8rem", marginTop: "0.1rem" }}>✓</span>
                        <p style={{ fontSize: "0.875rem", color: "rgba(220,215,205,0.7)", lineHeight: 1.5 }}>{p}</p>
                      </div>
                    ))}
                  </div>

                  {/* Cons */}
                  <div style={{ background: "rgba(120,40,40,0.1)", border: "1px solid rgba(120,40,40,0.2)", padding: "1.5rem" }}>
                    <p style={{ fontSize: "0.7rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#C4622D", marginBottom: "1rem" }}>Limitations</p>
                    {enzymes[active].cons.map((c) => (
                      <div key={c} style={{ display: "flex", gap: "0.75rem", marginBottom: "0.6rem" }}>
                        <span style={{ color: "#C4622D", fontSize: "0.8rem", marginTop: "0.1rem" }}>✗</span>
                        <p style={{ fontSize: "0.875rem", color: "rgba(220,215,205,0.7)", lineHeight: 1.5 }}>{c}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TABLE VIEW */}
          {view === "table" && (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid rgba(196,98,45,0.3)" }}>
                    {["Enzyme", "Type", "pH", "Temp", "Time", "Best For", "Backstaining", "Cost", "Effectiveness"].map((h) => (
                      <th key={h} style={{ padding: "0.875rem 1rem", textAlign: "left", fontSize: "0.7rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#C4622D", fontWeight: 500, whiteSpace: "nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {enzymes.map((e, i) => (
                    <tr key={e.name} onClick={() => { setActive(i); setView("cards"); }} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", cursor: "pointer", transition: "background 0.2s" }}
                      onMouseEnter={ev => (ev.currentTarget.style.background = "rgba(196,98,45,0.06)")}
                      onMouseLeave={ev => (ev.currentTarget.style.background = "transparent")}
                    >
                      <td style={{ padding: "0.875rem 1rem", color: "#F0EDE8", whiteSpace: "nowrap" }}>{e.icon} {e.name}</td>
                      <td style={{ padding: "0.875rem 1rem", color: "#A0A0A0" }}>{e.type}</td>
                      <td style={{ padding: "0.875rem 1rem", color: "#A0A0A0", whiteSpace: "nowrap" }}>{e.pH}</td>
                      <td style={{ padding: "0.875rem 1rem", color: "#A0A0A0", whiteSpace: "nowrap" }}>{e.temp}</td>
                      <td style={{ padding: "0.875rem 1rem", color: "#A0A0A0", whiteSpace: "nowrap" }}>{e.time}</td>
                      <td style={{ padding: "0.875rem 1rem", color: "#A0A0A0" }}>{e.bestFor}</td>
                      <td style={{ padding: "0.875rem 1rem", color: e.backstaining === "High" ? "#C4622D" : e.backstaining === "None" ? "#3d8a5a" : "#A0A0A0" }}>{e.backstaining}</td>
                      <td style={{ padding: "0.875rem 1rem", color: "#C4622D" }}>{"★".repeat(e.cost)}{"☆".repeat(4-e.cost)}</td>
                      <td style={{ padding: "0.875rem 1rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          <div style={{ width: 60, background: "rgba(255,255,255,0.06)", height: 4 }}>
                            <div style={{ width: `${e.effectiveness}%`, height: "100%", background: "#C4622D" }} />
                          </div>
                          <span style={{ color: "#A0A0A0", fontSize: "0.75rem" }}>{e.effectiveness}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p style={{ marginTop: "1rem", fontSize: "0.75rem", color: "#555", textAlign: "right" }}>Click any row to see full details</p>
            </div>
          )}
        </div>
      </section>

      {/* Process Factors */}
      <section style={{ background: "#2B2B2B", padding: "4rem 2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#666", marginBottom: "2.5rem" }}>
            Key Process Factors
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.25rem" }}>
            {factors.map((f) => (
              <div key={f.factor} style={{ background: "rgba(196,98,45,0.05)", border: "1px solid rgba(196,98,45,0.12)", padding: "1.5rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
                  <span style={{ fontSize: "1.25rem" }}>{f.icon}</span>
                  <h3 style={{ fontSize: "0.95rem", color: "#C4622D", fontFamily: "Georgia,serif" }}>{f.factor}</h3>
                </div>
                <p style={{ fontSize: "0.85rem", color: "#A0A0A0", lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conclusion */}
      <section style={{ background: "#111820", padding: "4rem 2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#666", marginBottom: "2rem" }}>
            Key Takeaway
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "start" }}>
            <div>
              <h2 style={{ fontFamily: "Georgia,serif", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", color: "#F0EDE8", lineHeight: 1.2, marginBottom: "1.5rem" }}>
                Enzyme selection is a balance of effect, cost and risk.
              </h2>
              <p style={{ color: "#A0A0A0", fontSize: "0.95rem", lineHeight: 1.8 }}>
                No single enzyme fits all processes. The right choice depends on the desired finishing effect, fabric type, available equipment, and cost constraints. Cellulase remains the most widely used in garment washing — but combining enzymes like Catalase after bleaching can save significant water and energy.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                { icon: "◎", text: "Acid Cellulase — maximum stonewash, handle backstaining carefully" },
                { icon: "◈", text: "Neutral Cellulase — safer choice for balanced bio-polish" },
                { icon: "⬡", text: "Laccase — green alternative to KMnO₄ bleaching on denim" },
                { icon: "⬟", text: "Amylase — always first step for woven fabric desizing" },
                { icon: "◉", text: "Catalase — saves hot rinse water after every H₂O₂ bleach" },
              ].map((item) => (
                <div key={item.text} style={{ display: "flex", gap: "1rem", alignItems: "flex-start", background: "rgba(255,255,255,0.03)", padding: "1rem", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <span style={{ color: "#C4622D", fontSize: "1rem", marginTop: "0.1rem" }}>{item.icon}</span>
                  <p style={{ fontSize: "0.875rem", color: "#A0A0A0", lineHeight: 1.6 }}>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}