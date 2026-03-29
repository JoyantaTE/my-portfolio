"use client";
import { useEffect, useRef, useState } from "react";

function ResearchCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId: number, t = 0, last = 0;
    const bubbles = Array.from({ length: 40 }, () => ({
      x: Math.random() * 1400, y: Math.random() * 800,
      vy: -(0.2 + Math.random() * 0.5), r: 2 + Math.random() * 6,
      phase: Math.random() * Math.PI * 2,
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
        b.y += b.vy; b.x += 0.3 * Math.sin(time * 0.5 + b.phase);
        if (b.y < -20) { b.y = H + 20; b.x = Math.random() * W; }
        const alpha = 0.15 + 0.1 * Math.sin(time + b.phase);
        ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(100,180,255,${alpha})`; ctx.lineWidth = 0.8; ctx.stroke();
      });
      for (let i = 0; i < 4; i++) {
        const cx2 = W * (0.15 + i * 0.23), cy2 = H * 0.5;
        const r = 30 + 10 * Math.sin(time * 0.4 + i);
        ctx.beginPath(); ctx.arc(cx2, cy2, r, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(196,98,45,0.08)"; ctx.lineWidth = 1; ctx.stroke();
      }
      const vig = ctx.createRadialGradient(W/2, H/2, H*0.1, W/2, H/2, H*0.85);
      vig.addColorStop(0, "rgba(0,0,0,0)"); vig.addColorStop(1, "rgba(0,0,0,0.7)");
      ctx.fillStyle = vig; ctx.fillRect(0, 0, W, H);
    }
    function loop(ts: number) { const dt = ts - last; last = ts; t += dt * 0.01; draw(t); animId = requestAnimationFrame(loop); }
    resize(); window.addEventListener("resize", resize); animId = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }} />;
}
export default function Research() {
  const [active, setActive] = useState(0);

  const findings = [
    { agent: "H₂O₂", fullName: "Hydrogen Peroxide", whiteness: 67.46, dropTest: "2.15 sec", immersion: "3.04 sec", handfeel: "No stiffness", color: "#3d8a5a", verdict: "Best Overall" },
    { agent: "Na₂HOCl", fullName: "Sodium Hypochlorite", whiteness: 49.98, dropTest: "2:12 min", immersion: "1:33 min", handfeel: "More stiff", color: "#3d6b8a", verdict: "Moderate" },
    { agent: "NaH₂BO₄", fullName: "Sodium Perborate", whiteness: 33.24, dropTest: "27.00 sec", immersion: "9:07 min", handfeel: "Relatively less stiff", color: "#7a5a2a", verdict: "Lowest Performance" },
  ];

  return (
    <div>
      <section style={{ position: "relative", minHeight: "60vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <ResearchCanvas />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "5rem 2rem" }}>
          <p style={{ color: "#C4622D", fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1rem", fontWeight: 500 }}>
            B.Sc Thesis & Research
          </p>
          <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "#F0EDE8", lineHeight: 1.15, marginBottom: "1.5rem", maxWidth: 780, textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}>
            Whiteness Index & Absorbency of Cotton Knitted Fabric Using Different Bleaching Agents
          </h1>
          <p style={{ color: "rgba(220,215,205,0.65)", fontSize: "0.95rem", lineHeight: 1.8, maxWidth: 600, marginBottom: "2rem" }}>
            Comparing H₂O₂, Sodium Hypochlorite, and Sodium Perborate on 100% cotton single jersey fabric.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            {["Port City International University", "Textile Engineering", "March 2021"].map((tag) => (
              <span key={tag} style={{ fontSize: "0.75rem", color: "#C4622D", border: "1px solid rgba(196,98,45,0.3)", padding: "0.3rem 0.9rem" }}>{tag}</span>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "#2B2B2B", padding: "4rem 2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#666", marginBottom: "2rem" }}>Study Overview</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem" }}>
            {[
              { label: "Fabric", value: "100% Cotton S/J", sub: "GSM: 160" },
              { label: "Samples", value: "9 Samples", sub: "5g each" },
              { label: "Agents Tested", value: "3 Bleaching Agents", sub: "Oxidative bleaching" },
              { label: "Tests Conducted", value: "3 Test Types", sub: "Whiteness, Drop, Immersion" },
            ].map((item) => (
              <div key={item.label} style={{ borderTop: "2px solid #C4622D", paddingTop: "1.25rem" }}>
                <p style={{ fontSize: "0.7rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#666", marginBottom: "0.4rem" }}>{item.label}</p>
                <p style={{ fontSize: "1.05rem", color: "#E8E3DC", fontWeight: 500, marginBottom: "0.2rem" }}>{item.value}</p>
                <p style={{ fontSize: "0.8rem", color: "#A0A0A0" }}>{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "#1A1A1A", padding: "4rem 2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#666", marginBottom: "2rem" }}>Results & Findings</p>
          <div style={{ display: "flex", gap: "0.75rem", marginBottom: "2.5rem", flexWrap: "wrap" }}>
            {findings.map((f, i) => (
              <button key={f.agent} onClick={() => setActive(i)} style={{ padding: "0.6rem 1.5rem", background: active === i ? "#C4622D" : "rgba(255,255,255,0.05)", border: active === i ? "1px solid #C4622D" : "1px solid rgba(255,255,255,0.1)", color: active === i ? "white" : "#A0A0A0", fontSize: "0.875rem", cursor: "pointer", fontFamily: "sans-serif" }}>
                {f.agent}
              </button>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
            <div>
              <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.8rem", color: "#F0EDE8", marginBottom: "0.5rem" }}>{findings[active].agent}</h2>
              <p style={{ color: "#A0A0A0", fontSize: "0.9rem", marginBottom: "2rem" }}>{findings[active].fullName}</p>
              <div style={{ marginBottom: "2rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <span style={{ fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#666" }}>Whiteness Index (CIE)</span>
                  <span style={{ fontSize: "0.9rem", color: "#C4622D" }}>{findings[active].whiteness}%</span>
                </div>
                <div style={{ background: "rgba(255,255,255,0.08)", height: 8 }}>
                  <div style={{ width: `${findings[active].whiteness}%`, height: "100%", background: findings[active].color, transition: "width 0.6s ease" }} />
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                {[
                  { label: "Drop Test", value: findings[active].dropTest },
                  { label: "Immersion Test", value: findings[active].immersion },
                  { label: "Hand Feel", value: findings[active].handfeel },
                  { label: "Verdict", value: findings[active].verdict },
                ].map((stat) => (
                  <div key={stat.label} style={{ background: "rgba(255,255,255,0.04)", padding: "1rem", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <p style={{ fontSize: "0.7rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#666", marginBottom: "0.4rem" }}>{stat.label}</p>
                    <p style={{ fontSize: "0.9rem", color: "#E8E3DC" }}>{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#666", marginBottom: "1.5rem" }}>Whiteness Comparison</p>
              {findings.map((f) => (
                <div key={f.agent} style={{ marginBottom: "1rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                    <span style={{ fontSize: "0.85rem", color: f.agent === findings[active].agent ? "#F0EDE8" : "#A0A0A0" }}>{f.agent}</span>
                    <span style={{ fontSize: "0.85rem", color: "#C4622D" }}>{f.whiteness}%</span>
                  </div>
                  <div style={{ background: "rgba(255,255,255,0.06)", height: 6 }}>
                    <div style={{ width: `${f.whiteness}%`, height: "100%", background: f.agent === findings[active].agent ? f.color : "rgba(255,255,255,0.15)", transition: "width 0.6s ease" }} />
                  </div>
                </div>
              ))}
              <div style={{ marginTop: "2.5rem", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "1.5rem" }}>
                <p style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#666", marginBottom: "1rem" }}>Methodology</p>
                {[
                  { step: "01", text: "100% cotton S/J fabric cut into 9 samples of 5g each" },
                  { step: "02", text: "Bleached at respective temp & time in sample dyeing machine" },
                  { step: "03", text: "Whiteness measured via spectrophotometer (AATCC 110)" },
                  { step: "04", text: "Absorbency tested by drop test & immersion test" },
                ].map((s) => (
                  <div key={s.step} style={{ display: "flex", gap: "1rem", marginBottom: "0.75rem" }}>
                    <span style={{ fontSize: "0.75rem", color: "#C4622D", minWidth: 24 }}>{s.step}</span>
                    <span style={{ fontSize: "0.8rem", color: "#A0A0A0", lineHeight: 1.6 }}>{s.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: "#2B2B2B", padding: "4rem 2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#666", marginBottom: "2rem" }}>Conclusion</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "start" }}>
            <div>
              <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.8rem", color: "#F0EDE8", lineHeight: 1.2, marginBottom: "1.5rem" }}>
                H₂O₂ outperforms all agents across every measure.
              </h2>
              <p style={{ color: "#A0A0A0", fontSize: "0.95rem", lineHeight: 1.8 }}>
                Hydrogen peroxide achieved the highest whiteness at 67.46%, fastest absorbency, and softest hand feel — making it the clear choice for industrial cotton bleaching.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                { icon: "◎", text: "67.46% whiteness — highest among all three agents" },
                { icon: "◈", text: "Fastest absorbency — 3.04 sec average immersion time" },
                { icon: "◇", text: "No fabric stiffness — best hand feel result" },
                { icon: "⬡", text: "Eco-friendly reaction products — reduces pollution" },
              ].map((item) => (
                <div key={item.text} style={{ display: "flex", gap: "1rem", alignItems: "flex-start", background: "rgba(255,255,255,0.04)", padding: "1rem", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <span style={{ color: "#C4622D", fontSize: "1rem" }}>{item.icon}</span>
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
