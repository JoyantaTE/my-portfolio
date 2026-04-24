"use client";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

function WashCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId: number, t = 0, last = 0;
    const bubbles = Array.from({ length: 50 }, () => ({
      x: Math.random() * 1400, y: Math.random() * 800,
      vy: -(0.3 + Math.random() * 0.8), r: 2 + Math.random() * 8,
      phase: Math.random() * Math.PI * 2,
      vx: (Math.random() - 0.5) * 0.3,
    }));
    function resize() { if (!canvas) return; canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; }
    function draw(time: number) {
      if (!canvas || !ctx) return;
      const W = canvas.width, H = canvas.height;
      ctx.fillStyle = "#0a1628"; ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = "rgba(255,255,255,0.02)"; ctx.lineWidth = 0.5;
      for (let x = 0; x < W; x += 50) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      for (let y = 0; y < H; y += 50) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
      bubbles.forEach(b => {
        b.y += b.vy; b.x += b.vx + 0.5 * Math.sin(time * 0.4 + b.phase);
        if (b.y < -20) { b.y = H + 20; b.x = Math.random() * W; }
        if (b.x < 0) b.x = W; if (b.x > W) b.x = 0;
        const alpha = 0.1 + 0.1 * Math.sin(time + b.phase);
        ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(196,98,45,${alpha})`; ctx.lineWidth = 0.8; ctx.stroke();
        // Bubble shine
        ctx.beginPath(); ctx.arc(b.x - b.r * 0.3, b.y - b.r * 0.3, b.r * 0.25, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha * 0.5})`; ctx.fill();
      });
      // Water ripples
      for (let i = 0; i < 3; i++) {
        const rx = W * (0.2 + i * 0.3) + 30 * Math.sin(time * 0.2 + i);
        const ry = H * 0.6 + 20 * Math.cos(time * 0.15 + i);
        const rr = 80 + 40 * Math.sin(time * 0.3 + i);
        ctx.beginPath(); ctx.ellipse(rx, ry, rr, rr * 0.3, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(196,98,45,0.05)`; ctx.lineWidth = 1; ctx.stroke();
      }
      const vig = ctx.createRadialGradient(W / 2, H / 2, H * 0.1, W / 2, H / 2, H * 0.9);
      vig.addColorStop(0, "rgba(0,0,0,0)"); vig.addColorStop(1, "rgba(0,0,0,0.75)");
      ctx.fillStyle = vig; ctx.fillRect(0, 0, W, H);
    }
    function loop(ts: number) { const dt = ts - last; last = ts; t += dt * 0.01; draw(t); animId = requestAnimationFrame(loop); }
    resize(); window.addEventListener("resize", resize); animId = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }} />;
}
const washTypes = [
  {
    id: "enzyme",
    title: "Enzyme Wash",
    icon: "🧬",
    tag: "Most Popular",
    tagColor: "#3d8a5a",
    desc: "Uses biological enzymes (cellulase, laccase etc.) to modify fabric surface. Produces bio-stoning, bio-polishing and color fading effects without harsh chemicals.",
    effect: "Bio-stoning, surface smoothing, color fading",
    fabric: "100% Cotton, Denim",
    temp: "45 – 60°C",
    time: "30 – 60 min",
    pH: "4.5 – 7.0",
    cost: 2,
    link: "/enzyme",
    highlights: ["Eco-friendly", "Soft hand feel", "Controlled fading"],
  },
  {
    id: "stone",
    title: "Stone Wash",
    icon: "🪨",
    tag: "Classic",
    tagColor: "#5a5a5a",
    desc: "Pumice stones tumbled with garments in washing machine. Physical abrasion creates vintage worn look. Heavy on machine and fabric.",
    effect: "Heavy abrasion, vintage worn look",
    fabric: "Denim, Heavy Cotton",
    temp: "40 – 60°C",
    time: "60 – 120 min",
    pH: "6.0 – 8.0",
    cost: 2,
    link: null,
    highlights: ["Authentic vintage look", "Heavy fading", "Deep abrasion marks"],
  },
  {
    id: "bleach",
    title: "Bleach Wash",
    icon: "🌊",
    tag: "High Impact",
    tagColor: "#C4622D",
    desc: "Sodium hypochlorite used to decolorize indigo dye on denim. Creates dramatic fading and high contrast. Requires careful neutralization.",
    effect: "Dramatic decolorization, high contrast",
    fabric: "Denim, Dark Cotton",
    temp: "20 – 40°C",
    time: "15 – 40 min",
    pH: "9.0 – 11.0",
    cost: 1,
    link: null,
    highlights: ["Dramatic color change", "Very low cost", "Fast process"],
  },
  {
    id: "peroxide",
    title: "Peroxide Wash",
    icon: "⚗️",
    tag: "Eco Choice",
    tagColor: "#3d6b8a",
    desc: "Hydrogen peroxide used for bleaching and color lifting. Eco-friendly alternative to chlorine bleach. Produces even, stable whiteness.",
    effect: "Even whitening, color lifting",
    fabric: "Cotton, Denim, Knit",
    temp: "60 – 98°C",
    time: "30 – 60 min",
    pH: "10.0 – 11.5",
    cost: 2,
    link: null,
    highlights: ["Stable white result", "No chlorine", "Good absorbency"],
  },
  {
    id: "acid",
    title: "Acid Wash",
    icon: "🔬",
    tag: "Specialty",
    tagColor: "#7a3a1a",
    desc: "Pumice stones soaked in potassium permanganate or sodium hypochlorite applied to dry garments. Creates irregular, cloudy fading patterns.",
    effect: "Irregular cloud-like fading patterns",
    fabric: "Denim",
    temp: "Room temp",
    time: "20 – 45 min",
    pH: "Varies",
    cost: 3,
    link: null,
    highlights: ["Unique cloud effect", "High fashion look", "Distinctive patterns"],
  },
  {
    id: "sand",
    title: "Sand Wash",
    icon: "🏖️",
    tag: "Soft Feel",
    tagColor: "#7a6a2a",
    desc: "Fine sand or sand-blasting used to abrade fabric surface. Creates very soft, peach-skin hand feel with subtle fading.",
    effect: "Soft peach-skin surface, subtle fade",
    fabric: "Silk, Synthetic, Cotton",
    temp: "30 – 50°C",
    time: "30 – 60 min",
    pH: "6.0 – 8.0",
    cost: 3,
    link: null,
    highlights: ["Ultra soft hand feel", "Subtle uniform fade", "Works on delicate fabrics"],
  },
  {
    id: "normal",
    title: "Normal Wash",
    icon: "💧",
    tag: "Basic",
    tagColor: "#3d3d3d",
    desc: "Standard garment wash with detergent and water. Removes dust, sizing agents and manufacturing odours. No special effect.",
    effect: "Cleaning, softening, odour removal",
    fabric: "All fabric types",
    temp: "40 – 60°C",
    time: "15 – 30 min",
    pH: "7.0 – 9.0",
    cost: 1,
    link: null,
    highlights: ["Simple process", "Very low cost", "No special chemicals"],
  },
  {
    id: "silicon",
    title: "Silicone Wash",
    icon: "✨",
    tag: "Premium",
    tagColor: "#4a3d7a",
    desc: "Silicone-based softeners applied during washing. Creates extremely smooth, silky hand feel. Popular for premium garment finishing.",
    effect: "Silky smooth hand feel",
    fabric: "Cotton, Denim, Knit",
    temp: "30 – 50°C",
    time: "20 – 40 min",
    pH: "5.0 – 7.0",
    cost: 3,
    link: null,
    highlights: ["Superior softness", "Luxury hand feel", "Long lasting effect"],
  },
  {
    id: "vintage",
    title: "Vintage Wash",
    icon: "🎞️",
    tag: "Fashion",
    tagColor: "#5a3a1a",
    desc: "Combination of enzyme, bleach and mechanical treatments to create aged, worn-in vintage appearance. Multi-step process.",
    effect: "Aged worn-in vintage appearance",
    fabric: "Denim, Heavy Cotton",
    temp: "40 – 60°C",
    time: "90 – 180 min",
    pH: "Varies per step",
    cost: 4,
    link: null,
    highlights: ["Authentic vintage look", "Multi-step effect", "High fashion value"],
  },
  {
    id: "moon",
    title: "Moon Wash",
    icon: "🌙",
    tag: "Specialty",
    tagColor: "#2a3a5a",
    desc: "Combination of bleach and enzyme wash creating high contrast areas with soft fading between. Creates moon-like surface patterns.",
    effect: "High contrast moon-like patterns",
    fabric: "Denim",
    temp: "40 – 55°C",
    time: "45 – 90 min",
    pH: "Varies",
    cost: 4,
    link: null,
    highlights: ["Unique surface pattern", "High contrast fading", "Premium fashion look"],
  },
];

export default function WashProcesses() {
  const router = useRouter();

  return (
    <div>
      {/* Hero */}
      <section style={{ position: "relative", minHeight: "50vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <WashCanvas />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "5rem 2rem" }}>
          <p style={{ color: "#C4622D", fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1rem", fontWeight: 500 }}>
            Technical Reference
          </p>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#F0EDE8", lineHeight: 1.1, marginBottom: "1.5rem", maxWidth: 700, textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}>
            Garment Wash Processes
          </h1>
          <p style={{ color: "rgba(220,215,205,0.65)", fontSize: "1rem", lineHeight: 1.8, maxWidth: 580 }}>
            A complete guide to all major garment washing techniques — from basic enzyme wash to specialty vintage and moon wash. Click any card for full details.
          </p>
          <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", marginTop: "2rem" }}>
            {[
              { num: "10", label: "Wash Types" },
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

      {/* Wash Cards Grid */}
      <section style={{ background: "#1A1A1A", padding: "4rem 2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#666", marginBottom: "2.5rem" }}>
            All Wash Types
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.25rem" }}>
            {washTypes.map((w) => (
              <div
                key={w.id}
                onClick={() => w.link && router.push(w.link)}
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", padding: "1.75rem", cursor: w.link ? "pointer" : "default", position: "relative", transition: "border-color 0.2s", borderTop: `2px solid ${w.tagColor}` }}
                onMouseEnter={e => { if (w.link) (e.currentTarget as HTMLDivElement).style.borderColor = "#C4622D"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderTopColor = w.tagColor; (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.08)"; (e.currentTarget as HTMLDivElement).style.borderTopColor = w.tagColor; }}
              >
                {/* Tag */}
                <span style={{ position: "absolute", top: "1rem", right: "1rem", fontSize: "0.65rem", letterSpacing: "0.08em", textTransform: "uppercase", color: w.tagColor, border: `1px solid ${w.tagColor}44`, padding: "0.2rem 0.6rem" }}>
                  {w.tag}
                </span>

                {/* Icon + Title */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                  <span style={{ fontSize: "1.75rem" }}>{w.icon}</span>
                  <h3 style={{ fontFamily: "Georgia,serif", fontSize: "1.15rem", color: "#F0EDE8", lineHeight: 1.2 }}>{w.title}</h3>
                </div>

                <p style={{ fontSize: "0.85rem", color: "#A0A0A0", lineHeight: 1.7, marginBottom: "1.25rem" }}>{w.desc}</p>

                {/* Quick params */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", marginBottom: "1.25rem" }}>
                  {[
                    { label: "Temp", value: w.temp },
                    { label: "Time", value: w.time },
                    { label: "pH", value: w.pH },
                    { label: "Cost", value: "★".repeat(w.cost) + "☆".repeat(4 - w.cost) },
                  ].map((p) => (
                    <div key={p.label} style={{ background: "rgba(255,255,255,0.03)", padding: "0.5rem 0.75rem" }}>
                      <p style={{ fontSize: "0.6rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#555", marginBottom: "0.2rem" }}>{p.label}</p>
                      <p style={{ fontSize: "0.8rem", color: "#E8E3DC" }}>{p.value}</p>
                    </div>
                  ))}
                </div>

                {/* Highlights */}
                <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                  {w.highlights.map((h) => (
                    <span key={h} style={{ fontSize: "0.7rem", color: "#666", border: "1px solid rgba(255,255,255,0.06)", padding: "0.2rem 0.6rem" }}>{h}</span>
                  ))}
                </div>

                {w.link && (
                  <p style={{ marginTop: "1rem", fontSize: "0.8rem", color: "#C4622D", letterSpacing: "0.04em" }}>
                    View full details →
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#111820", padding: "4rem 2rem", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "Georgia,serif", fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "#F0EDE8", marginBottom: "1rem" }}>
            Need process guidance?
          </h2>
          <p style={{ color: "#A0A0A0", fontSize: "0.95rem", lineHeight: 1.8, marginBottom: "2rem" }}>
            With 5 years of hands-on wash technology experience at Pacific Jeans, I can help you choose the right process for your fabric and target effect.
          </p>
          <a href="mailto:joyanta.sarkar.texengg@gmail.com?subject=Wash%20Process%20Consultation" style={{ display: "inline-block", background: "#C4622D", color: "white", padding: "0.875rem 2.5rem", fontSize: "0.9rem", letterSpacing: "0.04em", textDecoration: "none" }}>
            Get in Touch →
          </a>
        </div>
      </section>
    </div>
  );
}