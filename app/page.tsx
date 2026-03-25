"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

function ServicesCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId: number, t = 0, last = 0;
    const molecules = Array.from({ length: 18 }, (_, i) => ({
      x: Math.random() * 1200, y: Math.random() * 800,
      vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
      r: 5 + Math.random() * 9, type: i % 4,
      phase: Math.random() * Math.PI * 2, bonds: Math.floor(2 + Math.random() * 3),
    }));
    const colors = ["#3d6b8a", "#2a7a5a", "#7a5a2a", "#5a3d7a"];
    function resize() { if (!canvas) return; canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; }
    function draw(time: number) {
      if (!canvas || !ctx) return;
      const W = canvas.width, H = canvas.height;
      ctx.fillStyle = "#111820"; ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = "rgba(255,255,255,0.02)"; ctx.lineWidth = 0.5;
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
        ctx.fillStyle = col + "99"; ctx.fill();
        ctx.strokeStyle = col; ctx.lineWidth = 1; ctx.stroke();
      });
      for (let i = 0; i < molecules.length; i++) {
        for (let j = i + 1; j < molecules.length; j++) {
          const dx = molecules[i].x - molecules[j].x, dy = molecules[i].y - molecules[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath(); ctx.moveTo(molecules[i].x, molecules[i].y); ctx.lineTo(molecules[j].x, molecules[j].y);
            ctx.strokeStyle = `rgba(100,180,150,${0.12 * (1 - dist / 110)})`; ctx.lineWidth = 0.5; ctx.stroke();
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

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId: number, t = 0, last = 0;

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    function draw(time: number) {
      if (!canvas || !ctx) return;
      const W = canvas.width, H = canvas.height;
      const threadW = 14;
      const cols = Math.ceil(W / threadW) + 2;
      const rows = Math.ceil(H / threadW) + 2;
      const offset = (time * 0.4) % threadW;
      ctx.fillStyle = "#1a1f2e";
      ctx.fillRect(0, 0, W, H);
      for (let c = 0; c < cols; c++) {
        const x = c * threadW - offset;
        for (let r = 0; r < rows; r++) {
          const y = r * threadW;
          const isOver = (c + r + Math.floor(time * 0.05)) % 3 !== 0;
          ctx.fillStyle = isOver ? c % 2 === 0 ? "#2d3a5c" : "#354470" : "#1a1f2e";
          ctx.fillRect(x, y, threadW - 1.5, threadW - 1.5);
        }
      }
      for (let r = 0; r < rows; r++) {
        const y = r * threadW - (time * 0.2) % threadW;
        for (let c = 0; c < cols; c++) {
          const x = c * threadW;
          const isOver = (c + r + Math.floor(time * 0.05)) % 3 === 0;
          if (!isOver) continue;
          ctx.fillStyle = r % 4 === 0 ? "#4a5a8a" : "#3d4d7a";
          ctx.fillRect(x, y, threadW - 1.5, threadW - 1.5);
        }
      }
      for (let i = 0; i < 8; i++) {
        const x = ((i * 120 + time * 0.3) % (W + 200)) - 100;
        const grad = ctx.createLinearGradient(x, 0, x + 60, H);
        grad.addColorStop(0, "rgba(255,255,255,0)");
        grad.addColorStop(0.5, "rgba(255,255,255,0.025)");
        grad.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = grad;
        ctx.fillRect(x, 0, 60, H);
      }
      const vig = ctx.createRadialGradient(W/2, H/2, H*0.2, W/2, H/2, H*0.9);
      vig.addColorStop(0, "rgba(0,0,0,0)");
      vig.addColorStop(1, "rgba(0,0,0,0.55)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, W, H);
    }

    function loop(ts: number) {
      const dt = ts - last; last = ts;
      t += dt * 0.01; draw(t);
      animId = requestAnimationFrame(loop);
    }

    resize();
    window.addEventListener("resize", resize);
    animId = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <>
      {/* Hero — denim weave */}
      <section style={{ position: "relative", minHeight: "90vh", display: "flex", alignItems: "center" }}>
        <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "5rem 2rem" }}>
          <p style={{ fontSize: "0.8125rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#C4622D", marginBottom: "1.5rem", fontWeight: 500 }}>
            Textile Chemical Engineer
          </p>
          <h1 style={{ fontSize: "clamp(3rem, 7vw, 5rem)", lineHeight: 1.05, color: "#F0EDE8", marginBottom: "2rem", maxWidth: 800, textShadow: "0 2px 30px rgba(0,0,0,0.5)" }}>
            Hi, I&apos;m Joyanta
          </h1>
          <p style={{ fontSize: "1.125rem", color: "rgba(240,237,232,0.7)", maxWidth: 520, marginBottom: "3rem", lineHeight: 1.8 }}>
            Specializing in process optimization, R&D, and sustainable dyeing &amp; washing solutions.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="/projects" style={{ background: "#C4622D", color: "white", padding: "0.875rem 2rem", fontSize: "0.9rem", display: "inline-block" }}>
              View Projects →
            </Link>
            <Link href="/contact" style={{ border: "1px solid rgba(255,255,255,0.25)", color: "rgba(240,237,232,0.85)", padding: "0.875rem 2rem", fontSize: "0.9rem", display: "inline-block" }}>
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* Core Expertise */}
      <section style={{ background: "#2B2B2B", padding: "4rem 2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#666", marginBottom: "2rem" }}>
            Core Expertise
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2rem" }}>
            {[
              { title: "Dyeing & Finishing", desc: "Reactive, disperse & vat dye systems." },
              { title: "Washing Process", desc: "Enzyme washing, water & chemical reduction." },
              { title: "Sustainability R&D", desc: "Effluent control, eco-friendly auxiliaries." },
              { title: "Process Analysis", desc: "Parameter optimization & data-driven QC." },
            ].map((s) => (
              <div key={s.title} style={{ borderTop: "2px solid #C4622D", paddingTop: "1.25rem" }}>
                <h3 style={{ fontSize: "1rem", marginBottom: "0.5rem", color: "#E8E3DC" }}>{s.title}</h3>
                <p style={{ fontSize: "0.875rem", color: "#A0A0A0", lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services — molecule animation */}
      <section style={{ position: "relative", minHeight: "80vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <ServicesCanvas />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "5rem 2rem", width: "100%" }}>
          <p style={{ color: "#C4622D", fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1rem", fontWeight: 500 }}>
            What I Do
          </p>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#F0EDE8", lineHeight: 1.1, marginBottom: "3rem", textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}>
            Services & Tools
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.25rem" }}>
            {[
              { title: "R&D Consultation", desc: "Laboratory-backed research into new chemical processes, auxiliaries, and treatment methods.", icon: "⬡", link: null },
              { title: "Chemical Cost Reduction", desc: "Systematic audit of chemical usage — identifying over-dosing and substitution opportunities.", icon: "◈", link: null },
              { title: "Process Optimization", desc: "End-to-end analysis of dyeing, washing and finishing lines to reduce time, water and rework.", icon: "◎", link: null },
              { title: "Textile Calculator", desc: "Interactive tools for washing parameters, enzyme dosage, liquor ratio and efficiency scoring.", icon: "◇", link: "/calculator" },
            ].map((s) => (
              <div
                key={s.title}
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", padding: "1.75rem", cursor: s.link ? "pointer" : "default" }}
                onClick={() => s.link && (window.location.href = s.link)}
              >
                <span style={{ fontSize: "1.4rem", display: "block", marginBottom: "1rem", color: "#C4622D" }}>{s.icon}</span>
                <h3 style={{ fontSize: "1rem", color: "#F0EDE8", marginBottom: "0.75rem", fontFamily: "Georgia, serif" }}>{s.title}</h3>
                <p style={{ fontSize: "0.85rem", color: "rgba(220,215,205,0.6)", lineHeight: 1.7 }}>{s.desc}</p>
                {s.link && <p style={{ marginTop: "1rem", fontSize: "0.8rem", color: "#C4622D" }}>Try it →</p>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}