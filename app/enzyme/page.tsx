"use client";
import { useState } from "react";

const enzymes = [
  {
    name: "Acid Cellulase",
    icon: "⬡",
    color: "#1a4a7a",
    tag: "Most Used",
    definition: "An enzyme derived from fungi that breaks down cellulose fibrils under acidic conditions. Produces strong bio-stoning and color fading on denim and cotton fabrics.",
    pros: ["Strongest bio-stoning effect", "Fast processing time", "Very cost effective", "High color fading on denim"],
    cons: ["High backstaining risk", "Fabric damage if overdosed", "Strict pH control required"],
    cost: { level: 2, label: "Low–Medium", detail: "Most economical cellulase. Widely available." },
    params: { pH: "4.5–5.5", temp: "45–55°C", time: "30–60 min" },
  },
  {
    name: "Neutral Cellulase",
    icon: "◈",
    color: "#1a6a4a",
    tag: "Balanced",
    definition: "A gentler form of cellulase that works at neutral pH. Offers bio-polishing and moderate stonewash effect with significantly lower backstaining compared to acid cellulase.",
    pros: ["Lower backstaining", "Less fabric damage", "Wider pH tolerance", "Suitable for sensitive shades"],
    cons: ["Less dramatic stonewash", "Slightly higher cost", "Longer processing needed"],
    cost: { level: 2, label: "Medium", detail: "Slightly more expensive than acid cellulase but safer to use." },
    params: { pH: "6.0–7.0", temp: "50–60°C", time: "45–60 min" },
  },
  {
    name: "Laccase",
    icon: "◇",
    color: "#7a3a1a",
    tag: "Eco Bleaching",
    definition: "An oxidoreductase enzyme that oxidizes indigo dye molecules on denim surface. Used as an eco-friendly alternative to KMnO₄ and chlorine bleaching for color fading.",
    pros: ["Eco-friendly bleaching alternative", "No harsh chemicals", "Excellent color variation", "Very low fabric damage"],
    cons: ["Higher cost", "Needs mediator compounds", "Temperature sensitive", "Slower than chemical bleach"],
    cost: { level: 4, label: "High", detail: "Premium enzyme — cost justified by eco-benefits and quality of finish." },
    
  },
  {
    name: "Amylase",
    icon: "⬟",
    color: "#5a1a1a",
    tag: "Desizing",
    definition: "A hydrolase enzyme that breaks down starch-based sizing agents applied to woven fabrics during weaving. Essential first step before any wet processing.",
    pros: ["Highly effective desizing", "Very low cost", "No fabric damage", "Fast action", "Works on all woven fabrics"],
    cons: ["Only for desizing — no other effect", "Requires warm water", "Starch residue testing needed after"],
    cost: { level: 1, label: "Very Low", detail: "One of the cheapest textile enzymes available." },
    params: { pH: "5.5–7.0", temp: "60–70°C", time: "15–30 min" },
  },
  {
    name: "Protease",
    icon: "⬢",
    color: "#1a5a5a",
    tag: "Protein Fibres",
    definition: "A hydrolase enzyme that breaks down protein-based fibres and impurities. Used for degumming silk, surface modification of wool, and improving hand feel of protein-based fabrics.",
    pros: ["Excellent for wool & silk", "Improves hand feel", "Replaces harsh chemical scouring", "Eco-friendly alternative"],
    cons: ["Not suitable for cotton alone", "Overdose causes fibre damage", "Higher pH requirement", "Careful monitoring needed"],
    cost: { level: 3, label: "Medium–High", detail: "Moderate cost — mainly used for specialty protein fibre finishing." },
    params: { pH: "7.0–9.0", temp: "40–60°C", time: "30–60 min" },
  },
  {
    name: "Catalase",
    icon: "◉",
    color: "#4a4a1a",
    tag: "H₂O₂ Removal",
    definition: "An enzyme that rapidly breaks down residual hydrogen peroxide after bleaching. Eliminates the need for hot water rinsing — saving significant water and energy in the bleaching process.",
    pros: ["Eliminates peroxide residue completely", "Saves water & energy", "Very fast action", "Enables immediate dyeing after bleaching"],
    cons: ["Only for peroxide removal — no other effect", "Temperature sensitive", "Needs monitoring to confirm activity"],
    cost: { level: 2, label: "Low–Medium", detail: "Small dosage needed — very cost effective per batch." },
    params: { pH: "6.0–8.0", temp: "20–40°C", time: "10–20 min" },
  },
  {
    name: "Pectinase",
    icon: "⬠",
    color: "#2a5a1a",
    tag: "Bio-Scouring",
    definition: "An enzyme that removes pectin from cotton fibre cell walls. Used as a bio-scouring agent — a greener alternative to NaOH scouring that improves absorbency without harsh alkali.",
    pros: ["Eco-friendly scouring alternative", "Excellent absorbency improvement", "Low water & energy usage", "Soft hand feel result"],
    cons: ["Slower than NaOH scouring", "Higher cost than chemical scouring", "Careful temperature control needed"],
    cost: { level: 3, label: "Medium–High", detail: "Higher cost offset by environmental savings and quality improvement." },
    params: { pH: "4.0–6.0", temp: "40–55°C", time: "30–60 min" },
  },
];
export default function Enzyme() {
  const [active, setActive] = useState(0);

  return (
    <div>
      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #0d1520 0%, #1a2a4a 50%, #0d1520 100%)", padding: "4rem 2rem", borderBottom: "1px solid rgba(196,98,45,0.2)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ color: "#C4622D", fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1rem", fontWeight: 500 }}>
            Wash Processes → Enzyme Wash
          </p>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", color: "#F0EDE8", lineHeight: 1.1, marginBottom: "1rem", maxWidth: 650 }}>
            Enzyme Washing — Quick Reference Guide
          </h1>
          <p style={{ color: "rgba(220,215,205,0.6)", fontSize: "1rem", lineHeight: 1.7, maxWidth: 580 }}>
            A concise overview of all major textile enzymes — definition, pros, cons, cost and visual examples.
          </p>
        </div>
      </section>

      {/* Enzyme Tabs */}
      <section style={{ background: "#111820", padding: "4rem 2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>

          {/* Tab Buttons */}
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
            {enzymes.map((e, i) => (
              <button
                key={e.name}
                onClick={() => setActive(i)}
                style={{
                  padding: "0.5rem 1rem",
                  background: active === i ? e.color : "rgba(255,255,255,0.04)",
                  border: active === i ? `1px solid ${e.color}` : "1px solid rgba(255,255,255,0.08)",
                  color: active === i ? "white" : "#A0A0A0",
                  fontSize: "0.8rem",
                  cursor: "pointer",
                  fontFamily: "sans-serif",
                  letterSpacing: "0.02em",
                }}
              >
                {e.icon} {e.name}
              </button>
            ))}
          </div>

          {/* Active Enzyme Card */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", alignItems: "start" }}>

            {/* Left */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

              {/* Tag + Name */}
              <div style={{ borderLeft: `4px solid ${enzymes[active].color}`, paddingLeft: "1.25rem" }}>
                <span style={{ fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: enzymes[active].color }}>{enzymes[active].tag}</span>
                <h2 style={{ fontFamily: "Georgia,serif", fontSize: "1.6rem", color: "#F0EDE8", marginTop: "0.25rem", lineHeight: 1.2 }}>{enzymes[active].name}</h2>
              </div>

              {/* Definition */}
              <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", padding: "1.25rem" }}>
                <p style={{ fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#666", marginBottom: "0.75rem" }}>Definition</p>
                <p style={{ fontSize: "0.95rem", color: "rgba(220,215,205,0.8)", lineHeight: 1.75 }}>{enzymes[active].definition}</p>
              </div>

              

              {/* Cost */}
              <div style={{ background: "rgba(196,98,45,0.06)", border: "1px solid rgba(196,98,45,0.15)", padding: "1.25rem" }}>
                <p style={{ fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#C4622D", marginBottom: "0.5rem" }}>Cost</p>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{ display: "flex", gap: "0.3rem" }}>
                    {[1,2,3,4].map((star) => (
                      <span key={star} style={{ fontSize: "1rem", color: star <= enzymes[active].cost.level ? "#C4622D" : "#333" }}>★</span>
                    ))}
                  </div>
                  <span style={{ fontSize: "0.9rem", color: "#E8E3DC", fontWeight: 500 }}>{enzymes[active].cost.label}</span>
                </div>
                <p style={{ fontSize: "0.8rem", color: "#A0A0A0", marginTop: "0.5rem", lineHeight: 1.6 }}>{enzymes[active].cost.detail}</p>
              </div>

            </div>

            {/* Right */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

              {/* Pros */}
              <div style={{ background: "rgba(40,100,60,0.08)", border: "1px solid rgba(40,100,60,0.2)", padding: "1.5rem" }}>
                <p style={{ fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#3d8a5a", marginBottom: "1rem" }}>✓ Advantages</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                  {enzymes[active].pros.map((p) => (
                    <div key={p} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                      <span style={{ color: "#3d8a5a", fontSize: "0.8rem", marginTop: "0.15rem", flexShrink: 0 }}>✓</span>
                      <p style={{ fontSize: "0.875rem", color: "rgba(220,215,205,0.75)", lineHeight: 1.5 }}>{p}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cons */}
              <div style={{ background: "rgba(120,40,40,0.08)", border: "1px solid rgba(120,40,40,0.2)", padding: "1.5rem" }}>
                <p style={{ fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#C4622D", marginBottom: "1rem" }}>✗ Limitations</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                  {enzymes[active].cons.map((c) => (
                    <div key={c} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                      <span style={{ color: "#C4622D", fontSize: "0.8rem", marginTop: "0.15rem", flexShrink: 0 }}>✗</span>
                      <p style={{ fontSize: "0.875rem", color: "rgba(220,215,205,0.75)", lineHeight: 1.5 }}>{c}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Before & After Photos */}
              <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", padding: "1.5rem" }}>
                <p style={{ fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#666", marginBottom: "1rem" }}>Before & After Examples</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                  {["Before", "After"].map((label) => (
                    <div key={label} style={{ background: "rgba(255,255,255,0.04)", border: "1px dashed rgba(255,255,255,0.1)", aspectRatio: "4/3", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                      <span style={{ fontSize: "1.5rem" }}>🖼️</span>
                      <p style={{ fontSize: "0.75rem", color: "#555", letterSpacing: "0.06em", textTransform: "uppercase" }}>{label}</p>
                      <p style={{ fontSize: "0.7rem", color: "#444" }}>Photo coming soon</p>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: "0.75rem", color: "#444", marginTop: "0.75rem", textAlign: "center" }}>
                  Upload photos to <code style={{ color: "#666" }}>/public/enzyme/{enzymes[active].name.toLowerCase().replace(/ /g,"-")}/</code>
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#2B2B2B", padding: "3rem 2rem", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <p style={{ color: "#A0A0A0", fontSize: "0.95rem", lineHeight: 1.8, marginBottom: "1.5rem" }}>
            Have questions about enzyme selection or process parameters for your specific fabric?
          </p>
          
            <a href="mailto:joyanta.sarkar.texengg@gmail.com?subject=Enzyme%20Wash%20Consultation" style={{ display: "inline-block", background: "#C4622D", color: "white", padding: "0.875rem 2.5rem", fontSize: "0.9rem", letterSpacing: "0.04em", textDecoration: "none" }}>
            Ask Joyanta
          </a>
        </div>
      </section>
    </div>
  );
}
