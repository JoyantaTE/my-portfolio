"use client";
import { useEffect, useRef } from "react";

export default function About() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0, last = 0;

    const molecules = Array.from({ length: 22 }, (_, i) => ({
      x: Math.random() * 1200,
      y: Math.random() * 800,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: 6 + Math.random() * 10,
      type: i % 4,
      phase: Math.random() * Math.PI * 2,
      bonds: Math.floor(2 + Math.random() * 3),
    }));

    const colors = ["#3d6b8a", "#2a7a5a", "#7a5a2a", "#5a3d7a"];

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    function drawMolecule(m: typeof molecules[0], time: number) {
      if (!ctx) return;
      const pulse = 1 + 0.08 * Math.sin(time * 0.8 + m.phase);
      const r = m.r * pulse;
      const col = colors[m.type];
      for (let b = 0; b < m.bonds; b++) {
        const angle = (b / m.bonds) * Math.PI * 2 + time * 0.15 + m.phase;
        const len = r * 2.8;
        ctx.beginPath();
        ctx.moveTo(m.x + Math.cos(angle) * r, m.y + Math.sin(angle) * r);
        ctx.lineTo(m.x + Math.cos(angle) * len, m.y + Math.sin(angle) * len);
        ctx.strokeStyle = col + "55";
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(m.x + Math.cos(angle) * (len + r * 0.6), m.y + Math.sin(angle) * (len + r * 0.6), r * 0.45, 0, Math.PI * 2);
        ctx.fillStyle = col + "88";
        ctx.fill();
      }
      ctx.beginPath();
      ctx.arc(m.x, m.y, r, 0, Math.PI * 2);
      ctx.fillStyle = col + "aa";
      ctx.fill();
      ctx.strokeStyle = col;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(m.x, m.y, r * 2.2, r * 0.9, time * 0.4 + m.phase, 0, Math.PI * 2);
      ctx.strokeStyle = col + "33";
      ctx.lineWidth = 0.8;
      ctx.stroke();
    }

    function draw(time: number) {
      if (!canvas || !ctx) return;
      const W = canvas.width;
      const H = canvas.height;
      ctx.fillStyle = "#111820";
      ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = "rgba(255,255,255,0.025)";
      ctx.lineWidth = 0.5;
      for (let x = 0; x < W; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      for (let y = 0; y < H; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
      molecules.forEach(m => {
        m.x += m.vx; m.y += m.vy;
        if (m.x < -50) m.x = W + 50;
        if (m.x > W + 50) m.x = -50;
        if (m.y < -50) m.y = H + 50;
        if (m.y > H + 50) m.y = -50;
        drawMolecule(m, time);
      });
      for (let i = 0; i < molecules.length; i++) {
        for (let j = i + 1; j < molecules.length; j++) {
          const dx = molecules[i].x - molecules[j].x;
          const dy = molecules[i].y - molecules[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(molecules[i].x, molecules[i].y);
            ctx.lineTo(molecules[j].x, molecules[j].y);
            ctx.strokeStyle = `rgba(100,180,150,${0.15 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      // Bubbles
      for (let i = 0; i < 25; i++) {
        const bx = (i * 97 + time * (i % 2 === 0 ? 0.8 : 0.5)) % W;
        const by = H - ((time * (0.3 + i * 0.02) + i * 40) % (H + 20));
        ctx.beginPath();
        ctx.arc(bx, by, 2 + (i % 5), 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(100,160,200,0.2)";
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
      // Vignette
      const vig = ctx.createRadialGradient(W / 2, H / 2, H * 0.1, W / 2, H / 2, H * 0.85);
      vig.addColorStop(0, "rgba(0,0,0,0)");
      vig.addColorStop(1, "rgba(0,0,0,0.6)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, W, H);
    }

    function loop(ts: number) {
      const dt = ts - last; last = ts;
      t += dt * 0.01;
      draw(t);
      animId = requestAnimationFrame(loop);
    }

    resize();
    window.addEventListener("resize", resize);
    animId = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  const skills = [
    { category: "Textile Processing", items: ["Reactive Dyeing", "Garment Washing", "Enzyme Finishing", "Bleaching"] },
    { category: "Chemical Knowledge", items: ["Dye Chemistry", "Textile Auxiliaries", "Surfactants", "Effluent Treatment"] },
    { category: "R&D & Analysis", items: ["Lab Testing", "Process Optimization", "Data Analysis", "Sustainability"] },
  ];

  return (
    <div>
      {/* Animated Hero */}
      <section style={{ position: "relative", minHeight: "60vh", display: "flex", alignItems: "center" }}>
        <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "5rem 2rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "center" }}>
          <div>
            <p style={{ color: "#C4622D", fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1rem", fontWeight: 500 }}>
              About Me
            </p>
            <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", color: "#F0EDE8", lineHeight: 1.1, marginBottom: "1.5rem", textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}>
              Engineer with a passion for precision.
            </h1>
            <p style={{ color: "rgba(220,215,205,0.7)", fontSize: "1rem", lineHeight: 1.8 }}>
              Focused on optimizing dyeing, washing and finishing processes — making them cleaner, faster and more efficient.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            {[
              { label: "Speciality", val: "Wet Processing" },
              { label: "Focus", val: "Sustainability" },
              { label: "Domain", val: "R&D" },
              { label: "Industry", val: "Garment" },
            ].map((s) => (
              <div key={s.label} style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", padding: "0.75rem 1rem" }}>
                <p style={{ fontSize: "0.7rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#C4622D", marginBottom: "0.25rem" }}>{s.label}</p>
                <p style={{ fontSize: "0.9rem", color: "#E8E3DC" }}>{s.val}</p>
              </div>
            ))}
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
                    <li key={item} style={{ color: "#A0A0A0", fontSize: "0.875rem", padding: "0.3rem 0" }}>
                      — {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
