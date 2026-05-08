"use client";
import { useState } from "react";

const sections = [
  "Overview",
  "Enzyme Wash",
  "Stone Wash",
  "Bleach Wash",
  "Peroxide Wash",
  "Acid Wash",
  "Sand Wash",
  "Normal Wash",
  "Silicone Wash",
  "Vintage Wash",
  "Moon Wash",
];

const content = {
  "Overview": {
    icon: "💧",
    intro: "Garment washing is a wet processing technique applied to finished garments to achieve specific aesthetic effects, softness, or cleanliness. The right wash process depends on fabric type, desired effect, and cost target.",
    points: [
      { title: "What is Garment Washing?", desc: "A post-production process where assembled garments are treated in washing machines with water, chemicals and/or mechanical action to achieve desired appearance and hand feel." },
      { title: "Why Wash Garments?", desc: "To achieve fashion effects (fading, distressing), improve softness, remove manufacturing residues, and add value to the finished product." },
      { title: "Suitable Fabrics", desc: "100% Cotton, Denim, Linen, Viscose, and blends. Each fabric responds differently — process parameters must be adjusted accordingly." },
      { title: "Key Factors", desc: "Liquor ratio, temperature, time, pH, mechanical action, and chemical concentration all affect the final result. Changing one affects all others." },
      { title: "Machine Types", desc: "Front-loading rotary machines, paddle machines, and tumble dryers are the most common. Machine capacity and rotation speed affect the wash effect significantly." },
    ],
  },
  "Enzyme Wash": {
    icon: "🧬",
    intro: "The most widely used biological washing process in the garment industry. Enzymes act on the fabric surface to create controlled fading, bio-stoning and polishing effects.",
    points: [
      { title: "Definition", desc: "Uses cellulase enzymes to break down surface cellulose fibrils on cotton/denim. Produces bio-stoning, colour fading and surface smoothing effects." },
      { title: "Types of Enzyme", desc: "Acid cellulase (strongest effect, high backstaining risk), Neutral cellulase (balanced, lower risk), Bio-polish cellulase (surface smoothing only)." },
      { title: "Pros", desc: "Eco-friendly vs stone washing. Controlled, repeatable effect. Soft hand feel. No pumice stone disposal problem. Works on all cotton constructions." },
      { title: "Cons", desc: "Backstaining risk on denim. Fabric strength loss if overdosed. Strict pH and temperature control required. Higher cost than normal wash." },
      { title: "Cost", desc: "Low to medium. Enzyme cost is offset by reduced stone usage and machine wear. Overall one of the most cost-effective specialty washes." },
      { title: "Best For", desc: "Denim bio-stoning, cotton bio-polishing, surface hair removal, combined stone + enzyme processes for enhanced fading." },
    ],
  },
  "Stone Wash": {
    icon: "🪨",
    intro: "The original denim washing technique. Pumice stones physically abrade the garment surface to create a worn, vintage appearance with high contrast fading.",
    points: [
      { title: "Definition", desc: "Garments tumbled with pumice stones in washing machines. Physical abrasion from stones removes surface dye and creates a worn, aged look." },
      { title: "Stone Types", desc: "Pumice stones (most common), synthetic abrasive stones, and rubber balls. Stone size and hardness affect the intensity of abrasion." },
      { title: "Pros", desc: "Authentic vintage look. Heavy, dramatic fading. High contrast between raised and recessed fabric areas. Timeless fashion appeal." },
      { title: "Cons", desc: "Stone dust damages machines over time. Stones must be removed from garment pockets after washing. Heavy on fabric — strength loss risk. Not suitable for delicate constructions." },
      { title: "Cost", desc: "Low to medium. Pumice stones are cheap but machine maintenance costs increase over time due to abrasion damage." },
      { title: "Best For", desc: "Heavy denim jeans and jackets requiring authentic vintage distressed look. Not suitable for lightweight or delicate fabrics." },
    ],
  },
  "Bleach Wash": {
    icon: "🌊",
    intro: "Uses sodium hypochlorite to chemically decolorize indigo dye on denim. Creates dramatic, high-contrast fading effects that are difficult to achieve with enzymes alone.",
    points: [
      { title: "Definition", desc: "Sodium hypochlorite (NaOCl) added to wash bath oxidizes and destroys indigo dye molecules on fabric surface, creating dramatic colour removal." },
      { title: "Process", desc: "Garments loaded with bleach solution at controlled concentration. After required effect achieved, bleach must be thoroughly neutralized with sodium thiosulphate or hydrogen peroxide." },
      { title: "Pros", desc: "Dramatic colour change. Very low cost. Fast process. High contrast fading achievable. Can be combined with other processes." },
      { title: "Cons", desc: "Fabric damage risk if not controlled. Requires careful neutralization. Environmental impact from chlorine discharge. Degrades most dyes and OBA." },
      { title: "Cost", desc: "Very low. Sodium hypochlorite is one of the cheapest chemicals in wet processing. Cost is mostly in careful process control and neutralization." },
      { title: "Best For", desc: "Dark denim requiring strong fading. High-contrast vintage effects. Combined with enzyme wash for enhanced results." },
    ],
  },
  "Peroxide Wash": {
    icon: "⚗️",
    intro: "Hydrogen peroxide used as an eco-friendly bleaching alternative. Produces even, stable whitening and colour lifting without the harshness of chlorine bleach.",
    points: [
      { title: "Definition", desc: "H₂O₂ in alkaline conditions oxidizes coloring matter in fabric. Produces uniform whitening and colour lifting — commonly used after enzyme wash for combined effects." },
      { title: "Process Conditions", desc: "Temperature 60–98°C, pH 10–11.5, stabilizer required to control decomposition rate. Thorough rinsing essential after treatment." },
      { title: "Pros", desc: "Eco-friendly — breaks down to water and oxygen. Stable white result. Good absorbency improvement. No chlorine discharge. Works on all cotton types." },
      { title: "Cons", desc: "Higher temperature requirement means higher energy cost. Slower than chlorine bleach. Needs stabilizer to prevent uncontrolled decomposition." },
      { title: "Cost", desc: "Low to medium. H₂O₂ is affordable but energy cost for high temperature processing adds to total cost." },
      { title: "Best For", desc: "Cotton knit bleaching, denim lightening, combined with enzyme wash for bio-stone + bleach effects. Standard bleaching for white garments." },
    ],
  },
  "Acid Wash": {
    icon: "🔬",
    intro: "A specialty wash technique using chemical-soaked pumice stones on dry garments. Creates distinctive irregular cloud-like fading patterns unique to this process.",
    points: [
      { title: "Definition", desc: "Pumice stones soaked in potassium permanganate (KMnO₄) or sodium hypochlorite applied to dry garments in tumble machines. Creates irregular, high-contrast cloud patterns." },
      { title: "Process", desc: "Garments loaded dry (no water). Pre-soaked stones tumble with garments. Chemical transfers unevenly from stone contact points creating the cloud effect. Neutralization required after." },
      { title: "Pros", desc: "Unique cloud-like pattern impossible to replicate with other processes. High fashion value. Distinctive vintage look. Strong visual impact." },
      { title: "Cons", desc: "KMnO₄ is hazardous — requires careful handling and PPE. Difficult to control for consistency. Environmental concerns with permanganate discharge." },
      { title: "Cost", desc: "Medium to high. Chemical cost moderate but process control and PPE requirements add to total cost. Consistency challenges increase rejection risk." },
      { title: "Best For", desc: "Denim with high-fashion cloud effect. Specialty and limited edition collections. Not suitable for mass production requiring consistency." },
    ],
  },
  "Sand Wash": {
    icon: "🏖️",
    intro: "Uses fine sand or sand-blasting techniques to create a very soft, peach-skin surface texture with subtle, uniform fading across the garment.",
    points: [
      { title: "Definition", desc: "Fine sand particles or sand-blasting equipment used to abrade fabric surface. Creates smooth, peach-skin texture with gentle, uniform fading." },
      { title: "Wet Sand Wash", desc: "Fine sand added to wash machine with garments and water. Mechanical tumbling creates uniform surface abrasion. Suitable for delicate fabrics." },
      { title: "Pros", desc: "Ultra-soft hand feel. Subtle uniform fading. Works on delicate fabrics including silk and synthetic blends. Luxurious surface texture." },
      { title: "Cons", desc: "Sand removal from garments requires thorough rinsing. Machine wear from sand abrasion. Less dramatic effect than stone wash. Higher processing time." },
      { title: "Cost", desc: "Medium to high. Sand is inexpensive but processing time, machine maintenance and thorough rinsing requirements increase overall cost." },
      { title: "Best For", desc: "Silk, synthetic blends, lightweight cotton. Premium garments requiring soft hand feel with subtle surface effect." },
    ],
  },
  "Normal Wash": {
    icon: "💧",
    intro: "The most basic garment washing process. Cleans garments, removes manufacturing residues, and provides a fresh, comfortable base for all other finishing treatments.",
    points: [
      { title: "Definition", desc: "Standard washing with detergent and water at moderate temperature. Removes dust, sizing agents, manufacturing oils and odours. No special chemical effect." },
      { title: "Process", desc: "Detergent added at 40–60°C, garments run for 15–30 minutes, rinsed thoroughly. Softener added in final rinse for improved hand feel." },
      { title: "Pros", desc: "Very simple process. Extremely low cost. No risk of fabric damage. Suitable for all fabric types. Fast turnaround." },
      { title: "Cons", desc: "No special aesthetic effect. Only basic cleaning achieved. Cannot replace specialty wash effects. Limited value addition." },
      { title: "Cost", desc: "Very low. Detergent and water only. Most economical wash process available." },
      { title: "Best For", desc: "Basic cleaning of all garment types. Pre-treatment before other processes. Final cleaning after specialty wash processes." },
    ],
  },
  "Silicone Wash": {
    icon: "✨",
    intro: "A premium finishing process using silicone-based softeners to create an exceptionally smooth, silky hand feel. Popular for high-end garment finishing.",
    points: [
      { title: "Definition", desc: "Silicone softener applied during washing process. Creates smooth, silky surface coating on fabric fibres. Long-lasting soft effect compared to conventional softeners." },
      { title: "Silicone Types", desc: "Amino silicone (best softness), micro silicone (uniform coating), macro silicone (durable effect). Choice depends on required softness level and durability." },
      { title: "Pros", desc: "Superior softness vs conventional softeners. Long-lasting effect through multiple washes. Improves drape and handle. Premium product positioning." },
      { title: "Cons", desc: "Higher cost than standard softeners. Can affect re-dyeing if applied before colour correction. Some silicones cause yellowing over time if not properly selected." },
      { title: "Cost", desc: "Medium to high. Silicone softeners cost more than conventional but the quality improvement justifies the premium for high-end products." },
      { title: "Best For", desc: "Premium cotton, denim finishing, knitwear. Any garment requiring luxury hand feel positioning." },
    ],
  },
  "Vintage Wash": {
    icon: "🎞️",
    intro: "A multi-step combination process creating an authentic aged, worn-in appearance. Requires careful sequencing of enzyme, bleach and mechanical treatments.",
    points: [
      { title: "Definition", desc: "Combination of enzyme wash, bleach wash and mechanical treatments applied in sequence to create authentic aged, worn-in vintage appearance." },
      { title: "Typical Process Sequence", desc: "Desizing → Enzyme wash (bio-stoning) → Bleach wash (fading) → Neutralization → Softening → Drying. Each step builds the vintage character." },
      { title: "Pros", desc: "Authentic vintage look with depth and character. High fashion value. Multi-dimensional effect not achievable with single process." },
      { title: "Cons", desc: "Multi-step process — long production time. Higher cost due to multiple chemical treatments. More quality control checkpoints required." },
      { title: "Cost", desc: "High. Multiple process steps, chemicals and time make this one of the most expensive standard wash types." },
      { title: "Best For", desc: "Premium denim collections. Fashion brands requiring authentic vintage character. Heritage and lifestyle brands." },
    ],
  },
  "Moon Wash": {
    icon: "🌙",
    intro: "A specialty combination process creating high-contrast areas with soft fading between them — producing distinctive moon-like surface patterns on denim.",
    points: [
      { title: "Definition", desc: "Combination of selective bleaching and enzyme treatment creating high-contrast bright and dark areas that resemble the surface of the moon." },
      { title: "Process", desc: "Selective application of bleaching agent to raised fabric areas while recessed areas remain darker. Enzyme treatment softens the transition between light and dark zones." },
      { title: "Pros", desc: "Highly distinctive surface pattern. Premium fashion appearance. Unique visual effect that stands out on retail floor." },
      { title: "Cons", desc: "Difficult to control consistency batch to batch. Requires skilled operators. Long process time. High rejection risk if not controlled carefully." },
      { title: "Cost", desc: "High. Complexity of process, skill requirement and higher rejection risk make moon wash one of the most expensive specialty processes." },
      { title: "Best For", desc: "Premium denim. Limited edition collections. Fashion brands targeting distinctive visual effects." },
    ],
  },
};
export default function WashProcesses() {
  const [active, setActive] = useState("Overview");
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
            Garment Wash Processes — Complete Guide
          </h1>
          <p style={{ color: "rgba(220,215,205,0.6)", fontSize: "1rem", lineHeight: 1.7, maxWidth: 580 }}>
            A comprehensive technical reference covering all major garment washing techniques — from basic normal wash to specialty vintage and moon wash.
          </p>
          <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", marginTop: "2rem" }}>
            {[
              { num: "Multiple", label: "Wash Types" },
              { num: "5+", label: "Years Experience" },
              { num: "10+", label: "Global Brands" },
            ].map((s) => (
              <div key={s.label} style={{ borderLeft: "2px solid #C4622D", paddingLeft: "1rem" }}>
                <p style={{ fontFamily: "Georgia,serif", fontSize: "1.8rem", color: "#C4622D", lineHeight: 1 }}>{s.num}</p>
                <p style={{ fontSize: "0.8rem", color: "#A0A0A0", marginTop: "0.25rem" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section style={{ background: "#111820", padding: "4rem 2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "220px 1fr", gap: "3rem", alignItems: "start" }}>

          {/* Sidebar */}
          <div style={{ position: "sticky", top: 80 }}>
            <p style={{ fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#555", marginBottom: "1rem" }}>
              Wash Types
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

            {/* Enzyme link */}
            {active === "Enzyme Wash" && (
              <div style={{ marginTop: "2rem", background: "rgba(196,98,45,0.06)", border: "1px solid rgba(196,98,45,0.2)", padding: "1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
                <div>
                  <p style={{ fontSize: "0.8rem", color: "#C4622D", marginBottom: "0.25rem", letterSpacing: "0.04em" }}>Want more detail?</p>
                  <p style={{ fontSize: "0.9rem", color: "#E8E3DC" }}>View the full Enzyme Wash reference — all enzyme types, pros, cons and cost breakdown.</p>
                </div>
                <a href="/enzyme" style={{ display: "inline-block", background: "#C4622D", color: "white", padding: "0.65rem 1.5rem", fontSize: "0.85rem", textDecoration: "none", letterSpacing: "0.04em", whiteSpace: "nowrap" }}>
                  Full Enzyme Guide
                </a>
              </div>
            )}

            {/* Before & After placeholder */}
            <div style={{ marginTop: "2rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", padding: "1.5rem" }}>
              <p style={{ fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#666", marginBottom: "1rem" }}>
                Before & After Examples
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                {["Before", "After"].map((label) => (
                  <div key={label} style={{ background: "rgba(255,255,255,0.04)", border: "1px dashed rgba(255,255,255,0.1)", aspectRatio: "4/3", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                    <span style={{ fontSize: "1.5rem" }}>🖼️</span>
                    <p style={{ fontSize: "0.75rem", color: "#555", letterSpacing: "0.06em", textTransform: "uppercase" }}>{label}</p>
                    <p style={{ fontSize: "0.7rem", color: "#444" }}>Photo coming soon</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Prev / Next */}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2.5rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
              <button
                onClick={() => { const idx = sections.indexOf(active); if (idx > 0) setActive(sections[idx - 1]); }}
                disabled={sections.indexOf(active) === 0}
                style={{ padding: "0.65rem 1.5rem", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: sections.indexOf(active) === 0 ? "#444" : "#A0A0A0", fontSize: "0.8rem", cursor: sections.indexOf(active) === 0 ? "not-allowed" : "pointer", fontFamily: "sans-serif" }}
              >
                ← Previous
              </button>
              <button
                onClick={() => { const idx = sections.indexOf(active); if (idx < sections.length - 1) setActive(sections[idx + 1]); }}
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
            Need process guidance on any wash technique for your specific fabric or target effect?
          </p>
          <a href="mailto:joyanta.sarkar.texengg@gmail.com?subject=Wash%20Process%20Consultation" style={{ display: "inline-block", background: "#C4622D", color: "white", padding: "0.875rem 2.5rem", fontSize: "0.9rem", letterSpacing: "0.04em", textDecoration: "none" }}>
            Ask Joyanta
          </a>
        </div>
      </section>
    </div>
  );
}