"use client";
import { useEffect, useRef } from "react";

function AboutCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId: number, t = 0, last = 0;
    const molecules = Array.from({ length: 22 }, (_, i) => ({
      x: Math.random() * 1200, y: Math.random() * 800,
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
      r: 6 + Math.random() * 10, type: i % 4,
      phase: Math.random() * Math.PI * 2, bonds: Math.floor(2 + Math.random() * 3),
    }));
    const colors = ["#3d6b8a", "#2a7a5a", "#7a5a2a", "#5a3d7a"];
    function resize() { if (!canvas) return; canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; }
    function draw(time: number) {
      if (!canvas || !ctx) return;
      const W = canvas.width, H = canvas.height;
      ctx.fillStyle = "#111820"; ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = "rgba(255,255,255,0.025)"; ctx.lineWidth = 0.5;
      for (let x = 0; x < W; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      for (let y = 0; y < H; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
      molecules.forEach(m => {
        m.x += m.vx; m.y += m.vy;
        if (m.x < -50) m.x = W + 50; if (m.x > W + 50) m.x = -50;
        if (m.y < -50) m.y = H + 50; if (m.y > H + 50) m.y = -50;
        const pulse = 1 + 0.08 * Math.sin(time * 0.8 + m.phase);
        const r = m.r * pulse;
        const col = colors[m.type];
        for (let b = 0; b < m.bonds; b++) {
          const angle = (b / m.bonds) * Math.PI * 2 + time * 0.15 + m.phase;
          const len = r * 2.8;
          ctx.beginPath(); ctx.moveTo(m.x + Math.cos(angle) * r, m.y + Math.sin(angle) * r);
          ctx.lineTo(m.x + Math.cos(angle) * len, m.y + Math.sin(angle) * len);
          ctx.strokeStyle = col + "44"; ctx.lineWidth = 1.5; ctx.stroke();
        }
        ctx.beginPath(); ctx.arc(m.x, m.y, r, 0, Math.PI * 2);
        ctx.fillStyle = col + "aa"; ctx.fill();
        ctx.strokeStyle = col; ctx.lineWidth = 1; ctx.stroke();
      });
      for (let i = 0; i < molecules.length; i++) {
        for (let j = i + 1; j < molecules.length; j++) {
          const dx = molecules[i].x - molecules[j].x, dy = molecules[i].y - molecules[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath(); ctx.moveTo(molecules[i].x, molecules[i].y); ctx.lineTo(molecules[j].x, molecules[j].y);
            ctx.strokeStyle = `rgba(100,180,150,${0.15 * (1 - dist / 100)})`; ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
      }
      const vig = ctx.createRadialGradient(W/2, H/2, H*0.1, W/2, H/2, H*0.85);
      vig.addColorStop(0, "rgba(0,0,0,0)"); vig.addColorStop(1, "rgba(0,0,0,0.6)");
      ctx.fillStyle = vig; ctx.fillRect(0, 0, W, H);
    }
    function loop(ts: number) { const dt = ts - last; last = ts; t += dt * 0.01; draw(t); animId = requestAnimationFrame(loop); }
    resize(); window.addEventListener("resize", resize); animId = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }} />;
}
export default function About() {
  const skills = [
    { category: "Textile Processing", items: ["Reactive Dyeing", "Garment Washing", "Enzyme Washing", "Stone Washing","Pigment Dyeing", "Double Dyeing", "Bio Polishing", "Ozone", "Random/Moon", "Bleaching"] },
    { category: "Chemical Knowledge", items: ["Dye Chemistry", "Textile Auxiliaries", "Surfactants", "Effluent Treatment", "ZDHC", "EIM Scoring"] },
    { category: "R&D & Analysis", items: ["Lab Testing", "Process Optimization", "Costing", "Repeatability", "Data Analysis"] },
    { category: "Quality Assurance", items: ["AQL", "Customer Complaints", "Ground Tracking and Reporting", "Compliance"] },
  ];

  return (
    <div>
      {/* Hero */}
      <section style={{ position: "relative", minHeight: "70vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <AboutCanvas />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "5rem 2rem", width: "100%", display: "grid", gridTemplateColumns: "1fr 280px", gap: "4rem", alignItems: "center" }}>

          {/* Left — text */}
          <div>
            <p style={{ color: "#C4622D", fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1rem", fontWeight: 500 }}>
              About Me
            </p>
            <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", color: "#F0EDE8", lineHeight: 1.1, marginBottom: "1.5rem", textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}>
              Engineer with a passion for precision.
            </h1>
            <div style={{ borderLeft: "3px solid #C4622D", paddingLeft: "1.25rem", marginBottom: "2rem" }}>
              <p style={{ fontSize: "clamp(1rem, 2vw, 1.15rem)", color: "rgba(240,237,232,0.85)", lineHeight: 1.7, fontStyle: "italic" }}>
                "5 years turning water, chemistry and heat into results — currently optimizing wash technology at Pacific Jeans, where I cut water usage by 10% and I&apos;m not done yet."
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
              {[
                { label: "Role", val: "Executive" },
                { label: "Company", val: "Pacific Jeans" },
                { label: "Experience", val: "5 Years" },
                { label: "Speciality", val: "Wash Technology" },
              ].map((s) => (
                <div key={s.label} style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", padding: "0.75rem 1rem" }}>
                  <p style={{ fontSize: "0.7rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#C4622D", marginBottom: "0.25rem" }}>{s.label}</p>
                  <p style={{ fontSize: "0.9rem", color: "#E8E3DC" }}>{s.val}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — photo */}
          <div style={{ position: "relative" }}>
            <img
              src="/profile.jpg"
              alt="Joyanta"
              style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover", filter: "grayscale(100%) contrast(1.1)", display: "block", borderBottom: "4px solid #C4622D" }}
            />
            <div style={{ position: "absolute", top: 12, right: -12, width: "100%", height: "100%", border: "1px solid rgba(196,98,45,0.25)", zIndex: -1 }} />
          </div>

        </div>
      </section>

      {/* Skills */}
      <section style={{ background: "#2B2B2B", padding: "4rem 2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#666", marginBottom: "2.5rem" }}>
            Skills & Knowledge
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "2rem" }}>
            {skills.map((group) => (
              <div key={group.category}>
                <h3 style={{ fontSize: "1rem", color: "#C4622D", marginBottom: "1rem", borderBottom: "1px solid #444", paddingBottom: "0.5rem" }}>
                  {group.category}
                </h3>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {group.items.map((item) => (
                    <li key={item} style={{ color: "#A0A0A0", fontSize: "0.875rem", padding: "0.3rem 0" }}>— {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Hire Me + Consultancy */}
      <section style={{ background: "#111820", padding: "4rem 2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#666", marginBottom: "2.5rem" }}>
            Why Work With Me
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "start" }}>
            <div>
              <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", color: "#F0EDE8", lineHeight: 1.2, marginBottom: "2rem" }}>
                What I bring to your team or project.
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {[
                  { icon: "◎", title: "Floor-level expertise", desc: "5 years inside production industry — I understand real constraints, not just textbook theory." },
                  { icon: "◈", title: "Measurable results", desc: "10% water reduction at Pacific Jeans. I optimize until numbers move." },
                  { icon: "◉", title: "Quick Decisions", desc: "Decisions based on data and experience, saves time and resources." },
                  { icon: "◇", title: "Wash technology specialist", desc: "Enzyme, stone, bleach, normal wash — parameters, chemistry, and troubleshooting." },
                  { icon: "⬡", title: "R&D mindset", desc: "I approach every process problem as a research question — systematic, data-driven." },
                ].map((item) => (
                  <div key={item.title} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                    <span style={{ color: "#C4622D", fontSize: "1.1rem", marginTop: "0.1rem" }}>{item.icon}</span>
                    <div>
                      <p style={{ color: "#E8E3DC", fontSize: "0.95rem", fontWeight: 500, marginBottom: "0.25rem" }}>{item.title}</p>
                      <p style={{ color: "#A0A0A0", fontSize: "0.85rem", lineHeight: 1.6 }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", color: "#F0EDE8", lineHeight: 1.2, marginBottom: "0.5rem" }}>
                Need a quick expert opinion?
              </h2>
              <p style={{ color: "#A0A0A0", fontSize: "0.9rem", lineHeight: 1.7 }}>
                Whether you are a buying house, R&D team, or factory facing a wash quality issue — I offer short consultations to help you move faster.
              </p>
              <div style={{ background: "rgba(196,98,45,0.08)", border: "1px solid rgba(196,98,45,0.25)", padding: "1.5rem" }}>
                <p style={{ fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#C4622D", marginBottom: "0.5rem" }}>Free 15-min Call</p>
                <p style={{ color: "#E8E3DC", fontSize: "0.9rem", marginBottom: "0.75rem", lineHeight: 1.6 }}>
                  Got a wash process issue? Book a free 15-minute call — I&apos;ll give you a direct, honest assessment.
                </p>
                <a href="mailto:joyanta.sarkar.texengg@gmail.com?subject=Free%2015-min%20Consultation%20Request" style={{ display: "inline-block", background: "#C4622D", color: "white", padding: "0.65rem 1.5rem", fontSize: "0.8rem", letterSpacing: "0.04em", textDecoration: "none" }}>
                  Book a Call →
                </a>
              </div>
              <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", padding: "1.5rem" }}>
                <p style={{ fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#666", marginBottom: "0.5rem" }}>Email Consultation</p>
                <p style={{ color: "#A0A0A0", fontSize: "0.9rem", marginBottom: "0.75rem", lineHeight: 1.6 }}>
                  Prefer async? Send me your process challenge by email and I'll respond with a structured recommendation.
                </p>
                <a href="mailto:joyanta.sarkar.texengg@gmail.com?subject=Email%20Consultation%20Request" style={{ display: "inline-block", border: "1px solid rgba(255,255,255,0.15)", color: "#E8E3DC", padding: "0.65rem 1.5rem", fontSize: "0.8rem", letterSpacing: "0.04em", textDecoration: "none" }}>
                  Send a Message →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}