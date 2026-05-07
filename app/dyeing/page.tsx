"use client";
import { useState } from "react";

const sections = [
  "Basic Knowledge",
  "Dyeing Techniques",
  "Aspects",
  "Chemical Functions",
  "Differences & Advantages",
  "Operation & Visual Management",
  "Risk Analysis",
  "Costing",
  "Troubleshoot",
  "Bio Polishing",
];

const content = {
  "Basic Knowledge": {
    icon: "🧪",
    intro: "Garment dyeing is the process of dyeing fully assembled garments rather than dyeing yarn or fabric first. It allows for greater flexibility in colour response to market trends and reduces inventory risk.",
    points: [
      { title: "What is Garment Dyeing?", desc: "A wet processing technique where finished garments are loaded into dyeing machines and dyed in bulk. Colours can be changed rapidly based on demand." },
      { title: "Why Garment Dyeing?", desc: "Brands use garment dyeing to reduce lead times, respond to colour trends faster, and maintain greige (undyed) stock that can be coloured on demand." },
      { title: "Suitable Fabrics", desc: "100% Cotton, Linen, Viscose, Cotton-Linen blends. Synthetic fibres like polyester require different dye classes and higher temperatures." },
      { title: "Dye Classes Used", desc: "Reactive dyes for cotton (wash-fast, bright shades). Acid dyes for wool/nylon. Direct dyes for quick low-cost applications. Pigment dyes for vintage/worn effects." },
      { title: "Key Standard", desc: "ISO 105 series for colour fastness. AATCC standards for washing, rubbing and light fastness testing of dyed garments." },
    ],
  },
  "Dyeing Techniques": {
    icon: "🎨",
    intro: "Different dyeing techniques produce different colour effects, fastness levels and visual aesthetics. Choosing the right technique depends on fabric type, desired effect and production volume.",
    points: [
      { title: "Exhaust Dyeing", desc: "Garments loaded into machine with dye liquor. Dye gradually exhausts onto fabric over time with controlled temperature and salt/alkali addition. Most common method." },
      { title: "Pigment Dyeing", desc: "Pigment particles bonded to fabric surface using binder. No chemical reaction with fibre. Produces vintage, uneven, worn-in appearance. Low wash fastness by design." },
      { title: "Reactive Dyeing", desc: "Reactive dyes form covalent bond with cellulose fibre. Best wash fastness among all dye classes. Requires alkali fixation and thorough washing off." },
      { title: "Direct Dyeing", desc: "Simple application with salt. Lower fastness than reactive. Used for quick, low-cost shade production. Good for dark shades where fastness is acceptable." },
      { title: "Tie & Dye / Resist", desc: "Selective dyeing using tied, folded or stitched resist areas. Creates pattern effects. Used for fashion and artisanal garments." },
      { title: "Overdyeing", desc: "Dyeing already-coloured garments to shift or deepen the shade. Used in vintage and upcycling processes." },
    ],
  },
  "Aspects": {
    icon: "🔍",
    intro: "Successful garment dyeing depends on controlling multiple interconnected aspects simultaneously. Missing any one can compromise the entire batch.",
    points: [
      { title: "Shade Matching", desc: "Achieving target colour consistently across different batches and machines. Lab dip approval followed by bulk production trial is standard practice." },
      { title: "Colour Fastness", desc: "Resistance of dyed colour to washing, rubbing, light and sweat. Measured on 1–5 scale. Most buyers require minimum 3–4 for commercial products." },
      { title: "Levelness", desc: "Uniform colour distribution across all parts of the garment. Unlevel dyeing shows as patchy, streaky or uneven colour — a major defect." },
      { title: "Shrinkage Control", desc: "Garments shrink during hot dyeing process. Pre-shrinkage of fabric and controlled after-washing are critical to maintain size specs." },
      { title: "Fabric Weight (GSM)", desc: "Heavier GSM fabrics absorb more dye and need longer dyeing times and higher chemical quantities. Affects recipe calculation directly." },
      { title: "pH Control", desc: "Critical at every stage. Dyeing pH, fixing pH, washing pH all affect shade, fastness and fabric condition." },
    ],
  },
  "Chemical Functions": {
    icon: "⚗️",
    intro: "Every chemical in a dyeing recipe serves a specific function. Understanding each one allows for intelligent troubleshooting and cost optimization.",
    points: [
      { title: "Reactive Dye", desc: "The colouring agent. Reacts chemically with cellulose OH groups under alkaline conditions to form a permanent covalent bond." },
      { title: "Common Salt (NaCl)", desc: "Electrolyte that drives dye exhaustion onto fabric. Higher salt = more dye uptake. Typically 40–80 g/L depending on shade depth." },
      { title: "Soda Ash (Na₂CO₃)", desc: "Alkali that activates the reactive dye-fibre reaction (fixation). Added after exhaustion phase. pH raises to 10.5–11.5 for fixation." },
      { title: "Caustic Soda (NaOH)", desc: "Strong alkali used for deep shades requiring higher pH. More aggressive than soda ash — careful dosing required." },
      { title: "Sequestering Agent", desc: "Chelates metal ions (Ca²⁺, Mg²⁺, Fe³⁺) in hard water that would otherwise interfere with dye and cause shade variation." },
      { title: "Wetting Agent", desc: "Surfactant that reduces surface tension, ensuring rapid and uniform wetting of all garment parts before dyeing starts." },
      { title: "Anti-Creasing Agent", desc: "Prevents rope marks and crease damage on garments during high-temperature machine rotation. Essential for delicate fabrics." },
      { title: "Fixing Agent", desc: "Cationic agent applied after dyeing to improve wash fastness — especially for dark reactive shades that are prone to bleeding." },
      { title: "Softener", desc: "Applied in final bath to improve hand feel. Silicone softeners give best results. Must be compatible with fixing agent." },
    ],
  },
  "Differences & Advantages": {
    icon: "⚖️",
    intro: "Garment dyeing versus yarn/fabric dyeing — each has its place in the supply chain. Understanding the trade-offs helps brands make smarter sourcing decisions.",
    points: [
      { title: "vs Yarn Dyeing", desc: "Yarn dyeing gives better shade consistency and is suitable for woven patterns. Garment dyeing is faster to market and more flexible for solid shades." },
      { title: "vs Fabric Dyeing", desc: "Fabric dyeing is more controlled and efficient for large runs. Garment dyeing allows last-minute colour decisions and smaller minimums." },
      { title: "Advantage — Speed", desc: "Greige garments can be stocked undyed and coloured within 24–48 hours of a trend signal. Dramatically reduces lead time vs fabric dyeing." },
      { title: "Advantage — Flexibility", desc: "Same garment style in 12 different colours can be produced from one greige inventory. Reduces overstock and markdown risk." },
      { title: "Disadvantage — Shrinkage", desc: "Hot aqueous processing causes shrinkage. Pattern matching and size accuracy require extra attention vs pre-dyed fabric cutting." },
      { title: "Disadvantage — Seam Shade", desc: "Sewing thread and shell fabric dye differently — seam shading is a common issue requiring thread pre-treatment or careful thread selection." },
      { title: "Disadvantage — Batch Variation", desc: "Achieving identical shade across multiple batches is more challenging than fabric dyeing due to garment loading variables." },
    ],
  },
  "Operation & Visual Management": {
    icon: "🏭",
    intro: "Effective operation and visual management on the dyeing floor ensures quality consistency, reduces defects and enables fast problem detection.",
    points: [
      { title: "Machine Loading", desc: "Correct loading ratio (1:8 to 1:15) is critical. Overloading causes unlevel dyeing. Underloading wastes chemicals and water." },
      { title: "Temperature Profile", desc: "Controlled ramp rate (1–2°C/min) ensures level dye uptake. Rapid heating causes uneven exhaustion and unlevel results." },
      { title: "Shade Checking", desc: "Pull sample at 80% completion. Compare against standard under D65 light. Adjust shade if required before fixation." },
      { title: "Visual Inspection Points", desc: "Check for: rope marks, crease marks, unlevel patches, seam shading, garment entanglement and foreign fibre contamination." },
      { title: "Lab Dip Approval", desc: "All shades require approved lab dip before bulk. Lab dip must match standard within ΔE < 1.0 under D65/A/F11 lighting." },
      { title: "Batch Record", desc: "Every batch must have documented recipe, machine ID, loading weight, temperature profile and shade check results for traceability." },
    ],
  },
  "Risk Analysis": {
    icon: "⚠️",
    intro: "Garment dyeing carries multiple quality and production risks. Early identification of causes leads to faster resolution and fewer rejections.",
    points: [
      { title: "Unlevel Dyeing", desc: "Cause: Rapid heating, poor wetting, overloading, inadequate machine rotation. Risk: Full batch rejection. Prevention: Controlled ramp, correct loading." },
      { title: "Shade Variation Batch to Batch", desc: "Cause: Water hardness variation, salt weighing error, dye lot difference, temperature deviation. Prevention: Sequestering agent, calibrated dosing." },
      { title: "Poor Wash Fastness", desc: "Cause: Incomplete fixation, insufficient washing off, wrong pH at fixation. Risk: Customer complaint, return. Prevention: pH control, thorough soaping." },
      { title: "Seam Shading", desc: "Cause: Thread dye affinity different from shell fabric. Prevention: Use same fibre content thread or pre-treat thread before sewing." },
      { title: "Fabric Damage", desc: "Cause: High temperature with wrong auxiliaries, excessive mechanical action, wrong pH. Risk: Strength loss, holes. Prevention: Anti-crease, correct temp." },
      { title: "Shade Fading After Washing", desc: "Cause: Residual unfixed dye not washed off properly. Prevention: Proper soaping at 95°C, fixing agent application." },
      { title: "Rope Marks / Crease Marks", desc: "Cause: Insufficient anti-crease agent, garment entanglement, high fabric weight. Prevention: Anti-crease dosing, periodic machine reversal." },
    ],
  },
  "Costing": {
    icon: "💰",
    intro: "Garment dyeing cost is influenced by shade depth, chemical complexity, water and energy usage, and machine efficiency. Understanding cost drivers enables better pricing and optimization.",
    points: [
      { title: "Dye Cost", desc: "Varies by shade depth and dye class. Light shades: low dye cost. Dark/navy/black: highest dye consumption. Reactive dyes cost more than direct but give better fastness." },
      { title: "Chemical Cost", desc: "Salt, soda ash, sequestering agent, wetting agent, anti-crease, softener. Average auxiliary cost: $0.15–$0.40/kg fabric depending on recipe complexity." },
      { title: "Water Cost", desc: "Garment dyeing is water intensive — typically 80–120 litres per kg of garment. Water recycling systems can reduce this significantly." },
      { title: "Energy Cost", desc: "Heating dyebath to 60–98°C is the major energy cost. Steam consumption depends on machine insulation and temperature profile." },
      { title: "Labour Cost", desc: "Loading/unloading, shade checking, chemical dosing, quality inspection. Automation reduces labour but increases capital cost." },
      { title: "Rejection Cost", desc: "Failed batches are the hidden cost. A 5% rejection rate can wipe out profit margin on an entire order. Prevention is always cheaper than rework." },
      { title: "Typical Cost Range", desc: "Light shade reactive: $0.30–$0.60/kg. Medium shade: $0.50–$0.90/kg. Dark shade: $0.80–$1.50/kg. Pigment dyeing: $0.20–$0.40/kg." },
    ],
  },
  "Troubleshoot": {
    icon: "🔧",
    intro: "Systematic troubleshooting using root cause analysis prevents repeat defects and reduces production losses. Always document findings for future reference.",
    points: [
      { title: "Problem: Unlevel shade", desc: "Check: Heating rate too fast? Loading ratio exceeded? Wetting agent added? Solution: Reduce ramp rate, unload excess, add levelling agent and re-run." },
      { title: "Problem: Shade too light", desc: "Check: Salt quantity correct? Soda ash added at right time? Dye lot same as lab dip? Solution: Top up dye, extend fixation time, check weighing records." },
      { title: "Problem: Shade too dark", desc: "Check: Weighing error? Liquor ratio lower than planned? Solution: Stripping or reduction clearing if slight — rejection if severe." },
      { title: "Problem: Poor rubbing fastness", desc: "Check: Soaping done at correct temperature? Fixing agent applied? Solution: Re-soap at 95°C, apply cationic fixing agent, re-test." },
      { title: "Problem: Rope marks", desc: "Check: Anti-crease dosage? Machine rotation reversal interval? Solution: Drain, add anti-crease, re-run at lower temperature with frequent reversal." },
      { title: "Problem: Seam shading", desc: "Check: Thread fibre content matches shell fabric? Solution: If minor — fixing agent may minimize. If severe — thread replacement required." },
      { title: "Problem: Shade change after softening", desc: "Check: Softener pH compatibility with shade? Silicone softener causing hue shift? Solution: Use pH-neutral softener, test on sample first." },
    ],
  },
  "Bio Polishing": {
    icon: "✨",
    intro: "Bio polishing is an enzymatic finishing process that removes surface fuzz and protruding fibres from cotton fabrics, resulting in a smooth, clean surface with improved pilling resistance.",
    points: [
      { title: "What is Bio Polishing?", desc: "Treatment with cellulase enzymes that selectively hydrolyse and remove protruding fibre ends from fabric surface. Creates smooth, clean, lint-free appearance." },
      { title: "Enzyme Used", desc: "Neutral or acid cellulase enzymes. Neutral cellulase preferred for bio polishing as it has lower backstaining risk and gentler action on main fibre." },
      { title: "Process Conditions", desc: "pH 5.5–7.0, Temperature 50–60°C, Time 30–45 minutes. Mechanical action from machine rotation aids fibre removal." },
      { title: "Effect on Fabric", desc: "Removes surface hairiness, reduces pilling tendency, improves colour clarity (colours appear brighter due to cleaner surface), slight weight loss (2–5%)." },
      { title: "Softening After Bio Polish", desc: "Silicone softener applied after bio polishing enhances hand feel further. Combination gives luxury smooth-silky finish preferred for premium garments." },
      { title: "Advantage", desc: "Permanent effect — unlike mechanical polishing which is temporary. Improves appearance retention through washing. No harsh chemicals required." },
      { title: "Risk", desc: "Over-treatment causes excessive weight loss and strength reduction. Always run timed trials before bulk. Stop enzyme with temperature raise or pH shift." },
    ],
  },
};
export default function Dyeing() {
  const [active, setActive] = useState("Basic Knowledge");

  const current = content[active as keyof typeof content];

  return (
    <div>
      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #0d1520 0%, #1a2a4a 50%, #0d1520 100%)", padding: "4rem 2rem", borderBottom: "1px solid rgba(196,98,45,0.2)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ color: "#C4622D", fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1rem", fontWeight: 500 }}>
            Technical Reference
          </p>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", color: "#F0EDE8", lineHeight: 1.1, marginBottom: "1rem", maxWidth: 650 }}>
            Garment Dyeing — Complete Guide
          </h1>
          <p style={{ color: "rgba(220,215,205,0.6)", fontSize: "1rem", lineHeight: 1.7, maxWidth: 580 }}>
            A comprehensive technical reference covering everything from basic dyeing knowledge to troubleshooting, costing and bio polishing.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section style={{ background: "#111820", padding: "4rem 2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "220px 1fr", gap: "3rem", alignItems: "start" }}>

          {/* Sidebar Navigation */}
          <div style={{ position: "sticky", top: 80 }}>
            <p style={{ fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#555", marginBottom: "1rem" }}>
              Sections
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              {sections.map((s) => (
                <button
                  key={s}
                  onClick={() => setActive(s)}
                  style={{
                    padding: "0.75rem 1rem",
                    background: active === s ? "rgba(196,98,45,0.12)" : "transparent",
                    border: "none",
                    borderLeft: active === s ? "3px solid #C4622D" : "3px solid transparent",
                    color: active === s ? "#C4622D" : "#666",
                    fontSize: "0.825rem",
                    cursor: "pointer",
                    textAlign: "left",
                    fontFamily: "sans-serif",
                    letterSpacing: "0.02em",
                    transition: "all 0.2s",
                  }}
                >
                  {content[s as keyof typeof content].icon} {s}
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div>
            {/* Section Header */}
            <div style={{ marginBottom: "2rem", paddingBottom: "1.5rem", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
                <span style={{ fontSize: "1.75rem" }}>{current.icon}</span>
                <h2 style={{ fontFamily: "Georgia,serif", fontSize: "clamp(1.4rem, 3vw, 2rem)", color: "#F0EDE8", lineHeight: 1.2 }}>
                  {active}
                </h2>
              </div>
              <p style={{ color: "rgba(220,215,205,0.65)", fontSize: "0.95rem", lineHeight: 1.75, borderLeft: "3px solid #C4622D", paddingLeft: "1rem" }}>
                {current.intro}
              </p>
            </div>

            {/* Points */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {current.points.map((point, i) => (
                <div
                  key={point.title}
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    padding: "1.25rem 1.5rem",
                    display: "grid",
                    gridTemplateColumns: "28px 1fr",
                    gap: "1rem",
                    alignItems: "start",
                  }}
                >
                  <span style={{ fontFamily: "Georgia,serif", fontSize: "1rem", color: "rgba(196,98,45,0.5)", paddingTop: "0.15rem" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p style={{ fontSize: "0.9rem", color: "#E8E3DC", fontWeight: 500, marginBottom: "0.4rem" }}>
                      {point.title}
                    </p>
                    <p style={{ fontSize: "0.85rem", color: "#A0A0A0", lineHeight: 1.7 }}>
                      {point.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Before & After — only on Bio Polishing */}
            {active === "Bio Polishing" && (
              <div style={{ marginTop: "2rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", padding: "1.5rem" }}>
                <p style={{ fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#666", marginBottom: "1rem" }}>
                  Before & After Examples
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  {["Before Bio Polish", "After Bio Polish"].map((label) => (
                    <div key={label} style={{ background: "rgba(255,255,255,0.04)", border: "1px dashed rgba(255,255,255,0.1)", aspectRatio: "4/3", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                      <span style={{ fontSize: "1.5rem" }}>🖼️</span>
                      <p style={{ fontSize: "0.75rem", color: "#555", letterSpacing: "0.06em", textTransform: "uppercase" }}>{label}</p>
                      <p style={{ fontSize: "0.7rem", color: "#444" }}>Photo coming soon</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2.5rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
              <button
                onClick={() => {
                  const idx = sections.indexOf(active);
                  if (idx > 0) setActive(sections[idx - 1]);
                }}
                disabled={sections.indexOf(active) === 0}
                style={{ padding: "0.65rem 1.5rem", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: sections.indexOf(active) === 0 ? "#444" : "#A0A0A0", fontSize: "0.8rem", cursor: sections.indexOf(active) === 0 ? "not-allowed" : "pointer", fontFamily: "sans-serif" }}
              >
                ← Previous
              </button>
              <button
                onClick={() => {
                  const idx = sections.indexOf(active);
                  if (idx < sections.length - 1) setActive(sections[idx + 1]);
                }}
                disabled={sections.indexOf(active) === sections.length - 1}
                style={{ padding: "0.65rem 1.5rem", background: sections.indexOf(active) === sections.length - 1 ? "rgba(255,255,255,0.04)" : "#C4622D", border: "none", color: "white", fontSize: "0.8rem", cursor: sections.indexOf(active) === sections.length - 1 ? "not-allowed" : "pointer", fontFamily: "sans-serif" }}
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#2B2B2B", padding: "3rem 2rem", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <p style={{ color: "#A0A0A0", fontSize: "0.95rem", lineHeight: 1.8, marginBottom: "1.5rem" }}>
            Need expert guidance on garment dyeing processes or troubleshooting a specific issue?
          </p>
          <a href="mailto:joyanta.sarkar.texengg@gmail.com?subject=Garment%20Dyeing%20Consultation" style={{ display: "inline-block", background: "#C4622D", color: "white", padding: "0.875rem 2.5rem", fontSize: "0.9rem", letterSpacing: "0.04em", textDecoration: "none" }}>
            Ask Joyanta
          </a>
        </div>
      </section>
    </div>
  );
}