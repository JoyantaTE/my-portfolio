"use client";
import { useEffect, useRef } from "react";

export default function Contact() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0, last = 0;

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * 1400,
      y: Math.random() * 900,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: 1 + Math.random() * 2.5,
      phase: Math.random() * Math.PI * 2,
    }));

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    function draw(time: number) {
      if (!canvas || !ctx) return;
      const W = canvas.width;
      const H = canvas.height;
      ctx.fillStyle = "#0d1117";
      ctx.fillRect(0, 0, W, H);
      for (let i = 0; i < 6; i++) {
        const radius = (100 + i * 90 + (time * 12) % 90);
        ctx.beginPath();
        ctx.arc(W * 0.72, H * 0.5, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(196,98,45,${0.06 - i * 0.008})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      for (let y = 0; y < H; y += 6) {
        ctx.fillStyle = `rgba(255,255,255,${0.015 + 0.008 * Math.sin(y * 0.05 + time * 0.3)})`;
        ctx.fillRect(0, y, W, 1);
      }
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
        const pulse = 0.4 + 0.6 * Math.abs(Math.sin(time * 0.5 + p.phase));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(196,98,45,${pulse * 0.5})`;
        ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(196,98,45,${0.12 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      const vig = ctx.createRadialGradient(W/2, H/2, H*0.1, W/2, H/2, H*0.9);
      vig.addColorStop(0, "rgba(0,0,0,0)");
      vig.addColorStop(1, "rgba(0,0,0,0.7)");
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
 return (
    <div>
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center" }}>
        <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "5rem 2rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>

          <div>
            <p style={{ color: "#C4622D", fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1rem", fontWeight: 500 }}>
              Contact
            </p>
            <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#F0EDE8", lineHeight: 1.1, marginBottom: "1.5rem", textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}>
              Let's talk about your process.
            </h1>
            <p style={{ color: "rgba(220,215,205,0.65)", fontSize: "1rem", lineHeight: 1.8, marginBottom: "3rem", maxWidth: 420 }}>
              Whether you're looking to optimize a washing process, reduce chemical costs, or explore sustainable textile solutions — I'd be glad to connect.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {[
                { label: "Email", value: "joyanta.sarkar.texengg@gmail.com", href: "mailto:joyanta.sarkar.texengg@gmail.com" },
                { label: "LinkedIn", value: "https://www.linkedin.com/in/joyanta-sarkar-te12/", href: "https://www.linkedin.com/in/joyanta-sarkar-te12/" },
                { label: "Location", value: "Bangladesh", href: null },
              ].map((item) => (
                <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <span style={{ fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#666", minWidth: 70 }}>
                    {item.label}
                  </span>
                  {item.href ? (
                    <a href={item.href} style={{ color: "#C4622D", fontSize: "0.95rem", borderBottom: "1px solid #C4622D", paddingBottom: "1px" }}>
                      {item.value}
                    </a>
                  ) : (
                    <span style={{ color: "#E8E3DC", fontSize: "0.95rem" }}>{item.value}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", padding: "2.5rem" }}>
            <p style={{ fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#666", marginBottom: "1rem" }}>
              Resume / CV
            </p>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.6rem", color: "#F0EDE8", marginBottom: "1rem", lineHeight: 1.2 }}>
              Download my CV
            </h2>
            <p style={{ color: "rgba(220,215,205,0.6)", fontSize: "0.875rem", lineHeight: 1.7, marginBottom: "2rem" }}>
              Full resume including education, work experience, R&D projects, and technical skills.
            </p>
            <a href="/cv-joyanta.pdf" download style={{ display: "inline-block", background: "#C4622D", color: "white", padding: "0.875rem 2rem", fontSize: "0.875rem", letterSpacing: "0.04em", textDecoration: "none" }}>
              Download PDF →
            </a>
            <p style={{ marginTop: "1rem", fontSize: "0.75rem", color: "#555" }}>
              Place your CV at: public/Resume of Joyanta Sarkar.pdf
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}